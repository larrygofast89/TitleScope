<p align="center">
  <img src="assets/logo-512.png" width="120" alt="TitleScope logo">
</p>

<h1 align="center">TitleScope</h1>

<p align="center">
  <strong>Batch-check Google intitle / allintitle result counts for SEO keyword research.</strong>
</p>

<p align="center">
  <a href="#中文">中文</a> · <a href="#english">English</a>
</p>

---

## 中文

**TitleScope** 是一个 Chrome 扩展，用于批量查询关键词的 Google `intitle:` / `allintitle:` 搜索结果数，辅助 SEO 关键词标题竞争度研究。粘贴关键词列表后，插件会逐个执行搜索、汇总结果，并支持导出 CSV。

### 功能

- **批量查询：** 每行输入一个关键词，按顺序执行。
- **两种查询模式：** `intitle:"关键词"`（精确短语）和 `allintitle:关键词`（所有词都出现在标题中）。
- **随机等待：** 每个关键词之间随机等待约 3–8 秒。
- **验证码提示：** 检测到 Google 验证页面时暂停查询，并将搜索标签页切到前台；用户完成验证后，插件会重试当前关键词。
- **地区选项：** 可选择 Google `gl` 地区参数，或使用自动地区。
- **减少个性化：** 可添加 `pws=0` 参数，但不能保证完全消除个性化影响。
- **本地保存：** 关键词、选项和查询结果保存在 Chrome 本地扩展存储中。
- **CSV 导出：** 导出包含关键词、结果数和查询设置的 CSV 文件（带 BOM，便于 Excel 打开）。
- **清空结果：** 清除当前缓存的查询结果和运行状态。

### 安装

#### 方式 A：下载 GitHub Release（推荐）

1. 打开本项目的 [Releases 页面](https://github.com/larrygofast89/TitleScope/releases)。
2. 下载对应版本的 `TitleScope-vX.Y.Z.zip` 并解压。
3. 在 Chrome 地址栏打开 `chrome://extensions`。
4. 开启右上角的「开发者模式」。
5. 点击「加载已解压的扩展程序」。
6. 选择解压后包含 `manifest.json` 的 `extension` 文件夹。
7. 安装完成后，可从 Chrome 工具栏的扩展菜单固定 TitleScope。

#### 方式 B：从源代码安装

1. 下载本仓库（Code → Download ZIP）或克隆仓库。
2. 解压后，选择仓库中的 `extension/` 文件夹。
3. 按照上面第 3–7 步加载扩展。

> 本项目目前提供开发者模式安装方式，并非 Chrome Web Store 上架版本。Chrome 可能会对开发者模式扩展显示提示。

### 使用

1. 点击 TitleScope 扩展图标，在文本框中输入关键词（每行一个）。
2. 选择 `intitle`（精确短语）或 `allintitle` 模式。
3. 按需选择搜索地区，并决定是否勾选「关闭个性化」。
4. 点击「开始」。查询过程中可点击「停止」。
5. 查询完成后点击「导出 CSV」保存结果；需要清空结果时点击「清空结果」。

### 搜索地区与结果说明

- 插件将 Google 搜索界面语言设置为英文（`hl=en`）。
- **自动地区：** 不传 `gl` 参数，Google 可能根据 IP 地址及其他信号判断地区。
- **指定地区：** 传入 `gl=<country code>`（例如 `us`、`gb`、`jp`），作为地区提示；它不是结果地域的保证。
- **关闭个性化：** 添加 `pws=0`，但不能保证完全消除账号、Cookie、IP 或其他因素的影响。
- Google 显示的结果数量是估算值，可能随时间、地区、数据中心和搜索环境变化。适合做相对比较，不应视为精确或稳定的指标。

### 使用限制与免责声明

- TitleScope 会自动化访问 Google Search。自动化请求可能受到 Google 服务条款、验证码或临时访问限制的约束。请先了解并遵守适用条款，控制使用频率，并自行承担使用风险。
- 插件采用约 3–8 秒的随机等待，但这**不保证**不会触发验证码或限制。遇到验证或限制时，请停止使用并遵循 Google 页面提示，不要尝试规避访问控制。
- Google 页面结构可能变化，导致结果数无法提取（显示为 `—`）。如遇到问题，可提交 [GitHub Issue](https://github.com/larrygofast89/TitleScope/issues)。
- TitleScope 与 Google 没有关联或背书关系。
- 搜索请求由你的浏览器直接发送给 Google。请阅读 [隐私政策](PRIVACY.md) 了解数据处理详情。

### 项目结构

```text
TitleScope/
├── assets/
│   └── logo-512.png
├── extension/
│   ├── manifest.json
│   ├── background.js
│   ├── popup.html
│   ├── popup.js
│   └── icons/
├── LICENSE
├── PRIVACY.md
└── README.md
```

### 隐私与许可证

- [隐私政策](PRIVACY.md)
- [MIT License](LICENSE)

---

## English

**TitleScope** is a Chrome extension for batch-checking Google `intitle:` / `allintitle:` result counts to support SEO title-competition research. Paste a list of keywords, let the extension search them sequentially, review the results, and export them as CSV.

### Features

- **Batch queries:** Enter one keyword per line and process them sequentially.
- **Two query modes:** `intitle:"keyword"` (exact phrase) and `allintitle:keyword` (all words in the title).
- **Randomized delay:** Waits approximately 3–8 seconds between keywords.
- **CAPTCHA notice:** Pauses when a Google verification page is detected and brings the search tab to the foreground. After the user completes verification, the extension retries the current keyword.
- **Region option:** Optionally pass Google's `gl` region parameter.
- **Reduced personalization:** Optionally adds `pws=0`; this does not guarantee that all personalization is disabled.
- **Local storage:** Keywords, settings, and results are stored in Chrome's local extension storage.
- **CSV export:** Exports keywords, counts, and query settings to CSV (with a BOM for Excel compatibility).
- **Clear results:** Clears the cached query results and run state.

### Installation

#### Option A: Download a GitHub Release (recommended)

1. Visit the project's [Releases page](https://github.com/larrygofast89/TitleScope/releases).
2. Download and extract `TitleScope-vX.Y.Z.zip` for the version you want.
3. Open `chrome://extensions` in Chrome.
4. Enable **Developer mode** in the top-right corner.
5. Click **Load unpacked**.
6. Select the extracted `extension` folder containing `manifest.json`.
7. Optionally pin TitleScope from Chrome's extensions menu.

#### Option B: Install from source

1. Download this repository (Code → Download ZIP) or clone it.
2. Extract it and locate the repository's `extension/` folder.
3. Follow steps 3–7 above.

> This project currently provides a developer-mode installation. It is not a Chrome Web Store listing. Chrome may show a developer-mode extension notice.

### Usage

1. Click the TitleScope toolbar icon and enter one keyword per line.
2. Choose `intitle` (exact phrase) or `allintitle` mode.
3. Select a search region if needed and choose whether to enable **Disable personalization**.
4. Click **开始 (Start)**. Click **停止 (Stop)** to stop a run.
5. When finished, click **导出 CSV (Export CSV)**. Click **清空结果 (Clear)** to clear cached results.

### Search region and result counts

- The extension sets the Google Search interface language to English (`hl=en`).
- **Auto region:** No `gl` parameter is sent. Google may infer a region from your IP address and other signals.
- **Specific region:** `gl=<country code>` (for example, `us`, `gb`, or `jp`) is sent as a hint; it does not guarantee region-specific results.
- **Disable personalization:** Adds `pws=0`, but does not guarantee that account, cookie, IP, or other influences are completely removed.
- Google result counts are estimates. They can vary over time and across regions, data centers, and search contexts. Treat them as comparative indicators, not exact or stable measurements.

### Limitations and disclaimer

- TitleScope automates access to Google Search. Automated requests may be subject to Google's terms, CAPTCHA challenges, or temporary access restrictions. Review and follow applicable terms, keep usage modest, and use the extension at your own risk.
- The extension uses an approximately 3–8 second randomized delay, but this does **not** guarantee that CAPTCHAs or restrictions will not occur. If Google presents a verification or restriction page, stop and follow Google's instructions; do not attempt to bypass access controls.
- Google may change its page structure, which can prevent result-count extraction (shown as `—`). Please report issues via [GitHub Issues](https://github.com/larrygofast89/TitleScope/issues).
- TitleScope is not affiliated with or endorsed by Google.
- Search requests are sent directly from your browser to Google. See the [Privacy Policy](PRIVACY.md) for details.

### Project structure

```text
TitleScope/
├── assets/
│   └── logo-512.png
├── extension/
│   ├── manifest.json
│   ├── background.js
│   ├── popup.html
│   ├── popup.js
│   └── icons/
├── LICENSE
├── PRIVACY.md
└── README.md
```

### Privacy and license

- [Privacy Policy](PRIVACY.md)
- [MIT License](LICENSE)
