# TitleScope 隐私政策 / Privacy Policy

最后更新 / Last updated: 2026-11-05

## 中文

TitleScope 不会将用户数据发送到 TitleScope 开发者运营的服务器，也不包含内置的广告、分析或追踪服务。**但为了执行搜索，插件会通过你的浏览器直接访问 Google Search；Google 会收到相应的搜索请求，并可能按照其自身政策处理请求数据。**

### 插件处理哪些数据

- **关键词和搜索选项：** 你在插件弹窗中输入的关键词，以及查询模式、地区选项和个性化选项，会保存在本机 Chrome 扩展存储 `chrome.storage.local` 中，以便恢复界面和查询状态。
- **查询结果：** 插件读取 Google 搜索结果页面上显示的结果数，并将关键词及结果数保存在本机 `chrome.storage.local` 中。
- **CSV 导出：** CSV 文件由浏览器本地生成并下载，不经过 TitleScope 开发者的服务器。
- **Google 搜索请求：** 插件会打开 `https://www.google.com/search`，并将关键词及所选搜索参数（例如 `hl`、可选的 `gl` 和 `pws=0`）放入搜索请求。Google 会因此收到搜索词及常规网络请求信息，例如 IP 地址；如果浏览器已登录 Google 或带有相关 Cookie，Google 也可能按其自身设置和政策处理这些信息。

### 我们不做的事

- 不运营接收插件查询数据的 TitleScope 后端服务器。
- 不在插件中集成广告、第三方分析或追踪 SDK。
- 插件代码不会主动读取用户的浏览历史、Google 账号资料或其他网站页面内容。
- 不出售用户数据。

### 权限说明

| 权限 | 用途 |
|---|---|
| `tabs` | 创建、导航和关闭用于搜索的标签页；检查该标签页 URL 是否进入 Google 验证页面，并在需要时将标签页切到前台。 |
| `scripting` | 在 Google 搜索结果页执行脚本，读取页面上显示的结果数。 |
| `storage` | 在本机保存关键词、查询选项和结果/运行状态。 |
| `https://www.google.com/*` | 访问 Google 搜索页面并在该页面读取结果数。 |

### 第三方服务：Google Search

TitleScope 使用 Google Search 执行用户发起的搜索。搜索请求由你的浏览器直接发送给 Google，而不是经由 TitleScope 开发者的服务器转发。Google 对请求数据的收集和使用受 Google 自身的条款和隐私政策约束。TitleScope 与 Google 没有关联或背书关系。

请注意，Google 可能根据 IP 地址、Cookie、登录状态、地区参数及其他因素个性化或调整搜索结果。`gl` 和 `pws=0` 参数不能保证完全消除这些影响。

### 数据保留与删除

- 查询关键词、选项和结果保存在当前 Chrome 用户配置文件的扩展本地存储中。
- 点击插件中的「清空结果」会清除当前缓存的查询结果和运行状态；已保存的输入关键词和选项仍可能保留。
- 卸载扩展通常会由 Chrome 移除该扩展的本地存储数据。
- CSV 导出文件由用户自行保存；如需删除，请从保存位置手动删除。
- Google 收到的搜索请求数据不受 TitleScope 控制；请参阅 Google 的隐私政策了解其保留和删除选项。

### 联系方式与问题反馈

如有隐私问题或发现问题，请在 [GitHub Issues](https://github.com/larrygofast89/TitleScope/issues) 提交反馈。请勿在 Issue 中发布关键词清单、个人信息或其他敏感数据。

---

## English

TitleScope does not send user data to servers operated by the TitleScope developer and does not include built-in advertising, analytics, or tracking services. **However, to perform searches, the extension accesses Google Search directly through your browser. Google receives those search requests and may process request data under its own policies.**

### Data the extension handles

- **Keywords and search settings:** Keywords entered in the popup, along with the query mode, region option, and personalization option, are stored in Chrome's local extension storage (`chrome.storage.local`) on your device so the interface and query state can be restored.
- **Search results:** The extension reads the result count displayed on Google Search pages and stores the keyword and result count in local extension storage.
- **CSV exports:** CSV files are generated and downloaded locally by the browser. They are not sent through a TitleScope developer server.
- **Google Search requests:** The extension opens `https://www.google.com/search` and includes the keyword and selected search parameters (such as `hl`, optional `gl`, and `pws=0`) in the request. Google therefore receives the search query and ordinary network-request information, such as your IP address. If your browser is signed in to Google or has relevant cookies, Google may also process information according to your Google settings and policies.

### What the extension does not do

- It does not operate a TitleScope backend server that receives extension query data.
- It does not integrate advertising, third-party analytics, or tracking SDKs.
- The extension code does not actively read your browsing history, Google account profile, or content from other websites.
- It does not sell user data.

### Permissions

| Permission | Purpose |
|---|---|
| `tabs` | Create, navigate, and close the search tab; check whether its URL has reached a Google verification page; and bring it to the foreground when needed. |
| `scripting` | Execute a script on Google Search result pages to read the result count displayed there. |
| `storage` | Store keywords, query settings, and results/run state locally on your device. |
| `https://www.google.com/*` | Access Google Search pages and read the result count on those pages. |

### Third-party service: Google Search

TitleScope uses Google Search to perform searches initiated by the user. Requests are sent directly from your browser to Google; they are not relayed through a TitleScope developer server. Google's collection and use of request data are governed by Google's own terms and privacy policy. TitleScope is not affiliated with or endorsed by Google.

Google may use your IP address, cookies, sign-in state, region parameters, and other signals to adjust or personalize results. The `gl` and `pws=0` parameters do not guarantee that all such effects are eliminated.

### Data retention and deletion

- Search keywords, settings, and results are stored in the extension's local storage for your current Chrome profile.
- Clicking **Clear** in the extension clears the cached query results and run state; saved input keywords and settings may remain.
- When the extension is uninstalled, Chrome normally removes its local extension storage.
- CSV exports are saved by the user. Delete an exported file manually from its saved location if you no longer need it.
- TitleScope cannot control data Google receives from search requests. Refer to Google's privacy policy for its data-retention and deletion options.

### Contact and feedback

For privacy questions or issue reports, use [GitHub Issues](https://github.com/larrygofast89/TitleScope/issues). Please do not post keyword lists, personal information, or other sensitive data in an issue.
