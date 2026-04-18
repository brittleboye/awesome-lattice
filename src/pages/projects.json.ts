import type { APIRoute } from 'astro';
import { categories, projectSlug } from '../data/projects';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const normBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const root = site ? new URL(normBase + '/', site).toString() : normBase + '/';

  const payload = {
    $schema: 'https://brittleboye.github.io/awesome-lattice/projects.schema.json',
    name: 'Awesome Lattice',
    description: 'A curated directory of lattice-powered tools, libraries, and resources.',
    url: root,
    generated: new Date().toISOString(),
    categories: categories.map((category) => {
      const path = category.id === categories[0].id ? '' : category.id + '/';
      return {
        id: category.id,
        title: category.title,
        description: category.description,
        url: `${root}${path}`,
        projects: category.projects.map((project) => {
          const slug = projectSlug(project);
          return {
            slug,
            name: project.name,
            description: project.description,
            longDescription: project.longDescription ?? null,
            homepage: project.homepage ?? null,
            repo: project.repo ?? null,
            docs: project.docs ?? null,
            links: project.links ?? [],
            tags: project.tags ?? [],
            badge: project.badge ?? null,
            status: project.status ?? null,
            licensing: project.licensing ?? null,
            license: project.license ?? null,
            url: `${root}projects/${category.id}/${slug}/`,
          };
        }),
      };
    }),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
