export type ProjectStatus = 'active' | 'beta' | 'experimental' | 'archived' | 'planned';
export type ProjectLicensing = 'open-source' | 'commercial' | 'mixed' | 'public';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface McpConfig {
  endpoint: string;
  transport?: 'streamable-http' | 'sse' | 'stdio';
}

export interface VideoInfo {
  url: string;
  uploadDate?: string;
  durationISO?: string;
  speaker?: string;
  event?: string;
}

export interface Project {
  name: string;
  slug?: string;
  description: string;
  longDescription?: string;
  homepage?: string;
  repo?: string;
  docs?: string;
  links?: ProjectLink[];
  tags?: string[];
  badge?: string;
  status?: ProjectStatus;
  licensing?: ProjectLicensing;
  license?: string;
  mcp?: McpConfig;
  video?: VideoInfo;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  projects: Project[];
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function projectSlug(project: Project): string {
  return project.slug ?? slugify(project.name);
}

export function projectPath(categoryId: string, project: Project): string {
  return `projects/${categoryId}/${projectSlug(project)}/`;
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
        longDescription:
          'Convex is a decentralised, lattice-based network that securely hosts, executes, and persists both code and data. It realises the vision of a Stateful Internet — a foundation for digital economies, federated systems, and cross-organisational collaboration.\n\nThe platform is built around Convergent Proof of Stake, a high-throughput consensus protocol that finalises transactions deterministically without coordination between peers. Application state is stored as lattice-structured immutable data, so independent actors can always reach the same result without central authority or locking.\n\nConvex is open-source and stewarded by the Convex Foundation.',
        homepage: 'https://convex.world',
        repo: 'https://github.com/Convex-Dev/convex',
        docs: 'https://docs.convex.world',
        tags: ['java', 'lattice', 'consensus'],
        badge: 'Platform',
        status: 'active',
        licensing: 'open-source',
        license: 'Apache-2.0',
        links: [
          { label: 'Whitepaper', url: 'https://docs.convex.world/cvm-whitepaper.pdf' },
          { label: 'Blog', url: 'https://docs.convex.world/blog' },
          { label: 'Javadoc', url: 'https://javadoc.io/doc/world.convex/convex-core' },
          { label: 'Discord', url: 'https://discord.com/invite/xfYGq4CT7v' },
          { label: 'GitHub Org', url: 'https://github.com/Convex-Dev' },
        ],
      },
      {
        name: 'Covia',
        description:
          'Federated AI orchestration grid built on Convex lattice. Collaboration across clouds and jurisdictions with built-in governance.',
        longDescription:
          'Covia is open-source infrastructure for federated AI orchestration. It lets AI models, agents, and data collaborate across organisational boundaries, clouds, and jurisdictions — with built-in governance and without centralising control.\n\nBuilt on top of Convex lattice technology, a Covia venue exposes agents, assets, orchestrations, vaults, and a grid execution environment via REST and MCP. Agents can invoke each other, share context, persist state, and run composite workflows without a single trusted coordinator.',
        homepage: 'https://covia.ai',
        repo: 'https://github.com/covia-ai/covia',
        docs: 'https://docs.covia.ai',
        tags: ['java', 'agents', 'orchestration'],
        badge: 'Platform',
        status: 'active',
        licensing: 'mixed',
        license: 'Apache-2.0',
        links: [
          { label: 'Hosted grid', url: 'https://app.covia.ai' },
          { label: 'Javadoc', url: 'https://javadoc.io/doc/ai.covia/covia-core' },
          { label: 'Discord', url: 'https://discord.gg/fywdrKd8QT' },
          { label: 'GitHub Org', url: 'https://github.com/covia-ai' },
        ],
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
        longDescription:
          'Convex DB is a relational database built on the Convex lattice. It speaks SQL via JDBC and the PostgreSQL wire protocol, so existing tooling — drivers, ORMs, query builders, BI tools — works out of the box. Under the hood, rows and indexes are stored as lattice-structured data that merges convergently, giving you standard relational semantics on top of a decentralised, replicated state layer.\n\nIntended for applications that need both the ergonomics of SQL and the properties of lattice storage: multi-peer replication, content-addressed history, and deterministic merges.',
        repo: 'https://github.com/Convex-Dev/convex',
        docs: 'https://docs.convex.world',
        links: [
          { label: 'Javadoc', url: 'https://javadoc.io/doc/world.convex/convex-db' },
        ],
        tags: ['sql', 'jdbc', 'database'],
        status: 'beta',
        licensing: 'open-source',
        license: 'Apache-2.0',
      },
      {
        name: 'DLFS',
        description:
          'Decentralised Lattice File System — a content-addressed, CRDT-mergeable filesystem with WebDAV and Java NIO compatibility. Mount it anywhere.',
        longDescription:
          'DLFS — the Decentralised Lattice File System — is a content-addressed, CRDT-mergeable filesystem that runs on the Convex lattice. It exposes a familiar hierarchical namespace with WebDAV and Java NIO compatibility, so you can mount it as a drive or access it through standard file APIs.\n\nEvery directory and file is a lattice value. Concurrent writes from independent peers merge deterministically, without a central coordinator. DLFS is designed to store both user-facing documents and machine-generated assets — datasets, model weights, blobs — with strong integrity guarantees and efficient sync.',
        homepage: 'https://convex.world/dlfs',
        repo: 'https://github.com/Convex-Dev/convex',
        links: [
          { label: 'Javadoc', url: 'https://javadoc.io/doc/world.convex/convex-dlfs' },
        ],
        tags: ['filesystem', 'crdt', 'webdav'],
        status: 'active',
        licensing: 'open-source',
        license: 'Apache-2.0',
      },
      {
        name: 'Convex Social',
        description:
          'Peer-to-peer social network primitives on the lattice. Users own cryptographically signed feeds; nodes selectively replicate based on follow relationships.',
        longDescription:
          'Convex Social provides peer-to-peer primitives for social networks built on the lattice. Users own cryptographically signed feeds rooted in their own keys; nodes selectively replicate content based on follow relationships and local policy. There is no central server, no platform account, and no single party that can suspend or shadow-ban.\n\nThe design handles identity, posting, following, threading, and reactions, with lattice-merge semantics that make concurrent activity from disconnected peers converge cleanly when they sync.',
        repo: 'https://github.com/Convex-Dev/convex',
        links: [
          { label: 'Javadoc', url: 'https://javadoc.io/doc/world.convex/convex-social' },
        ],
        tags: ['social', 'p2p', 'identity'],
        status: 'experimental',
        licensing: 'open-source',
        license: 'Apache-2.0',
      },
      {
        name: 'KV Database',
        description:
          'Named KV database on the lattice with per-owner signed replicas. Rich data types — counters, lists, sets, sorted sets, hashes — Redis-style, globally mergeable.',
        longDescription:
          'The KV Database is a named, multi-owner key-value store on the Convex lattice with signed replicas. Values are not just strings — it supports rich data types modelled on Redis (counters, lists, sets, sorted sets, hashes), all with lattice merge semantics so concurrent edits from different replicas converge.\n\nEach owner\'s namespace is cryptographically signed, so replicas can be distributed widely without trusting intermediaries. Ideal for user profiles, session state, caches, and application data that benefits from disconnected operation.',
        repo: 'https://github.com/Convex-Dev/convex',
        links: [
          { label: 'Javadoc', url: 'https://javadoc.io/doc/world.convex/convex-core' },
        ],
        tags: ['kv', 'database', 'signed'],
        status: 'active',
        licensing: 'open-source',
        license: 'Apache-2.0',
      },
      {
        name: 'LatticeMQ',
        description:
          'Kafka-style distributed message queue on the lattice. Two-level hierarchy of topics and partitions, each an append-only log with lattice merge semantics.',
        longDescription:
          'LatticeMQ is a distributed message queue modelled after Kafka, built on the Convex lattice. It offers a two-level hierarchy of topics and partitions, where each partition is an append-only log. Producers write concurrently; consumers read by offset; all of it merges lattice-deterministically across replicas.\n\nLatticeMQ is useful when you need durable, ordered streams but want the replication, integrity, and decentralisation properties of lattice storage rather than a coordinator-based broker.',
        repo: 'https://github.com/Convex-Dev/convex',
        links: [
          { label: 'Javadoc', url: 'https://javadoc.io/doc/world.convex/convex-core' },
        ],
        tags: ['queue', 'pubsub', 'messaging'],
        status: 'active',
        licensing: 'open-source',
        license: 'Apache-2.0',
      },
      {
        name: 'Embedded Peer',
        description:
          'Full consensus peer you can embed directly in a JVM — participate in the Convex network from your own application process.',
        repo: 'https://github.com/Convex-Dev/convex',
        links: [
          { label: 'Javadoc', url: 'https://javadoc.io/doc/world.convex/convex-peer' },
        ],
        tags: ['peer', 'consensus', 'embedded'],
      },
      {
        name: 'NodeServer',
        description:
          'Lightweight networked lattice sync server. Speaks the binary protocol to exchange and merge lattice values without running full peer consensus.',
        repo: 'https://github.com/Convex-Dev/convex',
        links: [
          { label: 'Javadoc', url: 'https://javadoc.io/doc/world.convex/convex-peer' },
        ],
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
        links: [
          { label: 'Javadoc', url: 'https://javadoc.io/doc/world.convex/convex-core' },
        ],
        tags: ['java', 'core', 'cad3'],
      },
      {
        name: 'convex-java',
        description: 'Java / JVM client API for the Convex peer network — transactions, queries, and state access.',
        repo: 'https://github.com/Convex-Dev/convex-java',
        links: [
          { label: 'Javadoc', url: 'https://javadoc.io/doc/world.convex/convex-java' },
        ],
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
        links: [
          { label: 'Javadoc', url: 'https://javadoc.io/doc/world.convex/convex-restapi' },
        ],
        tags: ['mcp', 'convex', 'testnet'],
        mcp: {
          endpoint: 'https://mikera1337-convex-testnet.hf.space/mcp',
          transport: 'streamable-http',
        },
      },
      {
        name: 'Covia Venue MCP',
        description:
          'MCP server built into the Covia venue. Exposes agents, assets, DLFS, Convex queries, vaults, and grid execution to AI clients.',
        repo: 'https://github.com/covia-ai/covia',
        docs: 'https://docs.covia.ai',
        links: [
          { label: 'Javadoc', url: 'https://javadoc.io/doc/ai.covia/venue' },
        ],
        tags: ['mcp', 'covia', 'agents'],
      },
      {
        name: 'Covia Space',
        description:
          'Hosted Covia grid venue on Hugging Face Spaces — MCP-ready out of the box for experimenting with federated agent orchestration.',
        repo: 'https://github.com/covia-ai/covia-space',
        tags: ['mcp', 'covia', 'hosted'],
        mcp: {
          endpoint: 'https://mikera1337-covia-space.hf.space/mcp',
          transport: 'streamable-http',
        },
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
        name: 'Convex Foundation',
        description:
          'Non-profit stewarding the Convex lattice network, its open-source platform, and the Convergent Proof of Stake protocol.',
        homepage: 'https://convex.world',
        tags: ['foundation', 'open-source'],
        badge: 'Foundation',
      },
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
    id: 'videos',
    title: 'Videos & Talks',
    description: 'Conference talks, demos, and presentations about lattice technology and Convex.',
    projects: [
      {
        name: 'Lisp for Lattice Technology',
        slug: 'lisp-for-lattice-technology',
        description:
          'Mike Anderson shows how Lisp — specifically Convex Lisp on the CVM — maps naturally onto lattice-based decentralised systems.',
        longDescription:
          'Talk given to the London Clojurians (August 2023). Mike Anderson, creator of Convex, walks through why Lisp is a good fit for programming lattice-structured state: immutable persistent data, homoiconic code, and the expressive power needed to describe convergent merges. Includes live CVM examples against a running Convex network.',
        homepage: 'https://www.youtube.com/watch?v=bpKAQgcJRao',
        tags: ['talk', 'lisp', 'cvm'],
        badge: 'Talk',
        video: {
          url: 'https://www.youtube.com/watch?v=bpKAQgcJRao',
          uploadDate: '2023-08-01',
          speaker: 'Mike Anderson',
          event: 'London Clojurians',
        },
      },
      {
        name: 'Beyond Blockchain — Convergent Consensus',
        slug: 'beyond-blockchain-convergent-consensus',
        description:
          'Strange Loop 2022 talk introducing Convergent Proof of Stake — a decentralised consensus algorithm built on lattice mathematics rather than linear chains.',
        longDescription:
          'Mike Anderson presents at Strange Loop 2022. Topics: why blockchains are fundamentally a data-structure choice; how a lattice model delivers convergence without sequential ordering; the Convergent Proof of Stake algorithm; implications for throughput, finality, and the shape of decentralised applications.',
        homepage: 'https://www.youtube.com/watch?v=XmDUkrOAhsY',
        tags: ['talk', 'consensus', 'cpos'],
        badge: 'Talk',
        video: {
          url: 'https://www.youtube.com/watch?v=XmDUkrOAhsY',
          uploadDate: '2022-10-01',
          speaker: 'Mike Anderson',
          event: 'Strange Loop 2022',
        },
      },
      {
        name: 'Convex — Data Lattice and Convergent Storage',
        slug: 'convex-data-lattice-and-convergent-storage',
        description:
          'Deep dive into the Convex data lattice — how content-addressed, convergently-merged storage replicates across peers without central coordination.',
        longDescription:
          'An introduction to Convex\'s integrated decentralised data storage and distribution, enabled by an encoded lattice architecture. Covers value hashing, canonical encoding, lattice merge semantics, and how this substrate underpins everything from account state to DLFS to LatticeMQ.',
        homepage: 'https://www.youtube.com/watch?v=muReIjQGpQk',
        tags: ['talk', 'storage', 'lattice'],
        badge: 'Demo',
        video: {
          url: 'https://www.youtube.com/watch?v=muReIjQGpQk',
          uploadDate: '2024-02-01',
          event: 'Convex Foundation',
        },
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
      {
        name: 'Convex on YouTube',
        description: 'The Convex Foundation YouTube channel — talks, demos, and community content about the lattice platform.',
        homepage: 'https://www.youtube.com/@convex-world',
        tags: ['youtube', 'video'],
      },
      {
        name: 'Mike Anderson on YouTube',
        description: 'Mike Anderson\'s YouTube channel — Convex Lisp, lattice theory, and Convergent Proof of Stake talks.',
        homepage: 'https://www.youtube.com/@mikejanderson',
        tags: ['youtube', 'video'],
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

