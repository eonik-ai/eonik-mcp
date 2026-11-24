<div align="center">
  <a href="https://www.eonik.ai">
    <img src="https://www.eonik.ai/logo.svg" alt="eonik" width="160" />
  </a>
  <h1>eonik</h1>
  <p><strong>Finished, on-brand ads without the busywork.</strong></p>
  <p>eonik watches your competitors' ads, reads your own, and makes every size of an ad on-brand in the eonik app on your Mac. Ask for it from Claude, ChatGPT, Cursor, Codex or VS Code. Nothing is made, changed or sent until you say so.</p>
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

eonik gets you **finished, on-brand ads without the busywork.** Your assistant can set eonik up
for your brand, keep watch on the competitors you name, read how your own ads are doing, and have
the eonik app on your Mac make every size of an ad, on-brand, checked, sent for approval and
delivered. Nothing is made, changed or sent until you say so.

Setting up, competitors and your own ads work from any assistant. Making and resizing runs in the
**eonik app on your Mac** ([download](https://www.eonik.ai/download) · macOS 15+ · Apple
silicon), where your files and fonts are.

## What you can ask

**Setting up**
- *"Set eonik up for my brand, acme.com."* eonik reads your site and sets up the brand.
- *"Watch Gymshark and this Ads Library link for us."* A link is added at once; a name comes back
  as the page the Ad Library shows, for you to confirm.
- *"Invite sam@acme.com."* · *"Connect our Meta ad account."* · *"What plan are we on?"*

**Research**
- *"What did our competitors change this week?"* · *"Break that ad down, scene by scene."*
- *"How are our own ads doing?"* · *"What have we already tested?"*
- *"Remember: we never show the old logo."*

**The work** (in the eonik app on your Mac)
- *"Where are we?"* What needs you, what is being made, what the client said.
- *"Adapt the spring master to the launch set, and add 1080x617."* eonik makes every size and shows
  you each one before anything is final.
- *"Make the logo bigger on 300x250"* · *"Undo that."* · *"A Hindi version of this."*
- *"Is this OK to send?"* · *"Check this zip against the media plan."* · *"Send it to the client."*
- *"An ad for the summer sale"* · *"Recreate this ad with our product."* eonik shows what it will
  cost first; nothing is made until you approve it.

## What it never does

It cannot pause, scale, launch or edit ads, and it cannot write to Meta, TikTok or Google Ads. It
never says an ad "will work". It never makes a choice that is yours: making the sizes, approving,
sending past a rule finding. Those are buttons you press, in eonik's panel or in eonik itself.

## Connect

**Every assistant on this computer, in one command:**

```sh
npx eonik-mcp init
```

It adds eonik to Claude Code, Codex, Gemini CLI, VS Code, Cursor and Windsurf, each the way that
assistant documents, and says what to do in Claude Desktop, Zed and Perplexity. No key is copied:
each assistant signs you in to eonik the first time it uses it. `npx eonik-mcp init --dry-run`
shows what it would do and changes nothing.

**Any other assistant that adds MCP servers** (claude.ai, Perplexity, Grok, Le Chat, Copilot
Studio, Muse and the rest): add `https://api.eonik.ai/mcp` as a custom connector and sign in with
your eonik account. ChatGPT connects from eonik's listing. Each one's steps:
[eonik.ai/mcp](https://www.eonik.ai/mcp).

**Hosts that need a local process** (Claude Desktop's config file, older setups): this package
bridges them to the same server.

1. Create an API key in eonik (Settings, API keys).
2. Add this to the host's MCP config:

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

`EONIK_BRAND_ID` is optional: with more than one brand, you choose in the conversation, and eonik
never guesses which client's work you mean. `EONIK_API_URL` defaults to `https://api.eonik.ai`.

The bridge forwards exactly what the server offers (tools, the panel, prompts and eonik's
questions to you) and adds nothing of its own.

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
