# Security

Report vulnerabilities to [connect@eonik.ai](mailto:connect@eonik.ai). Do not open a public issue with secrets or a working exploit.

## Keys

`EONIK_API_KEY` is a workspace secret. Put it in the MCP host environment (Claude Desktop / Cursor / Codex). Never commit it. Rotate it in eonik if it leaks.

## What this connector can access

With a valid key it can read brand, research, and performance facts for **that workspace**, and save notes the user asked it to remember. It cannot move ad spend or publish to ad accounts.

## Mac app

Footage and local library stay on the Mac. This connector talks to `api.eonik.ai` for account research and memory — not for your local files.
