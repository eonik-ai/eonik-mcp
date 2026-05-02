#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.EONIK_API_URL || "https://api.eonik.ai";
const API_KEY = process.env.EONIK_API_KEY;

if (!API_KEY) {
  console.error("EONIK_API_KEY environment variable is required");
  process.exit(1);
}

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

const server = new Server(
  {
    name: "eonik-mcp-server",
    version: "1.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // === ANALYZE ===
      {
        name: "run_budget_audit",
        description: "Analyze the connected Meta Ad Account for budget leaks, burn without signal, and creative decay.",
        inputSchema: {
          type: "object",
          properties: {
            account_id: { type: "string", description: "Meta Ad Account ID (optional if connected)" },
            days: { type: "number", description: "Lookback window in days (default 30)" },
          },
        },
      },
      {
        name: "get_creative_autopsy",
        description: "Get the Creative Command Center report (leaks, winners, and experiment status) to understand why ads are failing or winning.",
        inputSchema: {
          type: "object",
          properties: {
            days: { type: "number", description: "Lookback window in days (default 30)" },
            force_refresh: { type: "boolean", description: "Bypass cache" },
          },
        },
      },

      // === IDEATE ===
      {
        name: "discover_trends",
        description: "Pull real-time cultural trends, trending audio, and formats from social platforms (TikTok, Reels).",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Niche or topic to search for" },
            platform: { type: "string", description: "Platform (e.g. tiktok, instagram)" },
          },
        },
      },
      {
        name: "get_brand_context",
        description: "Get the current user's brand context, audience, and competitor intelligence.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "search_ad_library",
        description: "Search the global Ad Library for competitor ads, hook types, and creative styles. This is read-only.",
        inputSchema: {
          type: "object",
          properties: {
            industry: { type: "string", description: "Filter by industry slug" },
            hook_type: { type: "string", description: "Filter by hook type" },
            creative_style: { type: "string", description: "Filter by creative style" },
            brand_name: { type: "string", description: "Partial brand name search" },
          },
        },
      },
      {
        name: "get_insights_feed",
        description: "Returns a prioritized list of creative insights based on genome performance.",
        inputSchema: {
          type: "object",
          properties: {
            platform: { type: "string", description: "Platform to filter by (default 'meta')" },
            days: { type: "number", description: "Lookback window in days (default 30)" },
          },
        },
      },
      {
        name: "get_experimentation_gaps",
        description: "Get recommendations for what genome combinations to test next.",
        inputSchema: {
          type: "object",
          properties: {
            platform: { type: "string", description: "Platform (default 'meta')" },
          },
        },
      },

      // === PRODUCE ===
      {
        name: "create_ad_creation_run",
        description: "Start a new Orchestration Run to create an ad video.",
        inputSchema: {
          type: "object",
          properties: {
            brand: { type: "string", description: "Brand name" },
            product: { type: "string", description: "Product name" },
            intel_context: { type: "object", description: "Optional context from insights/genome data" },
          },
          required: ["brand"],
        },
      },
      {
        name: "compile_seed_spec",
        description: "Compile a seed specification for an ad creation run based on an approved brief.",
        inputSchema: {
          type: "object",
          properties: {
            run_id: { type: "string", description: "The ID of the orchestration run" },
            target_market: { type: "string", description: "Target market (e.g. 'India')" },
          },
          required: ["run_id"],
        },
      },

      // === DEPLOY ===
      {
        name: "launch_ad_run",
        description: "Launch the created ad asset directly to Meta Ads.",
        inputSchema: {
          type: "object",
          properties: {
            run_id: { type: "string", description: "The ID of the orchestration run" },
            experiment_id: { type: "string", description: "The experiment ID to link" },
            meta_adset_id: { type: "string", description: "The Meta Adset ID to launch into" },
          },
          required: ["run_id", "experiment_id"],
        },
      },
    ],
  };
});

// Handle tools
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    switch (request.params.name) {
      // === ANALYZE ===
      case "run_budget_audit": {
        const response = await apiClient.post("/api/budget-agent/run-audit", null, { params: request.params.arguments });
        return { content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }] };
      }
      case "get_creative_autopsy": {
        const response = await apiClient.get("/api/autopsy/command-center", { params: request.params.arguments });
        return { content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }] };
      }

      // === IDEATE ===
      case "discover_trends": {
        const response = await apiClient.post("/api/trends/discover", request.params.arguments);
        return { content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }] };
      }
      case "get_brand_context": {
        const response = await apiClient.get("/api/brand-context");
        return { content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }] };
      }
      case "search_ad_library": {
        const response = await apiClient.get("/api/library/ads", { params: request.params.arguments });
        return { content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }] };
      }
      case "get_insights_feed": {
        const response = await apiClient.get("/api/insights/feed", { params: request.params.arguments });
        return { content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }] };
      }
      case "get_experimentation_gaps": {
        const response = await apiClient.get("/api/insights/experimentation-gaps", { params: request.params.arguments });
        return { content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }] };
      }

      // === PRODUCE ===
      case "create_ad_creation_run": {
        const response = await apiClient.post("/api/ad-creation/runs", request.params.arguments);
        return { content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }] };
      }
      case "compile_seed_spec": {
        const { run_id, target_market } = request.params.arguments as any;
        const response = await apiClient.post(`/api/ad-creation/runs/${run_id}/compile-seed-spec`, null, {
          params: { target_market }
        });
        return { content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }] };
      }

      // === DEPLOY ===
      case "launch_ad_run": {
        const { run_id, experiment_id, meta_adset_id } = request.params.arguments as any;
        const payload = { experiment_id, meta_adset_id };
        const response = await apiClient.post(`/api/ad-creation/runs/${run_id}/launch`, payload);
        return { content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }] };
      }

      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data ? JSON.stringify(error.response.data) : error.message;
      return {
        content: [{ type: "text", text: `API Error: ${msg}` }],
        isError: true,
      };
    }
    throw error;
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("eonik MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error starting server:", error);
  process.exit(1);
});
