import type { APIRoute } from 'astro';
import { categories } from '../data/projects';

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
      lines.push(`### ${project.name}`);
      lines.push('');
      lines.push(project.description);
      lines.push('');
      const links: string[] = [];
      if (project.homepage) links.push(`- Homepage: ${project.homepage}`);
      if (project.repo) links.push(`- Source: ${project.repo}`);
      if (project.docs) links.push(`- Docs: ${project.docs}`);
      if (links.length) {
        lines.push(...links);
        lines.push('');
      }
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
