#!/usr/bin/env node
/**
 * eonik MCP (stdio) — thin authenticated bridge to the ONE tool layer.
 *
 * Authority: eonik-backend `command_tools.py` via
 *   GET  /api/tools/manifest
 *   POST /api/tools/dispatch
 *
 * This package must not invent tools. ListTools is the live catalog.
 * CallTool is dispatch. Banned budget/launch/orchestration routes do not exist here.
 *
 * Two MCP surfaces exist; this is the CLOUD brand-brain:
 *   A. this process → api.eonik.ai (Claude Desktop / Cursor / Codex)
 *   B. Mac app local MCP (127.0.0.1) — editor timeline + the same brand-brain proxied
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = (process.env.EONIK_API_URL || "https://api.eonik.ai").replace(/\/$/, "");
const API_KEY = process.env.EONIK_API_KEY;
const BRAND_ID = process.env.EONIK_BRAND_ID;

if (!API_KEY) {
  console.error("EONIK_API_KEY is required (workspace API key or session JWT).");
  process.exit(1);
}

/**
 * Tools the backend registry implements that an EXTERNAL agent must not be offered.
 *
 * `record_validation_decision` writes at `revealed` (marketer's own UI action). Advertising
 * it to an agent would let the model speak in the marketer's voice — BrandBrainTools.swift
 * keeps it off the in-editor agent for the same reason.
 *
 * `save_creative_read` is the Mac app's on-device contribution loop (scenes from the
 * device analyzer). A remote agent has no on-device read; offering it would let it inject
 * corpus facts.
 */
const AGENT_EXCLUDED = new Set([
  "record_validation_decision",
  "save_creative_read",
]);

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    ...(BRAND_ID ? { "X-Brand-Id": BRAND_ID } : {}),
  },
});

type ManifestTool = {
  name: string;
  description?: string;
  parameters?: Record<string, unknown>;
};

async function loadManifest(): Promise<ManifestTool[]> {
  const response = await apiClient.get("/api/tools/manifest");
  const tools = response.data?.tools;
  if (!Array.isArray(tools)) {
    throw new Error("GET /api/tools/manifest did not return {tools: [...]}");
  }
  return tools.filter(
    (t: ManifestTool) => typeof t?.name === "string" && !AGENT_EXCLUDED.has(t.name)
  );
}

function axiosErrorText(error: AxiosError): string {
  const data = error.response?.data;
  if (data == null) return error.message;
  return typeof data === "string" ? data : JSON.stringify(data);
}

const server = new Server(
  {
    name: "eonik",
    version: "2.0.0",
  },
  {
    capabilities: { tools: {} },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  try {
    const tools = await loadManifest();
    return {
      tools: tools.map((t) => ({
        name: t.name,
        description: t.description || "",
        inputSchema: (t.parameters || {
          type: "object",
          properties: {},
        }) as Record<string, unknown>,
      })),
    };
  } catch (error) {
    const msg = axios.isAxiosError(error) ? axiosErrorText(error) : String(error);
    throw new McpError(
      ErrorCode.InternalError,
      `Could not load eonik tool catalog from ${API_URL}/api/tools/manifest: ${msg}`
    );
  }
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const name = request.params.name;
  if (AGENT_EXCLUDED.has(name)) {
    throw new McpError(
      ErrorCode.InvalidParams,
      `${name} is not offered on the remote MCP bridge (Mac-app / UI-owned).`
    );
  }
  try {
    const response = await apiClient.post("/api/tools/dispatch", {
      tool: name,
      args: request.params.arguments ?? {},
    });
    const payload = response.data?.result ?? response.data;
    return {
      content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }],
      isError: Boolean(payload && typeof payload === "object" && "error" in payload),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        content: [{ type: "text" as const, text: `API Error: ${axiosErrorText(error)}` }],
        isError: true,
      };
    }
    throw error;
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`eonik MCP 2.0.0 → ${API_URL} (stdio)`);
}

main().catch((error) => {
  console.error("Fatal error starting eonik MCP:", error);
  process.exit(1);
});
