#!/usr/bin/env node
// Probe MCP endpoints declared in src/data/projects.ts for their tools/list.
// Writes src/data/mcp-snapshot.json. Fail-soft: on any probe failure,
// keeps the previous snapshot entry (if any) and records the error.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const projectsPath = resolve(root, 'src/data/projects.ts');
const snapshotPath = resolve(root, 'src/data/mcp-snapshot.json');
const TIMEOUT_MS = 30_000;

async function loadPrevious() {
  try {
    return JSON.parse(await readFile(snapshotPath, 'utf-8'));
  } catch {
    return { generatedAt: null, endpoints: {} };
  }
}

function extractEndpoints(source) {
  // Pull out { endpoint, transport? } objects attached as `mcp:` in projects.ts.
  // Simple heuristic: find "mcp: { endpoint: '...', transport?: '...' }" blocks.
  const results = [];
  const re = /mcp:\s*\{\s*endpoint:\s*['"]([^'"]+)['"](?:,\s*transport:\s*['"]([^'"]+)['"])?/g;
  let m;
  while ((m = re.exec(source))) {
    results.push({ endpoint: m[1], transport: m[2] ?? 'streamable-http' });
  }
  return results;
}

async function postJson(url, body, { timeout = TIMEOUT_MS } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream',
      },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    const text = await res.text();
    const trimmed = text.trim();
    // Handle SSE framing: an SSE response for a single message looks like
    //   event: message\n data: {...}\n\n
    // Pick the first `data:` line and JSON.parse it.
    let payload;
    if (trimmed.startsWith('event:') || trimmed.startsWith('data:')) {
      const dataLine = trimmed.split('\n').find((l) => l.startsWith('data:'));
      if (!dataLine) throw new Error('SSE response had no data line');
      payload = JSON.parse(dataLine.slice(5).trim());
    } else {
      payload = JSON.parse(trimmed);
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(payload).slice(0, 200)}`);
    return payload;
  } finally {
    clearTimeout(t);
  }
}

async function probe(endpoint) {
  // Initialize (required by most MCP servers before tools/list).
  const init = await postJson(endpoint, {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2025-06-18',
      capabilities: {},
      clientInfo: { name: 'awesome-lattice-probe', version: '1' },
    },
  });
  const serverInfo = init?.result?.serverInfo ?? null;
  const tools = await postJson(endpoint, {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/list',
  });
  const toolList = tools?.result?.tools ?? [];
  return {
    serverInfo,
    tools: toolList.map((t) => ({
      name: t.name,
      title: t.title ?? null,
      description: t.description ?? null,
    })),
  };
}

async function main() {
  const source = await readFile(projectsPath, 'utf-8');
  const endpoints = extractEndpoints(source);
  if (endpoints.length === 0) {
    console.log('[probe-mcp] no mcp endpoints declared — nothing to probe');
    return;
  }
  const previous = await loadPrevious();
  const endpointsOut = {};
  for (const { endpoint, transport } of endpoints) {
    process.stdout.write(`[probe-mcp] ${endpoint} ... `);
    try {
      const { serverInfo, tools } = await probe(endpoint);
      endpointsOut[endpoint] = {
        transport,
        lastCheckedAt: new Date().toISOString(),
        ok: true,
        serverInfo,
        toolCount: tools.length,
        tools,
      };
      console.log(`ok (${tools.length} tools)`);
    } catch (err) {
      const prev = previous.endpoints?.[endpoint];
      endpointsOut[endpoint] = {
        transport,
        lastCheckedAt: new Date().toISOString(),
        ok: false,
        error: String(err?.message ?? err),
        // Carry forward previous good snapshot, if any.
        ...(prev && prev.ok
          ? { lastOkAt: prev.lastCheckedAt, serverInfo: prev.serverInfo, toolCount: prev.toolCount, tools: prev.tools }
          : {}),
      };
      console.log(`FAIL (${String(err?.message ?? err)})`);
    }
  }
  const out = {
    generatedAt: new Date().toISOString(),
    endpoints: endpointsOut,
  };
  await writeFile(snapshotPath, JSON.stringify(out, null, 2) + '\n', 'utf-8');
  console.log(`[probe-mcp] wrote ${snapshotPath}`);
}

main().catch((err) => {
  console.error('[probe-mcp] fatal', err);
  process.exit(1);
});
