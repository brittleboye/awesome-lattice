import type { APIRoute } from 'astro';
import { allTags, tagSlug } from '../lib/tags';
import { projectSlug } from '../data/projects';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const normBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const root = site ? new URL(normBase + '/', site).toString() : normBase + '/';

  const payload = {
    generated: new Date().toISOString(),
    url: `${root}tags/`,
    tags: allTags().map((t) => ({
      tag: t.tag,
      slug: t.slug,
      count: t.projects.length,
      url: `${root}tags/${t.slug}/`,
      json: `${root}tags/${t.slug}.json`,
      projects: t.projects.map((p) => ({
        name: p.project.name,
        category: p.category.id,
        slug: projectSlug(p.project),
        url: `${root}projects/${p.category.id}/${projectSlug(p.project)}/`,
      })),
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
