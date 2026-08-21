# Official MCP Registry

Server name: **`ai.eonik/mcp`**

That is reverse-DNS of **eonik.ai**, then `/mcp`. It is not GitHub (`io.github.eonik-ai/…`) and it is not `io.eonik/…` (that would claim **eonik.io**, which is not us).

npm package name stays `eonik-mcp`. `mcpName` in `package.json` must match `server.json` `name`.

## Prove eonik.ai

Do **not** `mcp-publisher login github` for this name. GitHub login can only publish `io.github.eonik-ai/…`.

1. Generate a key (once). Keep `key.pem` off git (this repo gitignores `.registry/`).

```bash
mkdir -p .registry
openssl genpkey -algorithm Ed25519 -out .registry/key.pem
PUBLIC_KEY="$(openssl pkey -in .registry/key.pem -pubout -outform DER | tail -c 32 | base64)"
echo "v=MCPv1; k=ed25519; p=${PUBLIC_KEY}"
```

2. Host that one line at `https://eonik.ai/.well-known/mcp-registry-auth`  
   (Vercel env `MCP_REGISTRY_AUTH_PROOF`. The registry fetches the **apex** and treats a 307 to www as failure. Other `eonik.ai` paths still 308 to www.)

3. Log in and publish:

```bash
PRIVATE_KEY="$(openssl pkey -in .registry/key.pem -noout -text | grep -A3 "priv:" | tail -n +2 | tr -d ' :\n')"
mcp-publisher login http --domain eonik.ai --private-key "${PRIVATE_KEY}"
mcp-publisher publish
```

Keep `.registry/key.pem` somewhere durable and off git. Losing it blocks later publishes under `ai.eonik/mcp`.
