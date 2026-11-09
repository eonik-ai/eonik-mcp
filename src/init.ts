/**
 * `npx eonik-mcp init`: connect eonik to every assistant on this computer, in one command.
 *
 * Each host is told about eonik's ONE server, https://api.eonik.ai/mcp, the way that host documents
 * (read from each host's own docs on 2026-11-09). Where a host has its own command, the host writes
 * its own config; only Cursor, which documents a file and no command, has its file merged here, and
 * only its `eonik` entry is touched. Nobody copies a key: each host signs the person in to eonik
 * (OAuth) the first time it uses eonik. Claude Desktop adds connectors in its own settings, so the
 * step is said, not done. `--dry-run` says everything and changes nothing.
 *
 *   Claude Code  `claude mcp add --transport http --scope user eonik <url>`  (code.claude.com/docs/en/mcp)
 *   VS Code      `code --add-mcp '{"name":…,"type":"http","url":…}'`         (code.visualstudio.com, MCP)
 *   Cursor       ~/.cursor/mcp.json  {"mcpServers": {"eonik": {"url": …}}}    (cursor.com/docs/context/mcp)
 *   Codex        `codex mcp add eonik --url <url>`, then `codex mcp login`   (Codex MCP docs)
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { homedir, platform } from "node:os";
import { join } from "node:path";

export const MCP_URL = "https://api.eonik.ai/mcp";
const CHATGPT_LISTING = "https://chatgpt.com/plugins/plugin_asdk_app_6aca11964e3c8191816c4ec1345c3e9a";
const CLAUDE_CONNECTORS = "https://claude.ai/settings/connectors";
const NAME = "eonik";

type Outcome = { host: string; said: string };

/** Whether a command is on PATH, without running it. */
function has(command: string): boolean {
  const which = platform() === "win32" ? "where" : "which";
  return spawnSync(which, [command], { stdio: "ignore" }).status === 0;
}

function run(command: string, args: string[]): { ok: boolean; out: string } {
  const r = spawnSync(command, args, { encoding: "utf8" });
  return { ok: r.status === 0, out: `${r.stdout ?? ""}${r.stderr ?? ""}`.trim() };
}

function claudeCode(dry: boolean): Outcome | null {
  if (!has("claude")) return null;
  const host = "Claude Code";
  if (run("claude", ["mcp", "get", NAME]).ok) return { host, said: "already connected" };
  if (dry) return { host, said: `would run: claude mcp add --transport http --scope user ${NAME} ${MCP_URL}` };
  const r = run("claude", ["mcp", "add", "--transport", "http", "--scope", "user", NAME, MCP_URL]);
  return { host, said: r.ok ? "connected; run /mcp in Claude Code once to sign in"
    : `could not add eonik (${r.out || "no reason given"})` };
}

function vsCode(dry: boolean): Outcome | null {
  if (!has("code")) return null;
  const host = "VS Code";
  const entry = JSON.stringify({ name: NAME, type: "http", url: MCP_URL });
  if (dry) return { host, said: `would run: code --add-mcp '${entry}'` };
  const r = run("code", ["--add-mcp", entry]);
  return { host, said: r.ok ? "connected; VS Code signs you in the first time it uses eonik"
    : `could not add eonik (${r.out || "no reason given"})` };
}

function cursor(dry: boolean): Outcome | null {
  const dir = join(homedir(), ".cursor");
  if (!existsSync(dir)) return null;
  const host = "Cursor";
  const file = join(dir, "mcp.json");
  let config: { mcpServers?: Record<string, unknown> } = {};
  if (existsSync(file)) {
    try {
      config = JSON.parse(readFileSync(file, "utf8"));
    } catch {
      // A file Cursor itself could not read either: never overwritten, said instead.
      return { host, said: `left ${file} alone: it is not valid JSON. Add "${NAME}": {"url": "${MCP_URL}"} under mcpServers.` };
    }
  }
  const servers = (config.mcpServers ?? {}) as Record<string, { url?: string }>;
  if (servers[NAME]?.url === MCP_URL) return { host, said: "already connected" };
  if (dry) return { host, said: `would add "${NAME}" to ${file}` };
  const next = { ...config, mcpServers: { ...servers, [NAME]: { url: MCP_URL } } };
  mkdirSync(dir, { recursive: true });
  // Written beside, then moved into place: a half-written file is never what Cursor reads.
  writeFileSync(`${file}.eonik-tmp`, `${JSON.stringify(next, null, 2)}\n`);
  renameSync(`${file}.eonik-tmp`, file);
  return { host, said: "connected; Cursor signs you in the first time it uses eonik" };
}

function codex(dry: boolean): Outcome | null {
  if (!has("codex")) return null;
  const host = "Codex";
  if (dry) return { host, said: `would run: codex mcp add ${NAME} --url ${MCP_URL}` };
  const r = run("codex", ["mcp", "add", NAME, "--url", MCP_URL]);
  return { host, said: r.ok ? `connected; run \`codex mcp login ${NAME}\` once to sign in`
    : `could not add eonik (${r.out || "no reason given"}); add a server named ${NAME} with url ${MCP_URL}` };
}

function claudeDesktop(): Outcome | null {
  const app = platform() === "darwin" ? "/Applications/Claude.app" : null;
  if (!app || !existsSync(app)) return null;
  return { host: "Claude Desktop", said: `add it in Claude: Customize > Connectors > + Add > Add custom connector, URL ${MCP_URL}, then Sign in` };
}

function theMac(): string | null {
  if (platform() !== "darwin") return "Making and resizing ads runs in the eonik app, on a Mac. Everything else works from your assistant.";
  if (existsSync("/Applications/eonik.app")) return null;
  return "Making and resizing ads runs in the eonik app on your Mac: "
    + (has("brew") ? "brew install --cask eonik-ai/tap/eonik" : "https://www.eonik.ai/download");
}

export function init(argv: string[]): number {
  const dry = argv.includes("--dry-run");
  const found = [claudeCode(dry), vsCode(dry), cursor(dry), codex(dry), claudeDesktop()]
    .filter((o): o is Outcome => o !== null);
  console.log(dry ? "eonik: what init would do (nothing is changed)\n" : "eonik: connecting your assistants\n");
  if (!found.length) {
    console.log(`No assistant found on this computer. In any assistant, add the connector ${MCP_URL} and sign in to eonik.`);
  }
  for (const o of found) console.log(`  ${o.host}: ${o.said}`);
  // The same two doors the website's /mcp page gives (eonik-website `lib/assistants/connect.ts`).
  console.log(`\nChatGPT: connect eonik from its listing, ${CHATGPT_LISTING}`);
  console.log(`claude.ai: ${CLAUDE_CONNECTORS}, Add custom connector, ${MCP_URL}`);
  const mac = theMac();
  if (mac) console.log(`\n${mac}`);
  console.log("\nThen ask your assistant: \"Set eonik up for my brand.\"");
  return found.some((o) => o.said.startsWith("could not")) ? 1 : 0;
}
