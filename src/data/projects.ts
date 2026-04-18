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
    id: 'engines',
    title: 'Embedded Engines',
    description: 'Specialised engines that run on the lattice — filesystems, databases, social graphs, and more.',
    projects: [
      {
        name: 'Convex DB',
        description:
          'Lattice-backed SQL database with JDBC and PostgreSQL wire compatibility — full relational tooling over convergent state.',
        repo: 'https://github.com/Convex-Dev/convex',
        docs: 'https://docs.convex.world',
        tags: ['sql', 'jdbc', 'database'],
      },
      {
        name: 'DLFS',
        description:
          'Decentralised Lattice File System — a content-addressed, CRDT-mergeable filesystem with WebDAV and Java NIO compatibility. Mount it anywhere.',
        homepage: 'https://convex.world/dlfs',
        repo: 'https://github.com/Convex-Dev/convex',
        tags: ['filesystem', 'crdt', 'webdav'],
      },
      {
        name: 'Convex Social',
        description:
          'Peer-to-peer social network primitives on the lattice. Users own cryptographically signed feeds; nodes selectively replicate based on follow relationships.',
        repo: 'https://github.com/Convex-Dev/convex',
        tags: ['social', 'p2p', 'identity'],
      },
      {
        name: 'KV Database',
        description:
          'Named KV database on the lattice with per-owner signed replicas. Rich data types — counters, lists, sets, sorted sets, hashes — Redis-style, globally mergeable.',
        repo: 'https://github.com/Convex-Dev/convex',
        tags: ['kv', 'database', 'signed'],
      },
      {
        name: 'LatticeMQ',
        description:
          'Kafka-style distributed message queue on the lattice. Two-level hierarchy of topics and partitions, each an append-only log with lattice merge semantics.',
        repo: 'https://github.com/Convex-Dev/convex',
        tags: ['queue', 'pubsub', 'messaging'],
      },
      {
        name: 'Embedded Peer',
        description:
          'Full consensus peer you can embed directly in a JVM — participate in the Convex network from your own application process.',
        repo: 'https://github.com/Convex-Dev/convex',
        tags: ['peer', 'consensus', 'embedded'],
      },
      {
        name: 'NodeServer',
        description:
          'Lightweight networked lattice sync server. Speaks the binary protocol to exchange and merge lattice values without running full peer consensus.',
        repo: 'https://github.com/Convex-Dev/convex',
        tags: ['node', 'sync', 'p2p'],
      },
    ],
  },
  {
    id: 'sdks',
    title: 'SDKs & Client Libraries',
    description: 'Language bindings and client libraries for lattice platforms.',
    projects: [
      {
        name: 'convex-core',
        description:
          'Java library for building with core lattice primitives — CAD3 data structures, immutable cells, lattice types, and the CVM.',
        repo: 'https://github.com/Convex-Dev/convex',
        tags: ['java', 'core', 'cad3'],
      },
      {
        name: 'convex-java',
        description: 'Java / JVM client API for the Convex peer network — transactions, queries, and state access.',
        repo: 'https://github.com/Convex-Dev/convex-java',
        tags: ['java', 'client'],
      },
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
    id: 'mcp',
    title: 'MCP Servers',
    description: 'Model Context Protocol servers that expose lattice platforms to AI agents and MCP-compatible clients.',
    projects: [
      {
        name: 'Convex Testnet MCP',
        description:
          'Hosted Convex testnet with a ready-to-use MCP endpoint — plug any MCP-capable agent straight into a live lattice network.',
        repo: 'https://github.com/Convex-Dev/spaces-testnet',
        tags: ['mcp', 'convex', 'testnet'],
      },
      {
        name: 'Covia Venue MCP',
        description:
          'MCP server built into the Covia venue. Exposes agents, assets, DLFS, Convex queries, vaults, and grid execution to AI clients.',
        repo: 'https://github.com/covia-ai/covia',
        docs: 'https://docs.covia.ai',
        tags: ['mcp', 'covia', 'agents'],
      },
      {
        name: 'Covia Space',
        description:
          'Hosted Covia grid venue on Hugging Face Spaces — MCP-ready out of the box for experimenting with federated agent orchestration.',
        repo: 'https://github.com/covia-ai/covia-space',
        tags: ['mcp', 'covia', 'hosted'],
      },
      {
        name: 'Convex Plugin for Claude',
        description:
          'Claude Code plugin that ships Convex MCP configuration, agents, and slash commands for working against Convex networks.',
        repo: 'https://github.com/Convex-Dev/convex-plugin',
        tags: ['mcp', 'convex', 'claude'],
      },
    ],
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    description: 'Testnets, databases, and tooling built on the lattice.',
    projects: [
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
        name: 'Convex Sandbox',
        description:
          'Live in-browser REPL for Convex Lisp — explore the CVM, submit transactions, and experiment against a real network without installing anything.',
        homepage: 'https://convex.world/sandbox',
        tags: ['repl', 'lisp', 'interactive'],
        badge: 'Demo',
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
        name: 'Block Game',
        description:
          'The first 3D game world run entirely on a public decentralised network — a persistent voxel universe with on-chain items, land, and NFTs, scripted in Convex Lisp.',
        repo: 'https://github.com/mikera/blockgame',
        tags: ['game', '3d', 'nft'],
      },
      {
        name: 'covia-demo',
        description: 'Federated agent orchestration in action — a live demo of multi-agent workflows across organisational boundaries.',
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
    id: 'companies',
    title: 'Companies & Organisations',
    description: 'Organisations building on or using lattice technology.',
    projects: [
      {
        name: 'Covia',
        description:
          'Building the universal grid for AI — federated agent ecosystems across organisational boundaries.',
        homepage: 'https://covia.ai',
        tags: ['ai', 'infrastructure'],
        badge: 'AI',
      },
      {
        name: 'Paisley',
        description:
          'Membership-based cooperative providing financial and community support to independent workers and creative professionals.',
        homepage: 'https://paisley.io',
        tags: ['cooperative', 'creator-economy'],
        badge: 'Cooperative',
      },
      {
        name: 'Lumoza',
        description:
          'Transforming the music industry with tools to help artists register and manage their copyrights on lattice infrastructure.',
        homepage: 'https://lumoza.io',
        tags: ['music', 'ip'],
        badge: 'Music',
      },
      {
        name: 'ReMeLife',
        description:
          'AI-Web3 Care-2-Earn community ecosystem building ReMeGrid — a decentralised rewards-based care community.',
        homepage: 'https://remelife.com',
        tags: ['healthcare', 'community'],
        badge: 'Health',
      },
      {
        name: 'European Union — NGI',
        description:
          'Next Generation Internet initiative, with work on scalable distributed ledger technology and token interoperability via Tokengine.',
        homepage: 'https://docs.convex.world/docs/products/tokengine',
        tags: ['government', 'ngi'],
        badge: 'Government',
      },
    ],
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Where the ecosystem hangs out — chat, code, and social.',
    projects: [
      {
        name: 'Convex Discord',
        description: 'Chat with the Convex core team and ecosystem. Support, discussion, announcements, and technical deep-dives.',
        homepage: 'https://discord.com/invite/xfYGq4CT7v',
        tags: ['discord', 'chat'],
      },
      {
        name: 'Covia Discord',
        description: 'Chat with the Covia team and agent-builders. Discussion of federated orchestration, venues, and integrations.',
        homepage: 'https://discord.gg/fywdrKd8QT',
        tags: ['discord', 'chat'],
      },
      {
        name: 'Convex on GitHub',
        description: 'The Convex-Dev GitHub organisation — core platform, client libraries, tooling, and ecosystem projects.',
        homepage: 'https://github.com/Convex-Dev',
        tags: ['github', 'source'],
      },
      {
        name: 'Covia on GitHub',
        description: 'The covia-ai GitHub organisation — the main Covia grid, SDKs, docs, and hosted demos.',
        homepage: 'https://github.com/covia-ai',
        tags: ['github', 'source'],
      },
      {
        name: 'Convex on Hugging Face',
        description: 'Hosted Convex testnet on Hugging Face Spaces — run a live lattice network in one click, MCP endpoint included.',
        homepage: 'https://huggingface.co/spaces/Convex-Dev/spaces-testnet',
        tags: ['huggingface', 'hosted'],
      },
      {
        name: 'Covia on Hugging Face',
        description: 'Hosted Covia grid venue on Hugging Face Spaces — experiment with federated agent orchestration without local setup.',
        homepage: 'https://huggingface.co/spaces/covia-ai/covia-space',
        tags: ['huggingface', 'hosted'],
      },
      {
        name: 'Convex on X',
        description: 'Announcements, releases, and ecosystem news from the Convex team.',
        homepage: 'https://twitter.com/convex_world',
        tags: ['twitter', 'social'],
      },
    ],
  },
  {
    id: 'web',
    title: 'Web',
    description: 'Ecosystem websites — landing pages, documentation, blogs, and hosted apps.',
    projects: [
      {
        name: 'convex.world',
        description: 'Main Convex site — platform overview, vision, ecosystem, community, and the Superpowers tour.',
        homepage: 'https://convex.world',
        repo: 'https://github.com/Convex-Dev/convex.world',
        tags: ['website'],
      },
      {
        name: 'covia.ai',
        description: 'Main Covia site — the universal grid for AI orchestration and federated multi-agent workflows.',
        homepage: 'https://covia.ai',
        tags: ['website'],
      },
      {
        name: 'Convex Docs & CADs',
        description:
          'Convex architecture documentation, Convex Architecture Documents (formal specs), and the whitepaper.',
        homepage: 'https://docs.convex.world',
        repo: 'https://github.com/Convex-Dev/design',
        tags: ['docs', 'specs'],
      },
      {
        name: 'Convex Blog',
        description: 'Announcements, technical deep-dives, and ecosystem updates from the Convex team.',
        homepage: 'https://docs.convex.world/blog',
        tags: ['blog'],
      },
      {
        name: 'Covia Docs',
        description: 'User and operator documentation for Covia — agents, orchestrations, adapters, and operations.',
        homepage: 'https://docs.covia.ai',
        repo: 'https://github.com/covia-ai/covia-docs',
        tags: ['docs'],
      },
      {
        name: 'Covia App',
        description: 'Hosted Covia grid — launch agents and orchestrations against a running venue without installing anything.',
        homepage: 'https://app.covia.ai',
        tags: ['app', 'hosted'],
      },
    ],
  },
];

