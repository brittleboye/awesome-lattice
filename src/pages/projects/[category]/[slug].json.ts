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

export const GET: APIRoute = ({ props, site }) => {
  const { category, project } = props as typeof props & {
    category: { id: string; title: string };
    project: { name: string; description: string; mcp?: { endpoint: string } };
  };
  const base = import.meta.env.BASE_URL;
  const normBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const root = site ? new URL(normBase + '/', site).toString() : normBase + '/';
  const slug = projectSlug(project as never);

  const mcpEntry = project.mcp
    ? (mcpSnapshot as { endpoints: Record<string, unknown> }).endpoints[project.mcp.endpoint] ?? null
    : null;

  const p = project as Record<string, unknown>;
  const payload = {
    $schema: 'https://brittleboye.github.io/awesome-lattice/projects.schema.json',
    category: { id: category.id, title: category.title, url: `${root}${category.id === categories[0].id ? '' : category.id + '/'}` },
    slug,
    name: project.name,
    description: project.description,
    longDescription: p.longDescription ?? null,
    homepage: p.homepage ?? null,
    repo: p.repo ?? null,
    docs: p.docs ?? null,
    links: p.links ?? [],
    tags: p.tags ?? [],
    badge: p.badge ?? null,
    status: p.status ?? null,
    licensing: p.licensing ?? null,
    license: p.license ?? null,
    mcp: project.mcp ? { ...project.mcp, snapshot: mcpEntry } : null,
    url: `${root}projects/${category.id}/${slug}/`,
    markdown: `${root}projects/${category.id}/${slug}.md`,
    generated: new Date().toISOString(),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
