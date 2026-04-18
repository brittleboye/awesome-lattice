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
        name: 'Decentralise the World via the Clojure Philosophy',
        slug: 'decentralise-the-world-clojure-philosophy',
        description:
          'Adam Helins — reClojure 2021. How the Clojure worldview (immutability, persistent data, values over places) maps onto decentralisation and the Convex lattice.',
        longDescription:
          'Adam Helins presents at reClojure 2021. The talk explores why Clojure\'s core design decisions — immutability, persistent data structures, separation of identity and value — are a natural fit for decentralised systems, and walks through how Convex applies those ideas to build a lattice-based consensus platform.\n\nNote: the original recording has an audio sync issue.',
        homepage: 'https://www.youtube.com/watch?v=c9giCgdPF14',
        tags: ['talk', 'clojure', 'philosophy'],
        badge: 'Talk',
        video: {
          url: 'https://www.youtube.com/watch?v=c9giCgdPF14',
          uploadDate: '2021-12-01',
          speaker: 'Adam Helins',
          event: 'reClojure 2021',
        },
      },
      {
        name: 'MCP 1st Birthday Hackathon — Agentic Economics',
        slug: 'mcp-1st-birthday-hackathon-agentic-economics',
        description:
          'Covia team demo from the MCP 1st Birthday Hackathon: an MCP server that lets AI agents negotiate and transact economic contracts with each other, powered by Convex and the Covia Grid.',
        longDescription:
          'The Covia team\'s entry for the MCP 1st Birthday Hackathon (celebrating one year of the Model Context Protocol). They built an MCP server that exposes a full agentic-economics toolkit — agents discover each other, negotiate terms, and transact economic contracts via MCP tool calls.\n\nThe stack: Convex (convex.world) for decentralised lattice state and settlement, and the Covia Grid (covia.ai) for federated agent orchestration and MCP-native execution. A concrete demonstration of how MCP, lattice consensus, and agent frameworks compose into an economic protocol layer.',
        homepage: 'https://www.youtube.com/watch?v=7KkT8efTv1s',
        tags: ['hackathon', 'mcp', 'agents', 'covia', 'demo'],
        badge: 'Demo',
        video: {
          url: 'https://www.youtube.com/watch?v=7KkT8efTv1s',
          uploadDate: '2025-11-25',
          event: 'MCP 1st Birthday Hackathon',
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
        tags: ['convex-live', 'community-call', 'storage', 'lattice'],
        badge: 'Livestream',
        video: {
          url: 'https://www.youtube.com/watch?v=muReIjQGpQk',
          uploadDate: '2024-02-08',
          durationISO: 'PT59M38S',
          event: 'Convex Live',
        },
      },
      {
        name: "AMA: PEER OPS",
        slug: "ama-peer-ops",
        description:
          "Community Peer Operator AMA — the future of AI economic systems and decentralised peer operations on Convex.",
        longDescription:
          "AMA: PEER OPS — The Future of AI Economic Systems | Convex Network\n\nWelcome to the Community Peer Operator AMA, a deep dive into the next era of decentralized infrastructure and AI-native economic systems. If you're exploring how to participate in Convex as a builder, operator, or early ecosystem contributor, this AMA is the perfect place to start.\n\nConvex is moving into a new chapter—one where the network is powered by Peer Operators: community-driven participants who run the compute, storage, verification, and economic layers of the protocol.  Convex is creating a distributed, human-led network that supports autonomous agents, data routing, microservices, and real-time economic coordination.",
        homepage: "https://www.youtube.com/watch?v=ooqbfsozp-c",
        tags: ["convex-live","community-call","ama","peer","operator"],
        badge: "AMA",
        video: {
          url: "https://www.youtube.com/watch?v=ooqbfsozp-c",
          uploadDate: "2025-12-12",
          durationISO: "PT1H4M40S",
          event: "Convex Live",
        },
      },
      {
        name: "NFT Infrastructure on Convex",
        slug: "nft-infrastructure-on-convex",
        description:
          "Community call on NFT infrastructure: creating, transferring, and managing non-fungible digital assets on Convex.",
        longDescription:
          "In this call we'll be doing a dive into how NFTs work on Convex: how to create, transfer and manage non-fungible digital assets.\n\nJoin us live for discussion on this important topic for the next generation of digital assets!",
        homepage: "https://www.youtube.com/watch?v=iaGa_IOo4_8",
        tags: ["convex-live","community-call","nft","assets"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=iaGa_IOo4_8",
          uploadDate: "2024-06-27",
          durationISO: "PT1H8M30S",
          event: "Convex Live",
        },
      },
      {
        name: "The Convex Manifesto",
        slug: "the-convex-manifesto",
        description:
          "Deep dive into the Convex Manifesto — the blueprint for building open, sustainable economic systems on decentralised lattice tech.",
        longDescription:
          "Join us for the Convex Community Call as we delve into the Convex Manifesto, our blueprint for building open and sustainable economic systems using decentralized technology. This discussion will not only clarify our core beliefs and principles but also offer you the opportunity to contribute to shaping our future. This manifesto is critical as it addresses economic inclusivity, self-sovereignty, sustainability, and the practicalities of real-time transactions within a global state. Whether you are deeply invested in decentralized systems or are new to the concept, your insights are invaluable. Together, let's explore how we can facilitate fair and efficient economic systems for everyone, everywhere.",
        homepage: "https://www.youtube.com/watch?v=-6EXMjnBVd8",
        tags: ["convex-live","community-call","manifesto","vision"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=-6EXMjnBVd8",
          uploadDate: "2024-05-02",
          durationISO: "PT1H4M51S",
          event: "Convex Live",
        },
      },
      {
        name: "Nation Coins and the future of currency",
        slug: "nation-coins-and-the-future-of-currency",
        description:
          "Nation Coins, stable coins, and the evolving landscape of digital currencies — how Convex enables sovereign digital money.",
        longDescription:
          "Join us for an enlightening discussion on the evolving landscape of digital currencies, focusing on Nation Coins, Stable Coins, and their interaction with innovative financial platforms like Exchanges with Convex. This virtual event will explore the potential of these emerging technologies to transform the economic fabric of nations worldwide.\n\nExperts and enthusiasts alike will delve into:",
        homepage: "https://www.youtube.com/watch?v=7sj0VrV2DMQ",
        tags: ["convex-live","community-call","tokenomics","currency","stablecoin"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=7sj0VrV2DMQ",
          uploadDate: "2024-04-25",
          durationISO: "PT58M40S",
          event: "Convex Live",
        },
      },
      {
        name: "Unpacking the Data Lattice File System (DLFS)",
        slug: "unpacking-the-data-lattice-file-system-dlfs",
        description:
          "Unpacking the Data Lattice File System (DLFS) — a decentralised, content-addressed filesystem built on lattice storage.",
        longDescription:
          "Join us for an exclusive webinar where we'll discuss the newly developed Data Lattice File System (DLFS) on Convex. This innovative system represents a significant leap in decentralized data storage, merging the scalability of BitTorrent, the security of IPFS, and the usability of DropBox.\n\nLearn how DLFS:\nEnhances scalability and privacy for dApps.\nProvides cost-efficient, real-time data processing.\nSupports rich data formats and robust access control mechanisms.\n\nThis session will provide insights into DLFS architecture, its integration with existing Convex infrastructure, and its role in advancing decentralized applications. Don’t miss out on exploring how DLFS can transform data management!",
        homepage: "https://www.youtube.com/watch?v=abVbmzz7zDs",
        tags: ["convex-live","community-call","dlfs","storage","filesystem"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=abVbmzz7zDs",
          uploadDate: "2024-04-18",
          durationISO: "PT1H48S",
          event: "Convex Live",
        },
      },
      {
        name: "Unlocking Value: Tokenomics Design",
        slug: "unlocking-value-tokenomics-design",
        description:
          "Tokenomics design on Convex — how to shape economic value, incentives, and growth in open digital economies.",
        longDescription:
          "Join us for an insightful exploration into the world of tokenomics design in this Convex Community Call. Discover how we're shaping value and fostering growth through strategic tokenomics. Don't miss this opportunity to delve into the intricacies of decentralized economies with industry experts and fellow enthusiasts.",
        homepage: "https://www.youtube.com/watch?v=Kx69Hxqni5A",
        tags: ["convex-live","community-call","tokenomics"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=Kx69Hxqni5A",
          uploadDate: "2024-04-11",
          durationISO: "PT59M32S",
          event: "Convex Live",
        },
      },
      {
        name: "Data, AI and Crypto",
        slug: "data-ai-and-crypto",
        description:
          "Data, AI, and crypto — the fusion of decentralised data, intelligent agents, and cryptographic settlement on Convex.",
        longDescription:
          "As we stand on the brink of a new technological era, the fusion of Data, Artificial Intelligence, and Cryptocurrency presents unparalleled opportunities for innovation across various industries. This community call, \"Data, AI, and Crypto: Building the Future Together,\" invites enthusiasts, professionals, and innovators from all sectors to explore the impactful synergies between these technologies.\n\nThis session is an invitation to think big and think forward. It’s an opportunity collaboration among developers, business leaders, and tech aficionados to harness the collective potential of Data, AI, and Crypto to address complex challenges and create a future that is not only technologically advanced but also inclusive, secure, and sustainable.",
        homepage: "https://www.youtube.com/watch?v=cGpmn56KLtA",
        tags: ["convex-live","community-call","ai","data","crypto"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=cGpmn56KLtA",
          uploadDate: "2024-04-04",
          durationISO: "PT1H1M56S",
          event: "Convex Live",
        },
      },
      {
        name: "Transaction Flow on an Internet Computer",
        slug: "transaction-flow-on-an-internet-computer",
        description:
          "Transaction flow on an Internet Computer — how the Convex Virtual Machine processes transactions at web scale.",
        longDescription:
          "Decentralised execution engines such as the Convex Virtual Machine represent a breakthrough in the capabilities of the Internet, offering the potential to harness a true unstoppable Internet Computer.\n\nIn this live stream, we'll explore the ideas around Internet Computers, and the lifecycle of transactions that allow users to interact with them as part of a global network.\n\nAs always, we'll be chatting live so you are welcome bring your own big ideas and questions to the discussion!",
        homepage: "https://www.youtube.com/watch?v=Zcr8i2K4wHE",
        tags: ["convex-live","community-call","transactions","cvm"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=Zcr8i2K4wHE",
          uploadDate: "2024-03-28",
          durationISO: "PT1H3M",
          event: "Convex Live",
        },
      },
      {
        name: "Convex Desktop and Latest Developments",
        slug: "convex-desktop-and-latest-developments",
        description:
          "Convex Desktop and the latest platform developments — tools, features, and the road to Protonet.",
        longDescription:
          "In today's fast-paced tech landscape, innovation never sleeps. At Convex, we're constantly pushing boundaries and introducing new features to enhance our cutting-edge platform. Keeping up with the latest developments can be challenging, but we're committed to ensuring our community stays ahead of the curve.\n\nWhether you're a power user, developer, or just curious about what's new, our upcoming community call is the perfect opportunity to dive into the latest Convex Desktop GUI updates. Join us as we explore the exciting new capabilities, innovative approaches, and groundbreaking technologies that are shaping the future of our platform.\n\nYou'll have the chance to ask questions, share your thoughts, and gain valuable insights from our experts. Don't miss this chance to be part of the conversation and stay at the forefront of innovation.",
        homepage: "https://www.youtube.com/watch?v=GbaSL89WE6c",
        tags: ["convex-live","community-call","desktop","tools"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=GbaSL89WE6c",
          uploadDate: "2024-03-21",
          durationISO: "PT1H1M56S",
          event: "Convex Live",
        },
      },
      {
        name: "CVM Hacks",
        slug: "cvm-hacks",
        description:
          "CVM hacks — techniques and patterns for programming the Convex Virtual Machine in Convex Lisp.",
        longDescription:
          "The Convex CVM is a powerful decentralised virtual machine for open economic systems. It provides a unique programming environment with powerful capabilities based on the lambda calculus.\n\nIn today's community call we'll be taking a look at a variety of fun hacks and tricks you can do with the CVM, including some rare and innovative features to appeal to any coding afficionado. Join us live as we explore some magical hacks!",
        homepage: "https://www.youtube.com/watch?v=4vm-bEvOI8c",
        tags: ["convex-live","community-call","cvm","smart-contracts"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=4vm-bEvOI8c",
          uploadDate: "2024-03-14",
          durationISO: "PT1H6M26S",
          event: "Convex Live",
        },
      },
      {
        name: "Coding a Convex GUI in the Godot Game Engine",
        slug: "coding-a-convex-gui-in-the-godot-game-engine",
        description:
          "Live coding a crypto wallet GUI in the Godot game engine, backed by the Convex network.",
        longDescription:
          "Join us for a live coding session where we will build a GUI crypto wallet interface in Godot, an open source game engine. Convex's low latency and high throughput make it an ideal blockchain for game development.\n\nGodot is a free, open source engine for 2D and 3D game creation. It provides a rich feature set, intuitive editor, and C++-like scripting language while being completely free for both personal and commercial use.\n\nIn this hands-on session, we'll showcase Convex by using it to transact test assets right within a Godot-based GUI wallet we code live. You'll get to see firsthand how fast and responsive apps can be when built on Convex.",
        homepage: "https://www.youtube.com/watch?v=H3x3Cv1jS3w",
        tags: ["convex-live","community-call","gui","godot","wallet"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=H3x3Cv1jS3w",
          uploadDate: "2024-02-29",
          durationISO: "PT1H4M26S",
          event: "Convex Live",
        },
      },
      {
        name: "Coding Common Features in Smart Contracts",
        slug: "coding-common-features-in-smart-contracts",
        description:
          "Coding common smart contract features on Convex — reusable patterns built with Convex Lisp primitives.",
        longDescription:
          "Join us for a technical community call focusing on coding useful components into smart contracts on the Convex platform using Convex's built-in features. We will walk through examples of implementing common smart contract functionalities like access control, pausing, rate limiting, and circuit breakers - and similar capabilities that robust frameworks like OpenZeppelin provide for Solidity.\n\nConvex uses a different architecture and language and has native constructs that serve similar purposes of simplifying development and improving security. We'll examine these vetted code templates and customize them for decentralized apps.",
        homepage: "https://www.youtube.com/watch?v=X-jT7VgpA-4",
        tags: ["convex-live","community-call","smart-contracts","cvm"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=X-jT7VgpA-4",
          uploadDate: "2024-02-22",
          durationISO: "PT58M28S",
          event: "Convex Live",
        },
      },
      {
        name: "Convex: Integrating with the Convex REST API",
        slug: "convex-integrating-with-the-convex-rest-api",
        description:
          "Integrating with the Convex Lattice JSON REST API — easy network interaction from any dApp or client.",
        longDescription:
          "We demonstrate integrating with Convex Lattice's JSON Rest API for easy interaction with the network from any dApp or client. Learn how you can leverage this API for your applications without needing the native binary protocol.\n\nAPIs (Application Programming Interfaces) provide simplified interfaces that abstract the complexities of a system or platform and allow other software to interact with them in a standardized way. Using APIs to build applications is extremely valuable for a number of reasons.",
        homepage: "https://www.youtube.com/watch?v=zS7XI0YJ4zw",
        tags: ["convex-live","community-call","rest-api","integration"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=zS7XI0YJ4zw",
          uploadDate: "2024-02-15",
          durationISO: "PT1H2M46S",
          event: "Convex Live",
        },
      },
      {
        name: "Convex: Changing the Game",
        slug: "convex-changing-the-game",
        description:
          "How Convex is transforming decentralised gaming — low latency, high throughput, and programmable economies.",
        longDescription:
          "Come explore how Convex is primed to transform the future of decentralised gaming with its unparalleled capabilities.\n\nIn this session, we will unlock Convex's true gaming potential and demonstrate how its groundbreaking features enable compelling new possibilities:\n\n- Support for advanced on-chain game logic through an integrated runtime capable of real-time code execution \n- Direct integration with Clojure development environments for seamless blockchain interactions\n- Unmatched transaction speeds and scalability to power synchronous multiplayer experiences\n- Conflict-free data structures facilitating consistent game state updates across participants\n- Dynamic NFTs and tokenized in-game assets backed by robust crypto-economic models",
        homepage: "https://www.youtube.com/watch?v=yss_zwMEoS4",
        tags: ["convex-live","community-call","gaming"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=yss_zwMEoS4",
          uploadDate: "2024-02-01",
          durationISO: "PT57M30S",
          event: "Convex Live",
        },
      },
      {
        name: "Convex: Community Opportunities",
        slug: "convex-community-opportunities",
        description:
          "Community opportunities around Protonet launch — how contributors can earn early token rewards.",
        longDescription:
          "As Convex approaches launching Protonet, community assistance can earn early token rewards. Opportunities include:\n\nTesting Protonet or Testnet by creating transactions, deploying contracts & dApps, reporting issues. Stress testing improves robustness.\n\nContributing developer guides, user tutorials & docs. Clear info onboards more users.",
        homepage: "https://www.youtube.com/watch?v=Wo3l3X-I2cA",
        tags: ["convex-live","community-call","community","protonet"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=Wo3l3X-I2cA",
          uploadDate: "2024-01-25",
          durationISO: "PT1H1M8S",
          event: "Convex Live",
        },
      },
      {
        name: "Convex: Network Security",
        slug: "convex-network-security",
        description:
          "Network security on Convex — robust, decentralised end-to-end defences for open economic systems.",
        longDescription:
          "Network Security - Robust, decentralised end-to-end defences\n\nWe will discuss how Convex deploys the key concepts of security using decentralised models via consensus mechanisms to provide distributed security without centralised points of failure or trust requirements - enabling highly reliable and incorruptible defence across the network from end to end. Appropriately locking down access and fortifying protection aim to signal the rigour involved in implementing cryptography, peer validation, economical incentives, and other techniques that together seal up vulnerabilities from various attack vectors like a vault.\n\nThe result is comprehensively secure infrastructure across nodes and the ability to detect unauthorised alterations or infiltration attempts through hashing and related strategies.",
        homepage: "https://www.youtube.com/watch?v=PiAEmhgsuf8",
        tags: ["convex-live","community-call","security"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=PiAEmhgsuf8",
          uploadDate: "2024-01-18",
          durationISO: "PT1H2M2S",
          event: "Convex Live",
        },
      },
      {
        name: "Convex: The dawn of persistence",
        slug: "convex-the-dawn-of-persistence",
        description:
          "The dawn of persistence — moving from Testnet to durable, decentralised on-chain state ahead of Protonet.",
        longDescription:
          "Friends, a moment of transformation beckons. We stand on the cusp of a new chapter of Convex, where the seeds sown in the Testnet blossom into permanence. Protonet isn't just a technical upgrade; it's a leap towards a sustainable, vibrant open economic systems.\n\nWith Protonet, digital assets and Web3 projects move becomes real. The CVM becomes the world's most advanced digital economic computer. The Global State is live. This is a huge opportunity for developers, creators and entrepreneurs and so in today's call we'll be discussing the Protonet launch and what it will mean.\n\nThis shift isn't just about technology; it's about community. Together, let's write the next chapter of the Convex story!",
        homepage: "https://www.youtube.com/watch?v=6eNDXqbYERc",
        tags: ["convex-live","community-call","persistence","storage","protonet"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=6eNDXqbYERc",
          uploadDate: "2024-01-11",
          durationISO: "PT1H34S",
          event: "Convex Live",
        },
      },
      {
        name: "Convex: Inspiration, Motivation and Vision",
        slug: "convex-inspiration-motivation-and-vision",
        description:
          "Convex inspiration, motivation, and vision — the origin story of the research project that became a decentralised platform.",
        longDescription:
          "As the protonet launch draws near, many newcomers to the community are unaware of the origins of the research project that would later become Convex.\n\nFollow along as Mike discusses the thoughts that were going through his head as he began to reimagine decentralised architecture based on first principles. Find out what prompted him to devote his own time and resources to the search for a breakthrough solution.  As he explains the vision that motivates him to bring this innovation to market as a public good, you will take part in the conversation.",
        homepage: "https://www.youtube.com/watch?v=KwIJ9dPLVXw",
        tags: ["convex-live","community-call","vision","history"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=KwIJ9dPLVXw",
          uploadDate: "2024-01-04",
          durationISO: "PT1H8M14S",
          event: "Convex Live",
        },
      },
      {
        name: "Convex Name System: Developing better namespaces for open economic systems",
        slug: "convex-name-system-developing-better-namespaces-for-open-economic-syst",
        description:
          "Convex Name System (CNS) — distributed, open, extensible naming for decentralised economic systems.",
        longDescription:
          "The Convex Name Service (CNS) is a naming system based on the Convex Lattice technology that is distributed, open, and extensible.\n\nCNS translates human-readable names like 'bob.cvx' into machine-readable identifiers like Convex addresses, other cryptocurrency addresses, content hashes, and metadata.\n\nCNS's goals are similar to those of DNS, the Internet's Domain Name Service, but it is built on a different architecture based on the Convex Lattice. CNS, like DNS, is based on a system of hierarchical names, which allows traditional configurations where the domain owner has complete control over subdomains, but also flexible governance options such as a smart contract being able to control CNS allocation.",
        homepage: "https://www.youtube.com/watch?v=oUHy5UxJGUY",
        tags: ["convex-live","community-call","cns","namespaces"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=oUHy5UxJGUY",
          uploadDate: "2023-12-21",
          durationISO: "PT1H1M",
          event: "Convex Live",
        },
      },
      {
        name: "Trust Monitors: Flexible security for open economic systems",
        slug: "trust-monitors-flexible-security-for-open-economic-systems",
        description:
          "Trust Monitors — flexible, composable security primitives for governance and authorisation on Convex.",
        longDescription:
          "How do we build robust but flexible systems for governance and authorisation in the new world of open economic systems?\n\nConvex brings a novel solution: Trust Monitors are composable, secure, on-chain authorisation modules that can be use to define arbitrary access rules for smart contracts, digital assets and other capabilities needed for open economic systems.\n\nTrust Monitors are based on the reference monitor model, which was developed as part of United States military. It continues to be the case that systems evaluated at level B3 and above under the Trusted Computer System Evaluation Criteria (TCSEC) are required to use the reference monitor model to enforce access controls.",
        homepage: "https://www.youtube.com/watch?v=Yg2LHc79NSQ",
        tags: ["convex-live","community-call","security","trust-monitors","governance"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=Yg2LHc79NSQ",
          uploadDate: "2023-12-14",
          durationISO: "PT1H3M10S",
          event: "Convex Live",
        },
      },
      {
        name: "Rethinking Smart Contracts: A New Paradigm for Trust and Automation",
        slug: "rethinking-smart-contracts-a-new-paradigm-for-trust-and-automation",
        description:
          "Rethinking smart contracts — a new paradigm for trust and automation in open economic systems.",
        longDescription:
          "Imagine a world where agreements are self-executing, where trust is built into code, and where automation unlocks a new level of efficiency and transparency. This is the promise of smart contracts, self-governing programs that run on decentralized networks. While smart contracts have already revolutionized industries like finance and supply chain management, they are still in their infancy.\n\nBut what if we could rethink the very nature of smart contracts?",
        homepage: "https://www.youtube.com/watch?v=758zIIwZiNQ",
        tags: ["convex-live","community-call","smart-contracts"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=758zIIwZiNQ",
          uploadDate: "2023-12-07",
          durationISO: "PT1H3M40S",
          event: "Convex Live",
        },
      },
      {
        name: "The Sandbox -  Interactive development on Convex",
        slug: "the-sandbox-interactive-development-on-convex",
        description:
          "The Convex Sandbox — interactive, REPL-based development for rapid prototyping on the lattice.",
        longDescription:
          "Convex isn't just about infrastructure for building open economic systems at scale: it offers powerful tools for developers to make it easy to create the digital economy of the future.\n\nThe Sandbox is an interactive development environment running live on the Convex testnet. In this stream we will be exploring the Sandbox, including an intro to the first CVM language: Convex Lisp",
        homepage: "https://www.youtube.com/watch?v=dE4IgCohGak",
        tags: ["convex-live","community-call","sandbox","repl","tools"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=dE4IgCohGak",
          uploadDate: "2023-11-30",
          durationISO: "PT1H2M25S",
          event: "Convex Live",
        },
      },
      {
        name: "Universal Assets -  Flexible models of value in decentralised economic systems",
        slug: "universal-assets-flexible-models-of-value-in-decentralised-economic-sy",
        description:
          "Universal Assets — one flexible model covering fungible tokens, NFTs, governance rights, derivatives and more.",
        longDescription:
          "Digital assets come in many forms. Fungible tokens. NFTs. Governance rights. Derivatives. Shares. And many more.\n\nThe Convex Asset Model is a universal system for expressing and controlling all kinds of digital assets in an on-chain environment. The key motivation for the Asset Model is to enable economic value transfer: digital assets can be securely owned, traded and used as part of contractual agreements just like real world assets.\n\nOf course, the security of the digital assets is enforced by the security guarantees of the Convex network.",
        homepage: "https://www.youtube.com/watch?v=XHxEnqBwgN8",
        tags: ["convex-live","community-call","assets","tokens"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=XHxEnqBwgN8",
          uploadDate: "2023-11-16",
          durationISO: "PT1H2M25S",
          event: "Convex Live",
        },
      },
      {
        name: "Actor Model - Account Abstraction or ERC-4337 made easy",
        slug: "actor-model-account-abstraction-or-erc-4337-made-easy",
        description:
          "The actor model on Convex — account abstraction (ERC-4337 style) made easy with first-class CVM accounts.",
        longDescription:
          "Accounts are a fundamental construct in Convex - they are logical records in the CVM State that are either securely controlled by an external User, or operate as Autonomous Actors.\n\nAccounts are the primary means of managing security and access control for on-chain Transactions. Any Transaction executed by Convex must be associated with a User Account and signed with a valid digital signature. This protects the User's account from unauthorised access.\n\nAccounts also constitute the largest part of the on-chain CVM State. Accounts are used to store code and data, and to track holdings of various digital assets.",
        homepage: "https://www.youtube.com/watch?v=NkTP6ClqcLY",
        tags: ["convex-live","community-call","actors","accounts","erc-4337"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=NkTP6ClqcLY",
          uploadDate: "2023-11-09",
          durationISO: "PT1H25S",
          event: "Convex Live",
        },
      },
      {
        name: "Convex Tokenomics―Community Call: DeFi Attributes",
        slug: "convex-tokenomics-community-call-defi-attributes",
        description:
          "DeFi attributes and Convex tokenomics — how the foundation structures token distribution and incentives.",
        longDescription:
          "How the Convex Foundation tokenomics are designed, distributed and work in the network.",
        homepage: "https://www.youtube.com/watch?v=Wp8WXetSFnY",
        tags: ["convex-live","community-call","tokenomics","defi"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=Wp8WXetSFnY",
          uploadDate: "2023-11-02",
          durationISO: "PT56M6S",
          event: "Convex Live",
        },
      },
      {
        name: "Importance of Runtime",
        slug: "importance-of-runtime",
        description:
          "The importance of runtime environments — why the CVM acts as a mini-OS for decentralised programs.",
        longDescription:
          "Runtime environments (RTE for short) act as small operating systems and provide all the functionality necessary for a program to run. This includes interfaces to physical parts of the hardware, user interactions, and software components. A runtime environment loads applications and has them run on a platform.",
        homepage: "https://www.youtube.com/watch?v=mNxuVgjotEM",
        tags: ["convex-live","runtime","cvm","short"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=mNxuVgjotEM",
          uploadDate: "2023-10-24",
          durationISO: "PT13M39S",
          event: "Convex Live",
        },
      },
      {
        name: "Interactive REPL Explained",
        slug: "interactive-repl-explained",
        description:
          "Interactive REPL explained — how Convex's read–eval–print loop enables live on-chain development.",
        longDescription:
          "Developing solutions in the Convex decentralised environment enacts a  read–eval–print loop (REPL), also termed an interactive toplevel or language shell, it is a simple interactive computer programming environment that takes single user inputs, executes them, and returns the result to the user; a program written in a REPL environment is executed piecewise. The term usually refers to programming interfaces similar to the classic Lisp machine interactive environment. Common examples include command-line shells and similar environments for programming languages, and the technique is very characteristic of scripting languages.  We've written Convex Lisp to account for the decentralised nature of Convex.\n\nHistory",
        homepage: "https://www.youtube.com/watch?v=d_4pR_GWJsM",
        tags: ["convex-live","repl","sandbox","short"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=d_4pR_GWJsM",
          uploadDate: "2023-10-23",
          durationISO: "PT3M12S",
          event: "Convex Live",
        },
      },
      {
        name: "Community Call AMA #1 07 07 23",
        slug: "community-call-ama-1-07-07-23",
        description:
          "Community call AMA #1 — an overview of Convex lattice technology with open questions from the community.",
        homepage: "https://www.youtube.com/watch?v=NkbjEVBoouo",
        tags: ["convex-live","community-call","ama","overview"],
        badge: "AMA",
        video: {
          url: "https://www.youtube.com/watch?v=NkbjEVBoouo",
          uploadDate: "2023-07-14",
          durationISO: "PT1H49S",
          event: "Convex Live",
        },
      },
      {
        name: "The Thoughtful Leader—Mike Anderson Ep 098 5Jan23",
        slug: "the-thoughtful-leader-mike-anderson-ep-098-5jan23",
        description:
          "Mike Anderson interviewed on The Thoughtful Leader — blockchain, lattice technology, and the Convex vision.",
        longDescription:
          "Mike Anderson—Founder of Convex, was recently interviewed by Mindy Gibbins-Klein on The Thoughtful Leader. It was a great experience! We talked about blockchain and the environment.\n\nThe Thoughtful Leader features REAL thought leaders sharing with you how to position yourself as a true authority in your field. I was fortunate enough to be a guest on the show. I found the experience to be thought-provoking and inspiring. Mindy is passionate about what she does!",
        homepage: "https://www.youtube.com/watch?v=4Vd9OM9bS6E",
        tags: ["convex-live","interview","founder"],
        badge: "Interview",
        video: {
          url: "https://www.youtube.com/watch?v=4Vd9OM9bS6E",
          uploadDate: "2023-01-05",
          durationISO: "PT22M2S",
          speaker: "Mike Anderson",
          event: "Convex Live",
        },
      },
      {
        name: "Convex Founder Intro",
        slug: "convex-founder-intro",
        description:
          "Mike Anderson, Convex founder, gives a brief intro to the platform and mission.",
        longDescription:
          "Brief video of our Founder Mike Anderson introducing Convex",
        homepage: "https://www.youtube.com/watch?v=aoie5BhmLjk",
        tags: ["convex-live","intro","founder","short"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=aoie5BhmLjk",
          uploadDate: "2022-12-01",
          durationISO: "PT55S",
          speaker: "Mike Anderson",
          event: "Convex Live",
        },
      },
      {
        name: "Game Development - Blockchain Biomes!",
        slug: "game-development-blockchain-biomes",
        description:
          "Live-coding a voxel game with biome generation on the Convex blockchain.",
        longDescription:
          "We add some basic Biomes to our rapidly evolving voxel game running on the Convex blockchain.\n\nIn this live coding session we create a new biome subsystem and three separate biomes: Grasslands, Desert and desolate Rocks.\n\nGame code: \nProject Discord:",
        homepage: "https://www.youtube.com/watch?v=x1Helnt3QP4",
        tags: ["convex-live","gaming","voxel","livecoding"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=x1Helnt3QP4",
          uploadDate: "2021-10-25",
          durationISO: "PT43M48S",
          speaker: "Mike Anderson",
          event: "Convex Live",
        },
      },
      {
        name: "Game Development - World generation on the blockchain",
        slug: "game-development-world-generation-on-the-blockchain",
        description:
          "Live-coding world generation with Perlin noise for a voxel game running on Convex.",
        longDescription:
          "A live video recording of Mike working on world generation code, with some debugging and experiments with procedural generation using Perlin Noise.\n\nThis is an early prototype of a Block Game running 100% on a decentralised blockchain. We're building this on Convex ( and those interested in the project can join our public Discord at",
        homepage: "https://www.youtube.com/watch?v=op2NccyMEBE",
        tags: ["convex-live","gaming","voxel","livecoding"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=op2NccyMEBE",
          uploadDate: "2021-10-23",
          durationISO: "PT47M34S",
          speaker: "Mike Anderson",
          event: "Convex Live",
        },
      },
      {
        name: "One Minute Convex Intro",
        slug: "one-minute-convex-intro",
        description:
          "One-minute introduction to Convex — the decentralised lattice platform.",
        homepage: "https://www.youtube.com/watch?v=V28W_TjkwrU",
        tags: ["convex-live","intro","short"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=V28W_TjkwrU",
          uploadDate: "2021-10-21",
          durationISO: "PT1M9S",
          speaker: "Mike Anderson",
          event: "Convex Live",
        },
      },
      {
        name: "How to use Convex Sandbox - Part 1",
        slug: "how-to-use-convex-sandbox-part-1",
        description:
          "Getting started with the Convex Sandbox — Part 1 of a short tutorial series.",
        longDescription:
          "Short video showcasing how easy can be getting started interacting and testing your ideas in the Convex Sandbox.",
        homepage: "https://www.youtube.com/watch?v=RpQLDyUxllM",
        tags: ["convex-live","sandbox","tutorial","short"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=RpQLDyUxllM",
          uploadDate: "2021-08-04",
          durationISO: "PT6M4S",
          speaker: "Mike Anderson",
          event: "Convex Live",
        },
      },
      {
        name: "Personal Tokens with Convex",
        slug: "personal-tokens-with-convex",
        description:
          "Personal Tokens — a three-minute rapid overview of why everyone should have their own cryptocurrency on Convex.",
        longDescription:
          "Why everyone should have their own own cryptocurrency. This is a three-minute rapid overview of our vision for Personal Tokens by Convex Founder Mike Anderson.",
        homepage: "https://www.youtube.com/watch?v=tV_FBTEx0lY",
        tags: ["convex-live","tokens","vision","short"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=tV_FBTEx0lY",
          uploadDate: "2021-07-08",
          durationISO: "PT3M3S",
          speaker: "Mike Anderson",
          event: "Convex Live",
        },
      },
      {
        name: "Convex Wallet Demo",
        slug: "convex-wallet-demo",
        description:
          "Demo of the Convex Mobile Wallet — digital currency and NFT assets in a single app.",
        longDescription:
          "Demo of the Convex Mobile Wallet App, Digital Currency and NFT assets.",
        homepage: "https://www.youtube.com/watch?v=2a40mRkcuag",
        tags: ["convex-live","wallet","demo","short"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=2a40mRkcuag",
          uploadDate: "2021-06-26",
          durationISO: "PT2M31S",
          speaker: "Mike Anderson",
          event: "Convex Live",
        },
      },
      {
        name: "Convex Pitch at UK Innovate Finance",
        slug: "convex-pitch-at-uk-innovate-finance",
        description:
          "Convex pitched at UK Innovate Finance — a quick demo of personal digital assets.",
        longDescription:
          "Quick Demo of the Convex App showcasing Personal Digital Assets. The video demonstrates how easy, quick and fun is to create your own tokens. Powered by Convex Platform, a next-generation Blockchain solution.",
        homepage: "https://www.youtube.com/watch?v=QMFrGCJsQoc",
        tags: ["convex-live","pitch","demo","short"],
        badge: "Livestream",
        video: {
          url: "https://www.youtube.com/watch?v=QMFrGCJsQoc",
          uploadDate: "2021-06-26",
          durationISO: "PT3M",
          speaker: "Mike Anderson",
          event: "Convex Live",
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
        name: 'Convex Live',
        description: 'The Convex Foundation YouTube channel — weekly community livestreams, AMAs, technical deep-dives, and demos of the lattice platform.',
        homepage: 'https://www.youtube.com/@convex-world',
        tags: ['youtube', 'video', 'livestream', 'community'],
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

