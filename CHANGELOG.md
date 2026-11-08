# Changelog

## 5.0.0 (2026-11-08)

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
