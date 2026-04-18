import { categories, projectSlug, type Category, type Project } from '../data/projects';

const ORG_CATEGORIES = new Set(['companies']);
const WEBSITE_CATEGORIES = new Set(['web', 'community']);

function projectType(categoryId: string): string {
  if (ORG_CATEGORIES.has(categoryId)) return 'Organization';
  if (WEBSITE_CATEGORIES.has(categoryId)) return 'WebSite';
  return 'SoftwareApplication';
}

function projectEntity(project: Project, categoryId: string): Record<string, unknown> {
  const url = project.homepage ?? project.repo ?? project.docs;
  const type = projectType(categoryId);
  const entity: Record<string, unknown> = {
    '@type': type,
    name: project.name,
    description: project.description,
  };
  if (url) entity.url = url;
  if (project.repo && type === 'SoftwareApplication') {
    entity.codeRepository = project.repo;
    entity.applicationCategory = 'DeveloperApplication';
  }
  if (project.tags && project.tags.length) {
    entity.keywords = project.tags.join(', ');
  }
  return entity;
}

export function categoryItemList(
  category: Category,
  categoryUrl: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.title,
    description: category.description,
    url: categoryUrl,
    numberOfItems: category.projects.length,
    itemListElement: category.projects.map((project, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: projectEntity(project, category.id),
    })),
  };
}

export interface Crumb {
  name: string;
  url: string;
}

export function breadcrumbList(crumbs: Crumb[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export interface RelatedProject {
  project: Project;
  category: Category;
  score: number;
}

export function relatedProjects(
  project: Project,
  category: Category,
  limit = 4,
): RelatedProject[] {
  const tagSet = new Set(project.tags ?? []);
  const results: RelatedProject[] = [];
  for (const c of categories) {
    for (const p of c.projects) {
      if (p === project && c.id === category.id) continue;
      const sharedTags = (p.tags ?? []).filter((t) => tagSet.has(t)).length;
      const sameCategory = c.id === category.id ? 1 : 0;
      const score = sharedTags * 2 + sameCategory;
      if (score === 0) continue;
      results.push({ project: p, category: c, score });
    }
  }
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.project.name.localeCompare(b.project.name);
  });
  return results.slice(0, limit);
}

export function relatedHref(baseNoTrail: string, category: Category, project: Project): string {
  return `${baseNoTrail}/projects/${category.id}/${projectSlug(project)}/`;
}
