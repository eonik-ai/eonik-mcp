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
 *   Codex        `codex mcp add eonik --url <url>`, which starts the sign-in itself   (Codex MCP docs)
 *   Gemini CLI   `gemini mcp add --scope user --transport http eonik <url>`, then `/mcp auth eonik` in it
 *   Windsurf     ~/.codeium/windsurf/mcp_config.json  {"mcpServers": {"eonik": {"serverUrl": …}}}
 *   Zed          said, not written: its settings file may hold comments a rewrite would lose
 *
 * Every command and file comes from eonik's ONE list of assistants (`src/assistants.json`, stamped from
 * eonik-backend `app/schemas/assistants.json` by `python -m ops.assistants --write`), so this, the website's /mcp
 * page and the Mac app cannot teach different ways in.
 *
 * ⚠️ CODEX SIGNS IN DURING `add` (codex-cli 0.166, 2026-11-10): it finds eonik's OAuth, prints a sign-in
 * address and waits for the browser to come back. Run with its output captured, the person never saw the
 * address, Codex timed out, and `init` reported "could not add eonik" for a server Codex HAD added. So
 * Codex runs in the person's own terminal, and what happened is read back from Codex itself
 * (`codex mcp list --json`: whether eonik is there, and its `auth_status`), never from its exit code.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { homedir, platform } from "node:os";
import { join } from "node:path";

import LIST from "./assistants.json" with { type: "json" };

export const MCP_URL = LIST.address;

type Listed = (typeof LIST.assistants)[number];
function listed(id: string): Listed {
  const a = LIST.assistants.find((x) => x.id === id);
  if (!a) throw new Error(`${id} is not in eonik's list of assistants`);
  return a;
}
/** A command from the list, with eonik's address in it, split for spawning. */
function listedCommand(id: string): string[] {
  const line = (listed(id).connect as { command: string }).command.replaceAll("{address}", MCP_URL);
  return line.split(" ");
}
const CHATGPT_LISTING = (listed("chatgpt").connect as { url: string }).url;
const CLAUDE_CONNECTORS = (listed("claude").connect as { url: string }).url;
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
  const [command, ...args] = listedCommand("claudecode");
  if (dry) return { host, said: `would run: ${[command, ...args].join(" ")}` };
  const r = run(command, args);
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

type CodexServer = { name: string; transport?: { url?: string | null }; auth_status?: string };

/** eonik as Codex has it, or null when Codex has no server by that name; undefined when Codex cannot say. */
function codexEonik(): CodexServer | null | undefined {
  const r = spawnSync("codex", ["mcp", "list", "--json"], { encoding: "utf8" });
  if (r.status !== 0) return undefined;
  try {
    const servers = JSON.parse(r.stdout) as CodexServer[];
    return servers.find((s) => s.name === NAME) ?? null;
  } catch {
    return undefined;
  }
}

function codexSaid(server: CodexServer | null | undefined): string | null {
  if (server === undefined) return null;
  if (server === null) return `could not add eonik; add a server named ${NAME} with url ${MCP_URL}`;
  if (server.transport?.url !== MCP_URL) {
    return `left alone: Codex already has a server named ${NAME}, at ${server.transport?.url ?? "another address"}`;
  }
  return server.auth_status === "not_logged_in"
    ? `added; sign in with \`codex mcp login ${NAME}\``
    : "connected";
}

function codex(dry: boolean): Outcome | null {
  if (!has("codex")) return null;
  const host = "Codex";
  const before = codexEonik();
  if (before) return { host, said: codexSaid(before) === "connected" ? "already connected" : codexSaid(before)! };
  if (dry) return { host, said: `would run: ${listedCommand("codex").join(" ")} (Codex then asks you to sign in)` };
  console.log("  Codex: adding eonik. Codex asks you to sign in to eonik in your browser:\n");
  const [command, ...args] = listedCommand("codex");
  const r = spawnSync(command, args, { stdio: "inherit" });
  console.log("");
  return { host, said: codexSaid(codexEonik()) ?? (r.status === 0 ? "connected"
    : `could not tell whether eonik was added; run \`codex mcp list\``) };
}

function geminiCli(dry: boolean): Outcome | null {
  if (!has("gemini")) return null;
  const host = "Gemini CLI";
  const [command, ...args] = listedCommand("geminicli");
  const then = (listed("geminicli").connect as { then: string }).then;
  // `gemini mcp list` prints one server a line: "✓ eonik: https://api.eonik.ai/mcp (http) - Connected" (0.46.0).
  if (new RegExp(`^\\W*${NAME}: https?://`, "m").test(run("gemini", ["mcp", "list"]).out)) {
    return { host, said: "already connected" };
  }
  if (dry) return { host, said: `would run: ${[command, ...args].join(" ")}` };
  const r = run(command, args);
  return { host, said: r.ok ? `connected; ${then}` : `could not add eonik (${r.out || "no reason given"})` };
}

function windsurf(dry: boolean): Outcome | null {
  const dir = join(homedir(), ".codeium", "windsurf");
  if (!existsSync(dir)) return null;
  const host = "Windsurf";
  const file = join(dir, "mcp_config.json");
  let config: { mcpServers?: Record<string, unknown> } = {};
  if (existsSync(file)) {
    try {
      config = JSON.parse(readFileSync(file, "utf8"));
    } catch {
      return { host, said: `left ${file} alone: it is not valid JSON. Add "${NAME}": {"serverUrl": "${MCP_URL}"} under mcpServers.` };
    }
  }
  const servers = (config.mcpServers ?? {}) as Record<string, { serverUrl?: string }>;
  if (servers[NAME]?.serverUrl === MCP_URL) return { host, said: "already connected" };
  if (dry) return { host, said: `would add "${NAME}" to ${file}` };
  const next = { ...config, mcpServers: { ...servers, [NAME]: { serverUrl: MCP_URL } } };
  writeFileSync(`${file}.eonik-tmp`, `${JSON.stringify(next, null, 2)}\n`);
  renameSync(`${file}.eonik-tmp`, file);
  return { host, said: "connected; Windsurf asks you to sign in the first time it uses eonik" };
}

function zed(): Outcome | null {
  const dir = join(homedir(), ".config", "zed");
  if (!existsSync(dir) && !existsSync("/Applications/Zed.app")) return null;
  return { host: "Zed", said: `add to its settings, under context_servers: "${NAME}": { "url": "${MCP_URL}" }; Zed then asks you to sign in` };
}

function perplexity(): Outcome | null {
  if (platform() !== "darwin" || !existsSync("/Applications/Perplexity.app")) return null;
  return { host: "Perplexity", said: `add it in the app: Settings > Connectors > Add custom remote connector, URL ${MCP_URL}, Streamable HTTP and OAuth, then Sign in` };
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
  // Said first: Codex signs the person in while `init` runs, in this terminal.
  console.log(dry ? "eonik: what init would do (nothing is changed)\n" : "eonik: connecting your assistants\n");
  const found = [claudeCode(dry), vsCode(dry), cursor(dry), codex(dry), geminiCli(dry), windsurf(dry), zed(), claudeDesktop(), perplexity()]
    .filter((o): o is Outcome => o !== null);
  if (!found.length) {
    console.log(`No assistant found on this computer. In any assistant that adds MCP servers, add ${MCP_URL} and sign in to eonik.`);
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
