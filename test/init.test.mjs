// node --test: `npx eonik-mcp init` teaches the ways in that eonik's one list holds, and the list is eonik-backend's.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const LIST = JSON.parse(readFileSync(new URL("../src/assistants.json", import.meta.url)));
const dry = execFileSync(process.execPath, ["build/index.js", "init", "--dry-run"], { encoding: "utf8", env: { ...process.env, PATH: "/usr/bin:/bin" } });

test("the stamped list is eonik-backend's, when both are checked out", () => {
  const source = new URL("../../eonik-backend/app/schemas/assistants.json", import.meta.url);
  if (!existsSync(source)) return;
  assert.equal(readFileSync(new URL("../src/assistants.json", import.meta.url), "utf8"), readFileSync(source, "utf8"));
});

test("every command init runs is the list's own", () => {
  const init = readFileSync(new URL("../src/init.ts", import.meta.url), "utf8");
  for (const id of ["claudecode", "codex", "geminicli"]) assert.match(init, new RegExp(`listedCommand\\("${id}"\\)`), id);
  assert.match(init, /listed\("chatgpt"\)/);
  assert.match(init, /listed\("claude"\)/);
  for (const a of LIST.assistants.filter((x) => x.connect.how === "command")) {
    assert.ok(a.connect.command.includes("{address}"), a.id);
  }
});

test("with no assistant on the computer, init says how any assistant connects", () => {
  assert.match(dry, new RegExp(LIST.address.replace(/[.]/g, "\\.")));
  assert.match(dry, /ChatGPT: connect eonik from its listing, https:\/\/chatgpt\.com\//);
});

// Windsurf's file is the person's: init adds eonik beside what is there, once, and never rewrites a file it cannot read.
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

function initIn(home) {
  return execFileSync(process.execPath, ["build/index.js", "init"], { encoding: "utf8", env: { ...process.env, HOME: home, PATH: "/usr/bin:/bin" } });
}

test("windsurf: eonik is added beside the servers already there, and a second run changes nothing", () => {
  const home = mkdtempSync(join(tmpdir(), "eonik-init-"));
  const dir = join(home, ".codeium", "windsurf");
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "mcp_config.json");
  writeFileSync(file, JSON.stringify({ mcpServers: { other: { command: "x" } }, keep: 1 }));
  assert.match(initIn(home), /Windsurf: connected/);
  const after = JSON.parse(readFileSync(file, "utf8"));
  assert.deepEqual(after.mcpServers.other, { command: "x" });
  assert.equal(after.keep, 1);
  assert.deepEqual(after.mcpServers.eonik, { serverUrl: LIST.address });
  const bytes = readFileSync(file, "utf8");
  assert.match(initIn(home), /Windsurf: already connected/);
  assert.equal(readFileSync(file, "utf8"), bytes);
});

test("windsurf: a file that is not JSON is left exactly as it was, and the line to add is said", () => {
  const home = mkdtempSync(join(tmpdir(), "eonik-init-"));
  const dir = join(home, ".codeium", "windsurf");
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "mcp_config.json");
  writeFileSync(file, "{ // a comment\n}");
  assert.match(initIn(home), /Windsurf: left .* alone/);
  assert.equal(readFileSync(file, "utf8"), "{ // a comment\n}");
});
