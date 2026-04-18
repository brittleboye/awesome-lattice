import type { APIRoute } from 'astro';
import { categories, projectSlug } from '../data/projects';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const normBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const root = site ? new URL(normBase + '/', site).toString() : normBase + '/';

  const lines: string[] = [];
  lines.push('# Awesome Lattice — Full Directory');
  lines.push('');
  lines.push('A curated directory of lattice-powered tools, libraries, and resources. Every entry in this directory, flattened for LLM consumption.');
  lines.push('');
  lines.push(`Source: ${root}`);
  lines.push(`JSON: ${root}projects.json`);
  lines.push('');

  for (const category of categories) {
    const path = category.id === categories[0].id ? '' : category.id + '/';
    lines.push(`## ${category.title}`);
    lines.push('');
    lines.push(category.description);
    lines.push('');
    lines.push(`Page: ${root}${path}`);
    lines.push('');

    for (const project of category.projects) {
      const slug = projectSlug(project);
      lines.push(`### ${project.name}`);
      lines.push('');
      lines.push(project.description);
      lines.push('');
      if (project.longDescription) {
        lines.push(project.longDescription);
        lines.push('');
      }
      const meta: string[] = [];
      if (project.status) meta.push(`Status: ${project.status}`);
      if (project.licensing) meta.push(`Licensing: ${project.licensing}`);
      if (project.license) meta.push(`License: ${project.license}`);
      if (meta.length) {
        lines.push(meta.join(' · '));
        lines.push('');
      }
      const links: string[] = [];
      links.push(`- Detail: ${root}projects/${category.id}/${slug}/`);
      if (project.homepage) links.push(`- Homepage: ${project.homepage}`);
      if (project.repo) links.push(`- Source: ${project.repo}`);
      if (project.docs) links.push(`- Docs: ${project.docs}`);
      if (project.links) {
        for (const l of project.links) links.push(`- ${l.label}: ${l.url}`);
      }
      lines.push(...links);
      lines.push('');
      if (project.tags && project.tags.length) {
        lines.push(`Tags: ${project.tags.join(', ')}`);
        lines.push('');
      }
      if (project.badge) {
        lines.push(`Badge: ${project.badge}`);
        lines.push('');
      }
    }
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
