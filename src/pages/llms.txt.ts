import type { APIRoute } from 'astro';
import { categories } from '../data/projects';
import { allTags } from '../lib/tags';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const normBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const root = site ? new URL(normBase + '/', site).toString() : normBase + '/';

  const lines: string[] = [];
  lines.push('# Awesome Lattice');
  lines.push('');
  lines.push('> A curated directory of lattice-powered tools, libraries, and resources. Lattice-based systems let independent actors merge state deterministically, without coordination, locks, or central authority.');
  lines.push('');
  lines.push('This is a signposting index: every entry links directly to the source project. Use `llms-full.txt` for the complete flattened listing or `projects.json` for structured data.');
  lines.push('');
  lines.push('## Categories');
  lines.push('');

  for (const category of categories) {
    const path = category.id === categories[0].id ? '' : category.id + '/';
    lines.push(`- [${category.title}](${root}${path}): ${category.description}`);
  }

  lines.push('');
  lines.push('## Tags');
  lines.push('');
  for (const t of allTags()) {
    lines.push(`- [${t.tag}](${root}tags/${t.slug}/) (${t.projects.length})`);
  }

  lines.push('');
  lines.push('## Machine-readable');
  lines.push('');
  lines.push(`- [projects.json](${root}projects.json): all categories and entries as JSON`);
  lines.push(`- [tags.json](${root}tags.json): every tag with project links`);
  lines.push(`- [llms-full.txt](${root}llms-full.txt): every entry in a single markdown file`);
  lines.push(`- [sitemap-index.xml](${root}sitemap-index.xml): sitemap`);
  lines.push('');
  lines.push('Every project page also publishes `.json` and `.md` alternates at the same path (e.g. `projects/core/convex.json`, `projects/core/convex.md`).');
  lines.push('');
  lines.push('## About');
  lines.push('');
  lines.push(`- [About](${root}about): background on lattice technology and this directory`);
  lines.push(`- [GitHub](https://github.com/brittleboye/awesome-lattice): source and contribution guide`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
