const EMPTY = () => ({ running: false, waiting: false, results: [], total: 0, meta: null });
let state = EMPTY();

// MV3 的 service worker 空闲约 30 秒就会被回收,内存会丢失,
// 所以状态同步保存到 chrome.storage.local,worker 重启后再读回来。
const ready = chrome.storage.local.get('state').then(({ state: saved }) => {
  if (saved) {
    state = saved;
    state.running = false;  // 重启后原来的查询循环已不存在
    state.waiting = false;
  }
});
const save = () => chrome.storage.local.set({ state });

chrome.runtime.onMessage.addListener((msg, _s, send) => {
  (async () => {
    await ready;
    if (msg.type === 'START' && !state.running) {
      run(msg.keywords, msg.mode, msg.gl, msg.pws); // 不 await,长任务在后台跑
    } else if (msg.type === 'STOP') {
      state.running = false;
    } else if (msg.type === 'CLEAR' && !state.running) {
      state = EMPTY();
      await save();
    }
    send(state);
  })();
  return true;
});

const sleep = ms => new Promise(r => setTimeout(r, ms));

function buildUrl(kw, mode, gl, pws) {
  const q = mode === 'all' ? `allintitle:${kw}` : `intitle:"${kw}"`;
  let url = `https://www.google.com/search?q=${encodeURIComponent(q)}&hl=en`;
  if (gl) url += `&gl=${encodeURIComponent(gl)}`;
  if (pws) url += '&pws=0';
  return url;
}

// 先注册监听再跳转,避免错过加载完成事件
function go(tabId, url) {
  return new Promise(resolve => {
    const fn = (id, info) => {
      if (id === tabId && info.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(fn);
        resolve();
      }
    };
    chrome.tabs.onUpdated.addListener(fn);
    chrome.tabs.update(tabId, { url });
  });
}

// 在页面内执行,必须自包含
async function extract() {
  if (location.pathname.startsWith('/sorry')) return { captcha: true, count: null };
  let el = document.querySelector('#result-stats');
  if (!el) {
    const tools = document.querySelector('#hdtb-tls'); // "工具/Tools" 按钮
    if (tools) {
      tools.click();
      await new Promise(r => setTimeout(r, 800));
      el = document.querySelector('#result-stats');
    }
  }
  const text = el ? el.innerText : '';
  if (/did not match any documents|找不到和您查询/.test(document.body.innerText)) {
    return { count: 0, raw: text };
  }
  const m = text.match(/([\d,.]+)\s*results?/i);
  return { count: m ? parseInt(m[1].replace(/[,.]/g, ''), 10) : null, raw: text };
}

async function bringToFront(tabId) {
  try {
    await chrome.tabs.update(tabId, { active: true });
    const t = await chrome.tabs.get(tabId);
    await chrome.windows.update(t.windowId, { focused: true });
  } catch (e) {}
}

// 轮询标签页,直到离开 /sorry 页面(最长等 15 分钟)
async function waitCaptchaSolved(tabId) {
  const deadline = Date.now() + 15 * 60 * 1000;
  while (state.running && Date.now() < deadline) {
    try {
      const t = await chrome.tabs.get(tabId);
      if (!t.url || !t.url.includes('/sorry')) return true;
    } catch (e) {
      return false; // 标签页被关闭
    }
    await sleep(2000);
  }
  return false;
}

async function run(keywords, mode, gl, pws) {
  state = { running: true, waiting: false, results: [], total: keywords.length, meta: { mode, gl, pws } };
  await save();
  // 运行期间定期调用扩展 API,避免 service worker 在长等待中被回收
  const keepAlive = setInterval(() => chrome.runtime.getPlatformInfo(), 20000);
  let tab;

  try {
    tab = await chrome.tabs.create({ active: false, url: 'about:blank' });

    for (const kw of keywords) {
      if (!state.running) break;
      const url = buildUrl(kw, mode, gl, pws);

      let result = null;
      while (state.running) {
        await go(tab.id, url);
        const [{ result: r }] = await chrome.scripting.executeScript({
          target: { tabId: tab.id }, func: extract
        });
        if (!r.captcha) { result = r; break; }

        // 遇到验证码:暂停,等用户手动通过,然后重试当前关键词
        state.waiting = true;
        await save();
        await bringToFront(tab.id);
        const solved = await waitCaptchaSolved(tab.id);
        state.waiting = false;
        if (!solved) { state.running = false; break; }
        await sleep(10000 + Math.random() * 10000); // 通过验证后多冷却 10~20 秒
      }

      if (!result) break;
      state.results.push({ kw, ...result });
      await save();
      await sleep(3000 + Math.random() * 5000); // 每个词之间随机间隔 3~8 秒
    }
  } catch (e) {
    console.error('TitleScope run error:', e);
  } finally {
    clearInterval(keepAlive);
    state.running = false;
    state.waiting = false;
    await save();
    if (tab) { try { await chrome.tabs.remove(tab.id); } catch (e) {} }
  }
}
