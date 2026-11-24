# Changelog

## 5.2.0 (2026-11-24)

Antigravity, Google's replacement for Gemini CLI on personal accounts, connects to eonik. Tools and replies are
unchanged.

### New

- **`npx eonik-mcp init` adds eonik to Antigravity** (`~/.gemini/config/mcp_config.json`, beside the servers already
  there) and says how to sign in: run `agy`, type `/mcp`, choose eonik. Walked on production on 24 Nov with
  Antigravity CLI 1.5.16.
- **Glama can verify eonik's listing** at `https://api.eonik.ai/mcp/.well-known/glama.json`.

### Changed

- **Gemini CLI is offered for work licences and API keys only.** Google retired it for personal accounts on
  18 Jun 2026; it refuses them with "This client is no longer supported for Gemini Code Assist for individuals".

## 5.1.0 (2026-11-24)

Any assistant can now connect to eonik and sign in, not only the ones eonik had listed. Tools and replies are
unchanged.

### New

- **Sign-in is open to any assistant** that returns to an https address or to the person's own computer. eonik's
  sign-in page names an assistant it knows by its name, and any other by its own site ("Access goes to glama.ai"),
  so a person always sees where access goes before pressing Allow. Before this, a web assistant eonik had not listed
  was refused at sign-in.
- **A browser-based assistant can call eonik** from any https site, without cookies: `/mcp`, the sign-in endpoints
  and the discovery documents answer it.
- **`https://www.eonik.ai/mcp` is the same server** as `https://api.eonik.ai/mcp`: either address connects and signs
  in.
- **eonik's Server Card** is at `https://api.eonik.ai/mcp/server-card` (MCP SEP-2127), listed in
  `https://www.eonik.ai/.well-known/ai-catalog.json`.
- **`npx eonik-mcp init`** also connects Gemini CLI and Windsurf, and says how to add eonik to Zed and Perplexity.
  Every command comes from eonik's one list of assistants (`src/assistants.json`).

### Fixed

- The protected-resource document at the server's root now names the server's own address (RFC 9728 §3.3); the
  `/mcp` document, which every sign-in uses, is unchanged.

## 5.0.0 (2026-11-09)

An assistant can now set eonik up for a new person, and eonik lists 30 tools instead of 46: fewer,
each covering one thing a person asks, so an assistant reads less before it works and picks the
right tool more often. Tool names changed: a host that saved 4.0's names lists the tools again.

### New

- **`get_setup`** says where the person's eonik stands and the one next step (their account, an
  invitation waiting for them, their brand, then competitors, their ad account and eonik on their
  Mac), their brands and which one this connection works on, and their plan and credits as facts:
  what is left, when more come and what the plan includes, with the page that says what each plan
  includes.
- **`create_brand`** sets up a brand from its website. **`use_brand`** chooses one of the
  person's brands in the conversation, with no new sign-in; two brands with the same name are
  told apart by workspace.
- **`add_competitors`** adds the competitors the person names, in one call: a Meta or TikTok Ads
  Library link or an Instagram link is added at once; a name comes back with the page the Ad
  Library shows for it, and is added only when called again with that page's link, after the
  person confirms it. It says what follows: the Monday email on what they are doing, or that the
  plan does not watch competitors.
- **`invite_teammates`** invites people to the person's workspace by email.
- **`connect_source`** gives the person Meta's, TikTok's or Google Ads' own sign-in link, made for
  the brand this conversation works on; they sign in there and choose the ad account on eonik.ai.
  It says first when the account is already connected or the plan has no ad platform left.
- A **guide** for setting eonik up (`eonik://guide/set-up`).
- **In ChatGPT, a brand can be read before sign-in**, as on eonik.ai: `create_brand` shows what eonik
  read from the site and opens ChatGPT's sign-in to eonik; nothing is saved until the person signs
  in. Every other tool, the ad library included, asks them to sign in first. Each tool declares
  which it is (`securitySchemes`). Other assistants sign in as they connect, as before.

- **`npx eonik-mcp init`** connects eonik to every assistant on the computer in one command:
  Claude Code, VS Code, Cursor and Codex, each the way that assistant documents, and says the
  steps for Claude Desktop. No key is copied; each assistant signs you in the first time it uses
  eonik. `--dry-run` shows what it would do and changes nothing. Codex asks you to sign in while
  `init` runs, in the same terminal; if you do not finish, `init` says so and names
  `codex mcp login eonik`.
- **Assistants on your computer can sign in to eonik.** Claude Code, Codex, Cursor and VS Code
  return from the sign-in to a port on your computer, which eonik refused until now.
- The registry entry lists the hosted server (`remotes`), so a registry client can connect to
  `https://api.eonik.ai/mcp` with sign-in, without the local bridge.

### Changed: one tool for each question

| 5.0 | Replaces |
|---|---|
| `get_brand` (with `search`) | `get_brand_overview`, `search_brand_memory` |
| `get_competitor_ads` | `list_watched_competitors`, `list_competitor_ads`, `get_competitor_activity` |
| `get_ad_breakdown` (lists them when no ad is named) | `list_ad_breakdowns`, `get_ad_breakdown` |
| `get_my_ads` (one ad when named) | `list_my_ads`, `get_my_ad_performance`, `get_my_tested_history` |
| `get_work` | `get_adapts_status`, `get_client_notes` |
| `get_creative` (with `compare_with`) | `get_creative`, `compare_versions` |
| `check_before_sending` (with `package`) | `check_before_sending`, `check_package` |
| `make_ad` (with `from_ad`) | `make_ad`, `recreate_ad` |
| `change_creative` (with `back_to`, or the person's words) | `change_creative`, `undo_change`, `revise_adapts` |

- **A connection with no brand is no longer refused outright.** It was answered "Connect eonik
  again, choose the brand" on every request, which a new person could not do. Now its tools are
  listed, and a tool about a brand says which step fixes it (`create_brand` or `use_brand`).
- eonik never guesses which brand a connection is about: with no brand chosen, nothing falls
  back to the most recently updated one.
- Tool schemas carry only the words written for each parameter.
- Any member of a workspace may connect the brand's ad account; a viewer may not, and
  `connect_source` says so instead of handing over a link.
- Six tools that may reach outside eonik now say so (`openWorldHint`): `create_brand` reads a
  website, `add_competitors` searches public ad libraries, `invite_teammates` sends an email, and
  `make_adapts`, `change_creative` and `onboard_brand` may ask the assistant the person chose in
  eonik.
- `EONIK_BRAND_ID` is optional: with more than one brand, you choose in the conversation.

## 4.0.0 (2026-10-27)

Thirteen new tools. eonik now works on one creative at a time, makes new ads, answers the
client's notes and brings a brand in from its handover files. All 27 tools from 3.0 keep their
names.

### New

- **One creative:** `get_creative` shows every size with its words and what each line is for;
  `change_creative` changes named pieces on one size, several or every size; `undo_change` puts
  a creative back to a saved state; `compare_versions` shows what changed; `make_versions` makes
  versions that differ in one thing (the person shown, the setting, the language or one line).
- **New ads:** `make_ad` makes an ad from what the person wants said, showing the script and its
  price for one approval; `recreate_ad` keeps an ad's film, shots and timing and puts the brand's
  product, person or place in it.
- **The client's review:** `answer_client_note` replies under a reviewer's note; `answer_change`
  saves, or doesn't, a change the person was shown.
- **Packages:** `check_package` checks a finished zip or folder against what the media plan asked
  for, file by file.
- **The brand:** `find_brand_pictures` finds the brand's own photos, logos and products;
  `onboard_brand` brings in a folder or zip of the brand's handover files; `get_activity` shows
  what assistants did for the brand.
- **Guides** for each job, as resources (`eonik://guide/<id>`) and prompts.

### Changed (why this is 4.0.0)

- **Permissions.** A connection asks for five: read, make, change, spend credits and team. A
  connection without "spend credits" is told so before any price is asked, and a viewer's seat
  only reads.
- **Every reply says how the work went,** in `structuredContent.operation`. A result eonik could
  not verify is never reported as clean.
- **Long jobs** can be followed as MCP Tasks by hosts that support them.
- **The server names its own version** (`serverInfo.version`), not the SDK's.

The bridge still forwards everything to `https://api.eonik.ai/mcp` and adds no tool of its own.

## 3.0.0 (2026-10-10)

eonik's adapts in your assistant, through the one reviewed server: make every size of a creative
in the eonik app on the person's Mac, revise, check, send for approval and deliver, with the brand
and research tools.
