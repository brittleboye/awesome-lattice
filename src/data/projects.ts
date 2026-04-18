export interface Project {
  name: string;
  description: string;
  homepage?: string;
  repo?: string;
  docs?: string;
  tags?: string[];
  badge?: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  projects: Project[];
}

export const categories: Category[] = [
  {
    id: 'core',
    title: 'Core Platforms',
    description: 'The lattice networks and execution engines.',
    projects: [
      {
        name: 'Convex',
        description:
          'Decentralised lattice network and execution engine. Stateful Internet powered by Convergent Proof of Stake.',
        homepage: 'https://convex.world',
        repo: 'https://github.com/Convex-Dev/convex',
        docs: 'https://docs.convex.world',
        tags: ['java', 'lattice', 'consensus'],
        badge: 'Platform',
      },
      {
        name: 'Covia',
        description:
          'Federated AI orchestration grid built on Convex lattice. Collaboration across clouds and jurisdictions with built-in governance.',
        homepage: 'https://covia.ai',
        repo: 'https://github.com/covia-ai/covia',
        docs: 'https://docs.covia.ai',
        tags: ['java', 'agents', 'orchestration'],
        badge: 'Platform',
      },
    ],
  },
  {
    id: 'sdks',
    title: 'SDKs & Client Libraries',
    description: 'Language bindings for talking to Convex and Covia.',
    projects: [
      {
        name: 'convex.ts',
        description: 'TypeScript client library for Convex. Browser and Node compatible.',
        repo: 'https://github.com/Convex-Dev/convex.ts',
        tags: ['typescript', 'client'],
      },
      {
        name: 'convex-api-py',
        description: 'Python API client for the Convex network.',
        repo: 'https://github.com/Convex-Dev/convex-api-py',
        tags: ['python', 'client'],
      },
      {
        name: 'convex.cljc',
        description: 'Clojure / ClojureScript client for Convex.',
        repo: 'https://github.com/Convex-Dev/convex.cljc',
        tags: ['clojure', 'client'],
      },
      {
        name: 'covia-sdk-py',
        description: 'Covia Python SDK — build and run agents, orchestrations, and operations.',
        repo: 'https://github.com/covia-ai/covia-sdk-py',
        tags: ['python', 'sdk', 'agents'],
      },
      {
        name: 'covia-api-py',
        description: 'Low-level Python client for the Covia HTTP API.',
        repo: 'https://github.com/covia-ai/covia-api-py',
        tags: ['python', 'client'],
      },
    ],
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    description: 'Testnets, databases, and tooling built on the lattice.',
    projects: [
      {
        name: 'Convex DB',
        description:
          'Lattice-backed SQL database with JDBC and PostgreSQL wire compatibility. Part of the Convex monorepo.',
        repo: 'https://github.com/Convex-Dev/convex',
        docs: 'https://docs.convex.world',
        tags: ['sql', 'jdbc', 'database'],
      },
      {
        name: 'convex-testnet',
        description: 'Public testnet tooling for Convex — accounts, keys, signing, and transactions.',
        repo: 'https://github.com/Convex-Dev/convex-testnet',
        tags: ['testnet', 'cli'],
      },
      {
        name: 'convex-snap',
        description: 'Snap packaging for running Convex peers and CLI tooling.',
        repo: 'https://github.com/Convex-Dev/convex-snap',
        tags: ['packaging', 'linux'],
      },
      {
        name: 'wallet',
        description: 'Convex wallet for managing keys, accounts, and CVM balances.',
        repo: 'https://github.com/Convex-Dev/wallet',
        tags: ['wallet', 'keys'],
      },
    ],
  },
  {
    id: 'apps',
    title: 'Apps & Demos',
    description: 'Applications, demos, and games built on the lattice.',
    projects: [
      {
        name: 'convex.world',
        description: 'Main Convex website and interactive ecosystem entry point.',
        homepage: 'https://convex.world',
        repo: 'https://github.com/Convex-Dev/convex.world',
        tags: ['nextjs', 'website'],
      },
      {
        name: 'convex-web',
        description: 'Web application for exploring the Convex network, peers, and accounts.',
        repo: 'https://github.com/Convex-Dev/convex-web',
        tags: ['explorer', 'web'],
      },
      {
        name: 'AlphaCards',
        description: 'Trading card game on Convex — native digital assets with lattice-native ownership.',
        repo: 'https://github.com/Convex-Dev/addictivegame',
        tags: ['game', 'assets'],
      },
      {
        name: 'covia-demo',
        description: 'Covia demonstration application showcasing federated agent orchestration.',
        repo: 'https://github.com/covia-ai/covia-demo',
        tags: ['demo', 'agents'],
      },
      {
        name: 'Covia Space',
        description: 'Covia Space application — hosted workspace for agents and orchestrations.',
        repo: 'https://github.com/covia-ai/covia-space',
        tags: ['agents', 'workspace'],
      },
    ],
  },
  {
    id: 'docs',
    title: 'Documentation & Specs',
    description: 'Architecture docs, specifications, and whitepapers.',
    projects: [
      {
        name: 'Convex Docs & CADs',
        description:
          'Convex architecture documentation, Convex Architecture Documents (specs), and whitepaper. Docusaurus site.',
        homepage: 'https://docs.convex.world',
        repo: 'https://github.com/Convex-Dev/design',
        tags: ['docs', 'specs'],
      },
      {
        name: 'Covia Docs',
        description: 'User and operator documentation for Covia.',
        homepage: 'https://docs.covia.ai',
        repo: 'https://github.com/covia-ai/covia-docs',
        tags: ['docs'],
      },
    ],
  },
];

export const totalProjectCount = categories.reduce((sum, c) => sum + c.projects.length, 0);
