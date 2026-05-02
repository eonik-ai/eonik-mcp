<div align="center">
  <br />
  <a href="https://eonik.ai">
    <!-- Replace with actual logo URL once public -->
    <img src="https://eonik.ai/logo.svg" alt="eonik" width="120" />
  </a>
  <h1 align="center">eonik MCP Server</h1>
  <p align="center">
    <strong>The Autonomous Marketing Bridge for Claude</strong>
  </p>
  <p align="center">
    <a href="https://eonik.ai">Website</a> •
    <a href="https://api.eonik.ai/docs">API Docs</a> •
    <a href="https://eonik.ai/what-is-creative-velocity">Creative Velocity</a>
  </p>
</div>

---

## ⚡ What is eonik?

[eonik](https://eonik.ai) is the industry's first **Creative Decision Machine** for performance marketers. While other platforms simply describe your data, eonik actively drives the 2026 Marketing Loop:

1. **KILL:** Pauses bleeding ads before they burn budget.
2. **SCALE:** Identifies and accelerates winning creative DNA.
3. **CREATE:** Generates shoot-ready creative briefs predicting exactly what will beat your baseline.
4. **LEARN:** Closes the loop by measuring if the new creation actually worked.

## 🤖 The eonik MCP Server

This [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server allows autonomous AI agents like **Claude Desktop** to connect directly to your eonik workspace. By giving Claude access to this server, it transforms from a chatbot into a fully autonomous marketing co-pilot that can read your Meta Ads data, discover cultural trends, and launch new ad experiments on your behalf.

### Available Capabilities

The MCP exposes the following high-value intelligence tools:

- **Analyze:** `run_budget_audit`, `get_creative_autopsy`
- **Ideate:** `discover_trends`, `get_brand_context`, `search_ad_library`, `get_insights_feed`, `get_experimentation_gaps`
- **Produce:** `create_ad_creation_run`, `compile_seed_spec`
- **Deploy:** `launch_ad_run`

> **Note:** The heavy lifting (neural mapping, budget guardrails, API orchestration) happens securely within the private eonik cloud. This MCP server acts strictly as an authenticated bridge.

---

## 🚀 Quickstart for Claude Desktop

If you are a marketer or founder, you **do not** need to clone this repository. You can give Claude Desktop access to eonik in two minutes:

### Option A: Cloud-Native Connectors (No-Code)
If you don't want to mess with terminal commands, use the direct Cloud-Native SSE connection.
1. Log in to [eonik.ai](https://eonik.ai).
2. Go to **Settings ➔ API Keys** and generate a new key.
3. Open Claude Desktop.
4. Navigate to **Settings ➔ Connectors ➔ Add Custom Connector**.
5. Paste `https://api.eonik.ai/mcp/sse` as the URL, and paste your API key.

### Option B: Local Execution (Power Users)
If you prefer to run the Node wrapper locally via the config file:
1. Open your Claude Desktop config file:
   - **Mac:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
2. Add the `eonik` server configuration:

```json
{
  "mcpServers": {
    "eonik": {
      "command": "npx",
      "args": ["-y", "eonik-mcp@latest"],
      "env": {
        "EONIK_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```
3. Restart Claude Desktop.

---

## 💻 Developer Development

If you wish to contribute or modify the wrapper:

```bash
# Clone the repository
git clone https://github.com/eonik-ai/eonik-mcp.git
cd eonik-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Start the server locally
npm start
```

### Environment Variables
- `EONIK_API_KEY`: Required. Your platform API key.
- `EONIK_API_URL`: Optional. Overrides the default `https://api.eonik.ai` endpoint.

---

## 🛡️ Security & Privacy
This repository contains no proprietary neural network weights or scoring logic. All multi-tenant isolation, Meta Ads OAuth security, and guardrails are enforced upstream by the eonik backend. Never commit your `.env` file or share your `EONIK_API_KEY`.

---
*Built with precision for the agentic era by [eonik.ai](https://eonik.ai).*
