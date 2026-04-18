import type { Category, Project } from '../data/projects';

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
