<div align="center">
  <br />
  <a href="https://www.eonik.ai">
    <img src="https://www.eonik.ai/logo.svg" alt="eonik" width="120" />
  </a>
  <h1 align="center">eonik MCP Server</h1>
  <p align="center">
    <strong>Connect Claude, Cursor, or Codex to the same brand-brain the Mac app uses</strong>
  </p>
  <p align="center">
    <a href="https://www.eonik.ai">Website</a> •
    <a href="https://www.eonik.ai/mcp">MCP</a> •
    <a href="https://www.eonik.ai/download">Download for Mac</a>
  </p>
</div>

---

## What is eonik?

[eonik](https://www.eonik.ai) is a **Mac app for making ads**. Bring your footage and AI clips; leave with finished, on-brand cuts. The editor is free; you pay for AI generation. **You approve every cut. eonik never touches ad spend.**

This repo is **not** the editor. It is a [Model Context Protocol](https://modelcontextprotocol.io/) stdio bridge so an agent you already pay for can use eonik's **brand brain**: research archive, memory ledger, own-account readouts, grounded briefs.

## Two MCP surfaces (do not mix them up)

| Surface | Where | What it can do |
|---------|--------|----------------|
| **This package** | `api.eonik.ai` via stdio | Brand brain only — gather, research, remember, produce briefs |
| **Mac app** | `127.0.0.1` while eonik is running | Editor timeline **and** the same brand brain (proxied) |

Claude inside the Mac app talks to the local server. Claude Desktop / Cursor / Codex use **this** package (or the remote SSE connector on the API).

There is **one tool layer**: `command_tools.py` → `POST /api/tools/dispatch`. This process does not define tools. It loads `GET /api/tools/manifest` and dispatches by name.

## What the agent can do

Doctrine (CORE_PRINCIPLES): **labor and facts, never judgment, never budget.**

- **Gather** — brand DNA, context ledger, account condition, Monday considerations, own-account memory, watched competitors, category topics, own-ad / campaign readouts (facts only)
- **Research** — deconstruct a public ad, structural patterns, competitor timeline, craft playbook (counts over what survived — never “this caused the win”), swipe file
- **Remember** — verbatim notes, brand truths, dated plans; `remember` / `recall` for durable brand memory
- **Produce** — `get_brief_grounding` (facts; **you** author the brief). `generate_creative_brief` exists but is deprecated.

## What the agent cannot do

No tool pauses, scales, kills, or launches ads. No write access to Meta / TikTok / Google Ads. Upload stays a human click in Ads Manager. Performance **predictions** are banned; readouts are receipts.

v2.0.0 **removed** the old package's banned surface (`run_budget_audit`, `launch_ad_run`, `create_ad_creation_run`, hypothesis queue, budget leaks, etc.). Those routes are not the product.

Not offered on this remote bridge (Mac / UI owned):

- `record_validation_decision` — marketer's own UI action, `revealed` grade
- `save_creative_read` — on-device analyzer contribution from the Mac app

## Quick start

1. Create an API key in eonik (workspace settings).
2. Build and point Claude Desktop (or Cursor) at this server:

```json
{
  "mcpServers": {
    "eonik": {
      "command": "npx",
      "args": ["-y", "eonik-mcp"],
      "env": {
        "EONIK_API_KEY": "eonk_live_...",
        "EONIK_API_URL": "https://api.eonik.ai"
      }
    }
  }
}
```

From a clone:

```bash
npm install && npm run build
export EONIK_API_KEY=eonk_live_...
node build/index.js
```

Optional: `EONIK_BRAND_ID` scopes every call to one brand workspace (`X-Brand-Id`).

## Companion skill

How an agent should **use** these tools: [eonik-mcp-skill](https://github.com/eonik-ai/eonik-mcp-skill).

## Links

- [Download eonik for Mac](https://www.eonik.ai/download)
- [Chrome extension](https://chromewebstore.google.com/detail/eonik/ikjbopcpohlogfbccbpcoglefjlbdcie)
- [GitHub org](https://github.com/eonik-ai)
