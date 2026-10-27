<div align="center">
  <a href="https://www.eonik.ai">
    <img src="https://www.eonik.ai/logo.svg" alt="eonik" width="160" />
  </a>
  <h1>eonik</h1>
  <p><strong>Finished, on-brand ads without the busywork.</strong></p>
  <p>Your designer makes the master. eonik makes every size your media plan asks for, on-brand, in the eonik app on your Mac. Ask for it from Claude, ChatGPT, Cursor, Codex or VS Code. Nothing is made, changed or sent until you say so.</p>
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

eonik gets you **finished, on-brand ads without the busywork.** Your designer makes the master;
eonik makes the adapts: every size a media plan asks for, with your brand's fonts, rules and
layout kept the same way on every size, checked, sent for approval and delivered.

The work runs in the **eonik app on your Mac** ([download](https://www.eonik.ai/download) · macOS
15+ · Apple silicon), where your files and fonts are. Connect Claude, ChatGPT, Cursor, Codex or
VS Code to it and ask in your own words; your assistant asks eonik, and eonik does the work on
your computer. Nothing is made, changed or sent until you say so.

## What you can ask

- *"Where are we?"* What needs you, what is being made, what the client sent back.
- *"Adapt the spring master to the launch set, and add 1080x617."* eonik makes every size and shows you
  each one before anything is final.
- *"Make the logo bigger on 300x250"* · *"Use the evening photo on every size."*
- *"Is this OK to send?"* The brand's rules on every size: the project's legal line, the mark,
  the typeface, the smallest text, file-size limits.
- *"Send it to the client"* · *"What did the client say?"*
- *"The tower project got its RERA number."* eonik saves it and prepares every
  creative that prints the old value.
- *"Check these Meta headlines"* · *"Package the launch set for media."*
- *"Make the headline shorter on every size"* · *"Undo that."*
- *"A Hindi version of this"* · *"The same ad with an older couple."*
- *"An ad for the summer sale."* eonik writes the script and shows what it costs to make;
  nothing is made until you approve it.
- *"Recreate this ad with our product."* · *"Check this zip against the media plan."*
- *"My brand files are in this folder, bring them in."* · *"What did my assistant do today?"*

## What it never does

It cannot pause, scale, launch or edit ads, and it cannot write to Meta, TikTok or Google Ads. It
never says an ad "will work". It never makes a choice that is yours: making the sizes, approving,
sending past a rule finding. Those are buttons you press, in eonik's panel or in eonik itself.

## Connect

**Claude (claude.ai, Desktop), ChatGPT, VS Code:** add the connector `https://api.eonik.ai/mcp`
and sign in with your eonik account; you choose the brand when you connect.

**Hosts that run local servers** (Claude Desktop's config file, Cursor, Codex): this package
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
        "EONIK_API_KEY": "eonk_live_...",
        "EONIK_BRAND_ID": "the brand this connection is about"
      }
    }
  }
}
```

`EONIK_BRAND_ID` is required if you have more than one brand: eonik never guesses which client's
work you mean, and tells you the choices if it is missing. `EONIK_API_URL` defaults to
`https://api.eonik.ai`.

The bridge forwards exactly what the server offers (tools, the panel, prompts and eonik's
questions to you) and adds nothing of its own. Keep eonik open on your Mac while you work.

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
