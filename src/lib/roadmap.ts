export type ModuleStatus = "available" | "soon";

export interface RoadmapModule {
  slug: string;
  title: string;
  description: string;
  status: ModuleStatus;
}

export interface RoadmapPhase {
  id: number;
  title: string;
  goal: string;
  modules: RoadmapModule[];
}

/**
 * The full learning path: Phase -> Module -> Lesson.
 * Lessons are discovered from `content/<module-slug>/*.mdx`; modules marked "soon"
 * are placeholders for later phases.
 */
export const roadmap: RoadmapPhase[] = [
  {
    id: 1,
    title: "Foundations",
    goal: "How the web works, JavaScript from the inside out, TypeScript and the developer toolchain.",
    modules: [
      {
        slug: "web-foundations",
        title: "Web Foundations",
        description: "HTTP, DNS, browsers, client/server, plus terminal, Git and npm.",
        status: "available",
      },
      {
        slug: "javascript-core",
        title: "JavaScript Core",
        description: "Variables, functions, scope, closures, this and prototypes.",
        status: "available",
      },
      {
        slug: "modern-javascript",
        title: "Modern JavaScript (ES6+)",
        description:
          "Destructuring, spread, modules, promises, async/await and the event loop.",
        status: "available",
      },
      {
        slug: "browser-javascript",
        title: "JavaScript in the Browser",
        description: "DOM manipulation, events and the Fetch API.",
        status: "available",
      },
      {
        slug: "typescript-basics",
        title: "TypeScript Basics",
        description: "Types, interfaces and generics.",
        status: "available",
      },
    ],
  },
  {
    id: 2,
    title: "React & Node.js",
    goal: "Deep content for the frontend and backend pillars.",
    modules: [
      {
        slug: "react",
        title: "React",
        description: "Components, hooks, forms, routing, state management, testing.",
        status: "available",
      },
      {
        slug: "node-express",
        title: "Node.js & Express",
        description: "Runtime, REST APIs, auth, security, testing.",
        status: "available",
      },
      {
        slug: "databases",
        title: "Databases",
        description: "SQL, PostgreSQL, schema design, Prisma and a taste of MongoDB.",
        status: "soon",
      },
      {
        slug: "fullstack-integration",
        title: "Connecting Frontend & Backend",
        description: "Proxies, CORS, auth end to end and a full-stack Notes app.",
        status: "soon",
      },
    ],
  },
  {
    id: 3,
    title: "Next.js, Projects & Interview Prep",
    goal: "Tie everything together and become interview-ready.",
    modules: [
      {
        slug: "nextjs",
        title: "Next.js",
        description:
          "App Router, Server Components, rendering, Server Actions, deployment.",
        status: "soon",
      },
      {
        slug: "production",
        title: "Shipping to Production",
        description: "Docker, CI, deploying an API and database, monitoring, E2E tests.",
        status: "soon",
      },
      {
        slug: "capstone-projects",
        title: "Full Stack Capstone Projects",
        description: "A CMS, an e-commerce store and a real-time chat app.",
        status: "soon",
      },
      {
        slug: "interview-prep",
        title: "Interview Preparation",
        description: "Question banks, DSA, machine coding, behavioral and system design.",
        status: "soon",
      },
    ],
  },
];
