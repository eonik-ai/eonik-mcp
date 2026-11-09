# eonik, for agents

eonik's MCP server is `https://api.eonik.ai/mcp` (streamable HTTP, OAuth sign-in). This package,
`eonik-mcp`, is a local bridge to it for hosts that need a local process, plus `init`, which
connects every assistant on a computer to it.

## Connect

```sh
npx eonik-mcp init            # Claude Code, VS Code, Cursor, Codex; says the Claude Desktop steps
npx eonik-mcp init --dry-run  # says what it would do, changes nothing
```

Or add the connector `https://api.eonik.ai/mcp` in the host. The person signs in to eonik in the
browser the first time; never ask them for a password or a key in the chat.

## Set eonik up for a person

The server's own guide is the resource `eonik://guide/set-up`. In short:

1. `get_setup`: where their eonik stands, their brands, their plan, and the one next step.
2. No brand yet: ask for the website if they have not said it, then `create_brand`. In ChatGPT
   this works before sign-in: eonik shows what it read and asks the person to sign in; then call
   `create_brand` again. Nothing else answers before sign-in.
   Several brands and none chosen: ask which, then `use_brand`.
3. `add_competitors` with every competitor they name, each as their Ads Library or Instagram link
   or their name exactly as said. A name comes back as the page the Ad Library shows: ask the
   person if it is the one, then call again with its link. Never add one they have not confirmed.
4. `invite_teammates` with the addresses they give. `connect_source` gives a link to the ad
   platform's own sign-in for the brand; give it to the person.
5. Making or resizing work runs in the eonik app on their Mac. When it is not open, the answer
   says where to install it and which account to sign in with; pass that on.

Plans and credits are said as facts by `get_setup`, with the page that says what each plan
includes. The person chooses a plan there; an agent never buys anything.

## Never

Pause, launch or edit ads; write to an ad account; predict how an ad will perform; or make a choice
that is the person's (making the sizes, approving, sending). Those are buttons they press.

## This repository

`src/index.ts` is the bridge: it forwards the remote server's tools, panel, prompts and questions
unchanged and adds nothing. `src/init.ts` is `init`. `npm run build` compiles; `npm run
check:registry` checks `server.json` before a publish. The server, its tools and their words live
in eonik's private backend; the tools here are never hand-written.
