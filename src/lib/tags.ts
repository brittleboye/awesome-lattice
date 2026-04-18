import { categories, projectSlug, slugify, type Category, type Project } from '../data/projects';

export interface TagEntry {
  tag: string;
  slug: string;
  projects: Array<{ project: Project; category: Category }>;
}

export function tagSlug(tag: string): string {
  return slugify(tag);
}

export function allTags(): TagEntry[] {
  const map = new Map<string, TagEntry>();
  for (const category of categories) {
    for (const project of category.projects) {
      if (!project.tags) continue;
      for (const tag of project.tags) {
        const slug = tagSlug(tag);
        let entry = map.get(slug);
        if (!entry) {
          entry = { tag, slug, projects: [] };
          map.set(slug, entry);
        }
        entry.projects.push({ project, category });
      }
    }
  }
  return [...map.values()].sort((a, b) => {
    if (b.projects.length !== a.projects.length) return b.projects.length - a.projects.length;
    return a.tag.localeCompare(b.tag);
  });
}

export function tagHref(baseNoTrail: string, tag: string): string {
  return `${baseNoTrail}/tags/${tagSlug(tag)}/`;
}

export function projectHref(baseNoTrail: string, categoryId: string, project: Project): string {
  return `${baseNoTrail}/projects/${categoryId}/${projectSlug(project)}/`;
}
