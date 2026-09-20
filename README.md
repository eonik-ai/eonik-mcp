<div align="center">
  <a href="https://www.eonik.ai">
    <img src="https://www.eonik.ai/logo.svg" alt="eonik" width="160" />
  </a>
  <h1>eonik</h1>
  <p><strong>Finished, on-brand ads without the busywork.</strong></p>
  <p>You see what’s worth making. eonik builds the cut. You approve. Connect Claude, Cursor, or Codex to that same account: the assistant reads and drafts; it never spends. The cut itself is made on Mac.</p>
  <p>
    <a href="https://www.eonik.ai">Website</a> ·
    <a href="https://www.eonik.ai/download">Download for Mac</a> ·
    <a href="https://www.eonik.ai/mcp">Connect an assistant</a> ·
    <a href="https://github.com/eonik-ai">GitHub</a>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/eonik-mcp"><img src="https://img.shields.io/npm/v/eonik-mcp?style=flat-square" alt="npm version" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-18181B?style=flat-square" alt="MIT license" /></a>
    <a href="https://modelcontextprotocol.io"><img src="https://img.shields.io/badge/MCP-Model%20Context%20Protocol-555?style=flat-square" alt="Model Context Protocol" /></a>
    <img src="https://img.shields.io/badge/macOS-15%2B%20Apple%20silicon-000?style=flat-square" alt="macOS 15+ Apple silicon" />
  </p>
  <p>
    <strong>English</strong> ·
    <a href="docs/readme/README.es.md">Español</a> ·
    <a href="docs/readme/README.pt-BR.md">Português</a> ·
    <a href="docs/readme/README.fr.md">Français</a> ·
    <a href="docs/readme/README.hi.md">हिन्दी</a> ·
    <a href="docs/readme/README.zh-CN.md">简体中文</a> ·
    <a href="docs/readme/README.ja.md">日本語</a> ·
    <a href="docs/readme/README.ko.md">한국어</a>
  </p>
</div>

---

eonik gets you **finished, on-brand ads without the busywork.** You start from an ad that already works, build the cut from your footage (AI fills the gaps), check it against your brand, and get it approved. **You stay in control and take the credit.**

You do that work in the **Mac app** ([download](https://www.eonik.ai/download) · editor free · macOS 15+ · Apple silicon). This repository connects Claude, Cursor, or Codex to the same account so the assistant can read brand, research, and performance facts, then draft. It never spends. You approve every cut. Timeline edits and export stay on Mac.

## What the assistant can do

- Read your brand, notes you asked it to remember, and ads you saved
- Look up competitor ads eonik already archived (what ran, how long, how it is built)
- Read your own Meta performance as **facts** (spend, CTR, status) — never as a prediction
- Break down a public ad scene by scene
- Hand you receipts so **you** write the brief

## What it cannot do

It cannot pause, scale, kill, or launch ads. It cannot write to Meta, TikTok, or Google Ads. Upload is a human click in Ads Manager. It will not say an ad “will work.”

## Install

1. Create an API key in eonik (workspace settings).
2. Add this to Claude Desktop, Cursor, or Codex:

```json
{
  "mcpServers": {
    "eonik": {
      "command": "npx",
      "args": ["-y", "eonik-mcp"],
      "env": {
        "EONIK_API_KEY": "eonk_live_..."
      }
    }
  }
}
```

Optional: `EONIK_API_URL` (default `https://api.eonik.ai`) and `EONIK_BRAND_ID` if you have more than one brand.

From a clone:

```bash
npm install && npm run build
export EONIK_API_KEY=eonk_live_...
node build/index.js
```

How the assistant should work, once connected: [eonik-mcp-skill](https://github.com/eonik-ai/eonik-mcp-skill) (`openclaw skills install @techievena/eonik`).

## Security

Keep `EONIK_API_KEY` in your MCP host env. Do not commit it. See [SECURITY.md](SECURITY.md).

## Also

| | |
|---|---|
| Download for Mac | [eonik.ai/download](https://www.eonik.ai/download) · editor free · macOS 15+ · Apple silicon |
| Connect an assistant | [eonik.ai/mcp](https://www.eonik.ai/mcp) |
| Homebrew | [homebrew-tap](https://github.com/eonik-ai/homebrew-tap) |
| Save ads you see | [Chrome extension](https://chromewebstore.google.com/detail/eonik/ikjbopcpohlogfbccbpcoglefjlbdcie) |

## License

MIT. See [LICENSE](LICENSE).
