const $ = id => document.getElementById(id);
const send = m => chrome.runtime.sendMessage(m);
const MODE_LABEL = { intitle: 'intitle 精确短语', all: 'allintitle' };

// ---- 输入与选项持久化(关闭弹窗后不丢) ----
async function loadSettings() {
  const { settings } = await chrome.storage.local.get('settings');
  if (!settings) return;
  $('kws').value = settings.kws ?? '';
  $('mode').value = settings.mode ?? 'intitle';
  $('gl').value = settings.gl ?? '';
  $('pws').checked = settings.pws ?? true;
}
function saveSettings() {
  chrome.storage.local.set({
    settings: { kws: $('kws').value, mode: $('mode').value, gl: $('gl').value, pws: $('pws').checked }
  });
}
$('kws').addEventListener('input', saveSettings);
['mode', 'gl', 'pws'].forEach(id => $(id).addEventListener('change', saveSettings));

// ---- 按钮 ----
$('start').onclick = async () => {
  const keywords = $('kws').value.split('\n').map(s => s.trim()).filter(Boolean);
  if (!keywords.length) return;
  const s = await send({ type: 'GET' });
  if (s.running) return;
  if (s.results.length && !confirm(`当前已缓存 ${s.results.length} 条结果,开始新查询会覆盖它们,继续吗?\n(建议先导出 CSV)`)) return;
  await send({ type: 'START', keywords, mode: $('mode').value, gl: $('gl').value, pws: $('pws').checked });
};

$('stop').onclick = () => send({ type: 'STOP' });

$('clear').onclick = async () => {
  const s = await send({ type: 'GET' });
  if (s.running) { alert('正在运行中,请先点"停止"再清空'); return; }
  if (s.results.length && !confirm(`将清空当前缓存的 ${s.results.length} 条结果,确定吗?\n(建议先导出 CSV)`)) return;
  render(await send({ type: 'CLEAR' }));
};

$('export').onclick = async () => {
  const s = await send({ type: 'GET' });
  if (!s.results.length) { alert('没有可导出的结果'); return; }
  const m = s.meta || {};
  const tail = `,${m.mode || ''},${m.gl || 'auto'},${m.pws ? 1 : 0}`;
  const csv = '\ufeffkeyword,count,mode,region,pws_off\n' +
    s.results.map(r => `"${r.kw.replace(/"/g, '""')}",${r.count ?? ''}${tail}`).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = 'intitle-counts.csv';
  a.click();
};

// ---- 渲染 ----
function render(s) {
  const status = $('status');
  status.className = s.waiting ? 'warn' : '';
  status.textContent = s.waiting
    ? '⚠ 遇到验证码,请在弹出的标签页完成验证,完成后自动继续'
    : `${s.running ? '运行中' : '空闲'}  进度 ${s.results.length}/${s.total || 0}`;

  $('count-label').textContent = `${s.results.length} 条`;
  $('empty').hidden = s.results.length > 0;
  $('tbl').hidden = s.results.length === 0;

  const meta = $('meta');
  if (s.meta && s.results.length) {
    meta.hidden = false;
    meta.textContent = `${MODE_LABEL[s.meta.mode] || s.meta.mode} · 地区 ${s.meta.gl || '自动'} · ${s.meta.pws ? '已关闭个性化' : '未关闭个性化'}`;
  } else {
    meta.hidden = true;
  }

  $('tbody').replaceChildren(...s.results.map(r => {
    const tr = document.createElement('tr');
    const k = document.createElement('td');
    k.textContent = r.kw;
    const c = document.createElement('td');
    c.className = 'num';
    c.textContent = r.count == null ? '—' : r.count.toLocaleString();
    tr.append(k, c);
    return tr;
  }));
}

async function refresh() { render(await send({ type: 'GET' })); }

loadSettings();
refresh();
setInterval(refresh, 1000);
