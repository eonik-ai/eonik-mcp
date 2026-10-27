# Changelog

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
