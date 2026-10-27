#!/usr/bin/env node
/**
 * eonik MCP (stdio): a local bridge to eonik's ONE external server, https://api.eonik.ai/mcp.
 *
 * For hosts that run MCP servers as local processes (Claude Desktop's config file, Cursor, Codex,
 * older VS Code setups). It forwards everything to the remote server as it is: the tools (eonik's
 * job tools and research reads, exactly the curated surface every other host is served), the
 * panel resource, the prompts, and the remote's questions to the person (forms). It invents
 * nothing, filters nothing and adds no tool of its own.
 *
 * ⚠️ IT USED TO PROXY `/api/tools/manifest`: the in-editor agent's whole tool layer, 60 tools,
 * steering descriptions and all. That is the surface OpenAI rejected on `/mcp`; it stayed live
 * here after `/mcp` was cut down, because this package read a different door (found 2026-10-08).
 * One external surface now, and this is a pipe to it.
 *
 * Auth is an eonik API key (`EONIK_API_KEY`). A key has no connect step, so it names its brand
 * on every request (`EONIK_BRAND_ID`); a person with more than one brand must set it.
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ElicitRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const API_URL = (process.env.EONIK_API_URL || "https://api.eonik.ai").replace(/\/$/, "");
const API_KEY = process.env.EONIK_API_KEY;
const BRAND_ID = process.env.EONIK_BRAND_ID;
const VERSION = "4.0.0";
/**
 * How long one call may run through the bridge. A Desk job is followed within its call (each step
 * reported as progress, the person's forms asked mid-call) for up to 200 s; the SDK's 60 s default
 * cut such a call off half way. Hosts end a call at 240 s, so the bridge waits as long as they do,
 * and every progress report restarts the clock.
 */
const CALL_TIMEOUT_MS = 240_000;

if (!API_KEY) {
  console.error("EONIK_API_KEY is required: create one in eonik, Settings, API keys.");
  process.exit(1);
}

const headers: Record<string, string> = { "X-API-Key": API_KEY };
if (BRAND_ID) headers["X-Brand-Id"] = BRAND_ID;

// Created once the host has introduced itself, so it declares what THAT host can do: forms, and
// panels. The server lists its decision tools only to a client that declared panels, so a bridge
// that spoke for itself would hide them from a host that renders them (or, worse, show them to
// one that does not).
let remote: Client;

const local = new Server(
  { name: "eonik", version: VERSION },
  { capabilities: { tools: {}, resources: {}, prompts: {} } },
);

// Requests from the host, forwarded unchanged, once the remote connection (made with the host's
// own capabilities) is up.
const via = async () => (await connected(), remote);
local.setRequestHandler(ListToolsRequestSchema, async (r) => (await via()).listTools(r.params));
local.setRequestHandler(CallToolRequestSchema, async (r, extra) => {
  // The host's own progress token, carried through: the remote's progress reaches the host under it.
  const { progressToken, ...meta } = r.params._meta ?? {};
  const params = Object.keys(meta).length ? { ...r.params, _meta: meta } : { ...r.params, _meta: undefined };
  return (await via()).callTool(params, undefined, {
    timeout: CALL_TIMEOUT_MS,
    resetTimeoutOnProgress: true,
    signal: extra.signal,
    onprogress: progressToken === undefined ? undefined : (p) =>
      extra.sendNotification({ method: "notifications/progress", params: { ...p, progressToken } }),
  });
});
local.setRequestHandler(ListResourcesRequestSchema,
  async (r) => (await via()).listResources(r.params));
local.setRequestHandler(ListResourceTemplatesRequestSchema,
  async (r) => (await via()).listResourceTemplates(r.params));
local.setRequestHandler(ReadResourceRequestSchema,
  async (r) => (await via()).readResource(r.params));
local.setRequestHandler(ListPromptsRequestSchema, async (r) => (await via()).listPrompts(r.params));
local.setRequestHandler(GetPromptRequestSchema, async (r) => (await via()).getPrompt(r.params));

// The remote's questions to the PERSON (which sizes, which answer) are put to them by the host
// (`connectRemote`). A host without forms declines, and eonik then says the choice in plain words.

async function connectRemote() {
  const declared = (local.getClientCapabilities() ?? {}) as Record<string, unknown>;
  const capabilities: Record<string, unknown> = {};
  if (declared.elicitation) capabilities.elicitation = declared.elicitation;
  if (declared.extensions) capabilities.extensions = declared.extensions;
  if (declared.experimental) capabilities.experimental = declared.experimental;
  // The host's own name, so eonik records which assistant asked (Claude, Cursor, Codex).
  const host = local.getClientVersion()?.name ?? "eonik-mcp-bridge";
  remote = new Client({ name: host, version: VERSION }, { capabilities: capabilities as never });
  // Only a host that has forms is told the remote's questions; the SDK refuses the handler
  // otherwise, which is right: the server then says the choice in plain words.
  if (capabilities.elicitation) {
    // A person reading eonik's review takes as long as they take: the form waits as long as a call may.
    remote.setRequestHandler(ElicitRequestSchema,
      (req) => local.elicitInput(req.params, { timeout: CALL_TIMEOUT_MS }));
  }
  await remote.connect(new StreamableHTTPClientTransport(new URL(`${API_URL}/mcp`),
    { requestInit: { headers } }));
}

let ready: Promise<void> | undefined;
const connected = () => (ready ??= connectRemote());

async function main() {
  local.oninitialized = () => {
    connected().catch((e) => console.error(`eonik MCP: ${e?.message ?? e}`));
  };
  await local.connect(new StdioServerTransport());
  console.error(`eonik MCP ${VERSION}: bridging stdio to ${API_URL}/mcp`);
}

main().catch((error) => {
  console.error(`eonik MCP could not reach ${API_URL}/mcp: ${error?.message ?? error}`);
  process.exit(1);
});
