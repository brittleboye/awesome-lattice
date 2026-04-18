import type { APIRoute, GetStaticPaths } from 'astro';
import { categories, projectSlug } from '../../../data/projects';
import mcpSnapshot from '../../../data/mcp-snapshot.json';

export const getStaticPaths: GetStaticPaths = () => {
  const paths: Array<{ params: { category: string; slug: string }; props: Record<string, unknown> }> = [];
  for (const category of categories) {
    for (const project of category.projects) {
      paths.push({
        params: { category: category.id, slug: projectSlug(project) },
        props: { category, project },
      });
    }
  }
  return paths;
};

function escapeMd(s: string): string {
  return s.replace(/\r/g, '');
}

export const GET: APIRoute = ({ props, site }) => {
  const { category, project } = props as typeof props & {
    category: { id: string; title: string };
    project: Record<string, unknown> & { name: string; description: string; mcp?: { endpoint: string; transport?: string } };
  };
  const base = import.meta.env.BASE_URL;
  const normBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const root = site ? new URL(normBase + '/', site).toString() : normBase + '/';
  const slug = projectSlug(project as never);
  const pageUrl = `${root}projects/${category.id}/${slug}/`;

  const lines: string[] = [];
  lines.push(`# ${project.name}`);
  lines.push('');
  lines.push(`> ${project.description}`);
  lines.push('');
  lines.push(`**Category:** ${category.title}  `);
  if (project.status) lines.push(`**Status:** ${project.status}  `);
  if (project.licensing) lines.push(`**Licensing:** ${project.licensing}  `);
  if (project.license) lines.push(`**License:** ${project.license}  `);
  if (project.badge) lines.push(`**Badge:** ${project.badge}  `);
  lines.push(`**Page:** ${pageUrl}`);
  lines.push('');

  if (project.longDescription) {
    lines.push('## Description');
    lines.push('');
    lines.push(escapeMd(project.longDescription as string));
    lines.push('');
  }

  const links: Array<{ label: string; url: string }> = [];
  if (project.homepage) links.push({ label: 'Homepage', url: project.homepage as string });
  if (project.repo) links.push({ label: 'Source', url: project.repo as string });
  if (project.docs) links.push({ label: 'Documentation', url: project.docs as string });
  if (Array.isArray(project.links)) {
    for (const l of project.links as Array<{ label: string; url: string }>) links.push(l);
  }
  if (links.length) {
    lines.push('## Links');
    lines.push('');
    for (const l of links) lines.push(`- **${l.label}:** ${l.url}`);
    lines.push('');
  }

  if (Array.isArray(project.tags) && (project.tags as string[]).length) {
    lines.push('## Tags');
    lines.push('');
    lines.push((project.tags as string[]).map((t) => `\`${t}\``).join(' '));
    lines.push('');
  }

  if (project.mcp) {
    const mcp = project.mcp;
    lines.push('## MCP Endpoint');
    lines.push('');
    lines.push(`- **Endpoint:** ${mcp.endpoint}`);
    lines.push(`- **Transport:** ${mcp.transport ?? 'streamable-http'}`);
    const snap = (mcpSnapshot as { endpoints: Record<string, Record<string, unknown>> }).endpoints[mcp.endpoint];
    if (snap) {
      lines.push(`- **Last checked:** ${snap.lastCheckedAt}`);
      lines.push(`- **Status:** ${snap.ok ? 'ok' : 'failed'}`);
      if (snap.serverInfo) {
        const si = snap.serverInfo as Record<string, unknown>;
        lines.push(`- **Server:** ${si.title ?? si.name ?? ''}${si.version ? ' v' + si.version : ''}`);
      }
      if (Array.isArray(snap.tools) && (snap.tools as unknown[]).length) {
        lines.push('');
        lines.push(`### Tools (${(snap.tools as unknown[]).length})`);
        lines.push('');
        for (const t of snap.tools as Array<Record<string, unknown>>) {
          const desc = typeof t.description === 'string' ? (t.description as string).split('\n')[0] : '';
          lines.push(`- \`${t.name}\`${t.title ? ` — ${t.title}` : ''}${desc ? `: ${desc}` : ''}`);
        }
      }
    }
    lines.push('');
  }

  lines.push(`_Generated ${new Date().toISOString()} by Awesome Lattice._`);

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
