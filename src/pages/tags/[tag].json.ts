import type { APIRoute, GetStaticPaths } from 'astro';
import { allTags } from '../../lib/tags';
import { projectSlug } from '../../data/projects';

export const getStaticPaths: GetStaticPaths = () => {
  return allTags().map((entry) => ({
    params: { tag: entry.slug },
    props: { entry },
  }));
};

export const GET: APIRoute = ({ props, site }) => {
  const entry = (props as { entry: ReturnType<typeof allTags>[number] }).entry;
  const base = import.meta.env.BASE_URL;
  const normBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const root = site ? new URL(normBase + '/', site).toString() : normBase + '/';

  const payload = {
    generated: new Date().toISOString(),
    tag: entry.tag,
    slug: entry.slug,
    count: entry.projects.length,
    url: `${root}tags/${entry.slug}/`,
    projects: entry.projects.map((p) => ({
      name: p.project.name,
      description: p.project.description,
      category: { id: p.category.id, title: p.category.title },
      slug: projectSlug(p.project),
      url: `${root}projects/${p.category.id}/${projectSlug(p.project)}/`,
      json: `${root}projects/${p.category.id}/${projectSlug(p.project)}.json`,
      markdown: `${root}projects/${p.category.id}/${projectSlug(p.project)}.md`,
      tags: p.project.tags ?? [],
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
