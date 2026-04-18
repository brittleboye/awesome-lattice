# Awesome Lattice

A curated directory of tools, libraries, and resources built on lattice technology.

Live site: https://brittleboye.github.io/awesome-lattice/

Lattice-based systems let independent actors merge state deterministically, without coordination or central authority. This site is a signposting index of the platforms, SDKs, MCP servers, embedded engines, apps, and organisations building with them — every entry links straight to the source.

## Structure

- `src/data/projects.ts` — category and project definitions (single source of truth for entries)
- `src/pages/index.astro` — root page, renders the first category
- `src/pages/[category].astro` — dynamic route for remaining categories
- `src/pages/about.astro` — about page
- `src/layouts/BaseLayout.astro` — page shell, nav, SEO meta, JSON-LD
- `src/components/Sidebar.astro` — category navigation
- `src/components/ProjectCard.astro` — project card
- `src/styles/global.css` — theme and layout
- `public/` — static assets (favicon, og-image, robots.txt)
- `.github/workflows/deploy.yml` — GitHub Pages deploy via Actions

## Contributing

Missing a project? Open an issue or PR:

- https://github.com/brittleboye/awesome-lattice/issues

To add an entry, edit `src/data/projects.ts` — find the right category and append a project object with `name`, `description`, and the relevant `repo`/`homepage`/`docs` links.

## Development

Requires Node.js 22+ and pnpm.

| Command         | Action                                         |
| :-------------- | :--------------------------------------------- |
| `pnpm install`  | Install dependencies                           |
| `pnpm dev`      | Start local dev server (base path `/`)         |
| `pnpm build`    | Build static site to `./dist/`                 |
| `pnpm preview`  | Preview the production build locally           |

The site deploys automatically to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`. Production builds use base path `/awesome-lattice`; dev uses `/` for local parity.

## Licence

Content licensed for reuse with attribution. Third-party project names, logos, and marks belong to their respective owners.
