# TitleScope v1.2.0

Initial public release of TitleScope.

## Highlights

- Batch Google `intitle:` and `allintitle:` result-count queries.
- Optional Google search region (`gl`) and reduced-personalization parameter (`pws=0`).
- Randomized 3–8 second interval between queries.
- Pause and user-assisted continuation when a Google verification page is detected.
- Local persistence of keywords, settings, and query results using `chrome.storage.local`.
- CSV export with UTF-8 BOM for spreadsheet compatibility.

## Installation

1. Download `TitleScope-v1.2.0.zip` from this release and extract it.
2. Open `chrome://extensions` in Chrome and enable Developer mode.
3. Click **Load unpacked** and select the `extension/` folder containing `manifest.json`.

## Notes

- This is a developer-mode release, not a Chrome Web Store listing.
- Google result counts are estimates and may vary.
- Automated Google Search requests may trigger verification or temporary restrictions. Use responsibly and follow Google's instructions.
- See [README](https://github.com/larrygofast89/TitleScope/blob/main/README.md) and [Privacy Policy](https://github.com/larrygofast89/TitleScope/blob/main/PRIVACY.md).
