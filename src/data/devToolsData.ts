export interface DevTool {
  name: string;
  category: string;
  description: string;
  url: string;
  docsUrl: string;
  keyFeatures: string[];
}

export interface DevToolCategory {
  id: string;
  title: string;
  description: string;
  tools: DevTool[];
}

export const devToolsCategories: DevToolCategory[] = [
  {
    id: "environment",
    title: "Environment & Principles",
    description: "Foundation principles and methodologies that guide modern software development. These fundamental concepts ensure scalable, maintainable, and well-architected applications from the ground up.",
    tools: [
      {
        name: "Twelve-Factor App",
        category: "Methodology",
        description: "A methodology for building software-as-a-service applications that are portable, scalable, and maintainable in cloud environments. Provides comprehensive guidelines for modern app development.",
        url: "https://12factor.net/",
        docsUrl: "https://12factor.net/",
        keyFeatures: [
          "Cloud-native principles",
          "Scalability guidelines",
          "Configuration management",
          "Deployment best practices"
        ]
      },
      {
        name: "SOLID Principles",
        category: "Design Principles",
        description: "Five fundamental guidelines for object-oriented design that promote code maintainability, extensibility, and testability in software architecture.",
        url: "https://en.wikipedia.org/wiki/SOLID",
        docsUrl: "https://en.wikipedia.org/wiki/SOLID",
        keyFeatures: [
          "Single Responsibility Principle",
          "Open/Closed Principle",
          "Liskov Substitution Principle",
          "Interface Segregation Principle"
        ]
      },
      {
        name: "Code Calisthenics",
        category: "Coding Standards",
        description: "A set of programming exercises and rules designed to improve code quality, readability, and maintainability through disciplined coding practices.",
        url: "https://www.codingdojo.org/code-calisthenics/",
        docsUrl: "https://www.codingdojo.org/code-calisthenics/",
        keyFeatures: [
          "Code quality improvement",
          "Readability enhancement",
          "Disciplined coding practices",
          "Maintainability focus"
        ]
      }
    ]
  },
  {
    id: "core-stack",
    title: "Core Development Stack",
    description: "Essential tools and technologies that form the backbone of modern web development. From runtime environments to frontend frameworks, these tools enable full-stack application development.",
    tools: [
      {
        name: "Node.js",
        category: "Runtime",
        description: "JavaScript runtime built on Chrome's V8 engine that enables server-side JavaScript development with excellent performance for I/O-intensive operations.",
        url: "https://nodejs.org/",
        docsUrl: "https://nodejs.org/docs/",
        keyFeatures: [
          "Event-driven architecture",
          "Non-blocking I/O",
          "Large ecosystem (npm)",
          "Cross-platform support"
        ]
      },
      {
        name: "NPM / NPX",
        category: "Package Manager",
        description: "Node Package Manager and executor providing access to over a million packages, dependency management, and script automation for JavaScript projects.",
        url: "https://www.npmjs.com/",
        docsUrl: "https://docs.npmjs.com/",
        keyFeatures: [
          "Package management",
          "Dependency resolution",
          "Script automation",
          "Execute without installation"
        ]
      },
      {
        name: "React",
        category: "Frontend Framework",
        description: "A JavaScript library for building user interfaces with a component-based architecture that makes building complex UIs more manageable and maintainable.",
        url: "https://react.dev/",
        docsUrl: "https://react.dev/learn",
        keyFeatures: [
          "Component-based architecture",
          "Virtual DOM for performance",
          "Extensive ecosystem",
          "Strong community support"
        ]
      },
      {
        name: "Vite",
        category: "Build Tool",
        description: "Next-generation build tooling that prioritizes developer experience through incredibly fast development servers and optimized production builds.",
        url: "https://vitejs.dev/",
        docsUrl: "https://vitejs.dev/guide/",
        keyFeatures: [
          "Lightning-fast development server",
          "Hot module replacement",
          "Framework-agnostic",
          "Optimized production builds"
        ]
      },
      {
        name: "Tailwind CSS",
        category: "Frontend Styling",
        description: "Utility-first CSS framework for consistent design systems, enabling rapid UI development with responsive design utilities and automatic CSS optimization.",
        url: "https://tailwindcss.com/",
        docsUrl: "https://tailwindcss.com/docs",
        keyFeatures: [
          "Utility-first approach",
          "Consistent design system",
          "Automatic CSS optimization",
          "Responsive design utilities"
        ]
      },
      {
        name: "Quest AI",
        category: "Design to Code",
        description: "No-code platform that automatically converts designs from Figma and Adobe XD into pixel-perfect, launch-ready React components, accelerating the design-to-development workflow.",
        url: "https://www.quest.ai/",
        docsUrl: "https://docs.quest.ai/",
        keyFeatures: [
          "Figma to React conversion",
          "Adobe XD to web pages",
          "No-code development",
          "Responsive components"
        ]
      },
      {
        name: "Drizzle ORM",
        category: "ORM",
        description: "A lightweight and performant TypeScript ORM with a focus on developer experience, type safety, and SQL-like syntax for database operations.",
        url: "https://orm.drizzle.team/",
        docsUrl: "https://orm.drizzle.team/docs/overview",
        keyFeatures: [
          "Type-safe database operations",
          "SQL-like syntax",
          "Lightweight and performant",
          "Excellent TypeScript support"
        ]
      },
      {
        name: "PostgreSQL",
        category: "Database",
        description: "Advanced open-source relational database system offering enterprise-grade features, ACID compliance, and extensive SQL standard support.",
        url: "https://www.postgresql.org/",
        docsUrl: "https://www.postgresql.org/docs/",
        keyFeatures: [
          "ACID compliance",
          "Advanced SQL features",
          "Extensible architecture",
          "JSON support"
        ]
      },
      {
        name: "Supabase",
        category: "BaaS",
        description: "Open-source Firebase alternative built on PostgreSQL, providing authentication, real-time subscriptions, edge functions, and file storage.",
        url: "https://supabase.com/",
        docsUrl: "https://supabase.com/docs",
        keyFeatures: [
          "Real-time subscriptions",
          "Built-in authentication",
          "Edge functions",
          "Open-source"
        ]
      }
    ]
  },
  {
    id: "configuration",
    title: "Configuration, Security & Environment",
    description: "Critical tools for managing application configuration, security, and environment setup. These ensure secure, flexible, and maintainable deployments across different environments.",
    tools: [
      {
        name: "Environment Variables",
        category: "Configuration",
        description: "Configuration management approach that stores config in environment variables, following twelve-factor app principles for secure and flexible deployments.",
        url: "https://12factor.net/config",
        docsUrl: "https://12factor.net/config",
        keyFeatures: [
          "Secure configuration storage",
          "Environment-specific settings",
          "Twelve-factor compliance",
          "Deployment flexibility"
        ]
      },
      {
        name: "JWT (JSON Web Token)",
        category: "Authentication",
        description: "Compact, self-contained method for securely transmitting information between parties, enabling stateless authentication in distributed systems.",
        url: "https://jwt.io/",
        docsUrl: "https://jwt.io/introduction",
        keyFeatures: [
          "Stateless authentication",
          "Self-contained tokens",
          "Cross-domain support",
          "Secure transmission"
        ]
      },
      {
        name: "SSH",
        category: "Remote Access",
        description: "Cryptographic network protocol for secure remote access, file transfer, and command execution, essential for server administration and deployment.",
        url: "https://www.ssh.com/academy/ssh",
        docsUrl: "https://www.ssh.com/academy/ssh/protocol",
        keyFeatures: [
          "Encrypted communication",
          "Key-based authentication",
          "Port forwarding",
          "Secure file transfer"
        ]
      },
      {
        name: "API Tokens",
        category: "Authentication",
        description: "Digital credentials for API and GitHub authentication, providing secure access control and authorization for various services and platforms.",
        url: "https://docs.github.com/en/authentication",
        docsUrl: "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens",
        keyFeatures: [
          "Secure API access",
          "Fine-grained permissions",
          "Token lifecycle management",
          "Service integration"
        ]
      },
      {
        name: ".dockerignore",
        category: "Configuration",
        description: "Configuration file that specifies files and directories to exclude from Docker build context, optimizing build performance and security.",
        url: "https://docs.docker.com/engine/reference/builder/#dockerignore-file",
        docsUrl: "https://docs.docker.com/engine/reference/builder/#dockerignore-file",
        keyFeatures: [
          "Build optimization",
          "Security enhancement",
          "Context size reduction",
          "Performance improvement"
        ]
      },
      {
        name: ".gitignore",
        category: "Version Control",
        description: "Configuration file that specifies intentionally untracked files for Git to ignore, maintaining clean repositories and preventing sensitive data commits.",
        url: "https://git-scm.com/docs/gitignore",
        docsUrl: "https://git-scm.com/docs/gitignore",
        keyFeatures: [
          "Repository hygiene",
          "Security protection",
          "Performance optimization",
          "Team coordination"
        ]
      }
    ]
  },
  {
    id: "testing",
    title: "Testing & Quality Assurance",
    description: "Comprehensive testing tools that ensure application reliability and quality. From unit tests to end-to-end scenarios, with AI-powered solutions for automated testing workflows.",
    tools: [
      {
        name: "Cypress",
        category: "E2E Testing",
        description: "End-to-end testing framework that runs directly in the browser, providing reliable tests with excellent debugging capabilities and developer experience.",
        url: "https://www.cypress.io/",
        docsUrl: "https://docs.cypress.io/",
        keyFeatures: [
          "Browser-based testing",
          "Time-travel debugging",
          "Automatic screenshots",
          "Real-time reloading"
        ]
      },
      {
        name: "Playwright",
        category: "Cross-Browser Testing",
        description: "Cross-browser testing framework supporting Chromium, Firefox, and WebKit with powerful automation capabilities and reliable test execution.",
        url: "https://playwright.dev/",
        docsUrl: "https://playwright.dev/docs/intro",
        keyFeatures: [
          "Cross-browser support",
          "Auto-waiting capabilities",
          "Network interception",
          "Parallel execution"
        ]
      },
      {
        name: "Vitest",
        category: "Unit Testing",
        description: "A blazing fast unit testing framework powered by Vite, providing native ES modules support and excellent TypeScript integration.",
        url: "https://vitest.dev/",
        docsUrl: "https://vitest.dev/guide/",
        keyFeatures: [
          "Vite-powered performance",
          "Native ES modules",
          "TypeScript support",
          "Jest compatibility"
        ]
      },
      {
        name: "TestSprite",
        category: "AI Testing",
        description: "AI-powered testing platform that automates test creation, execution, and maintenance using MCP (Model Context Protocol) for intelligent testing workflows.",
        url: "https://testsprite.com/",
        docsUrl: "https://testsprite.com/docs",
        keyFeatures: [
          "AI-generated tests",
          "MCP integration",
          "Automated maintenance",
          "Intelligent analysis"
        ]
      }
    ]
  },
  {
    id: "ai-assistants",
    title: "AI & Development Assistants",
    description: "Cutting-edge AI tools that revolutionize software development through intelligent code generation, automated reviews, and comprehensive development assistance.",
    tools: [
      {
        name: "GPT-5 (OpenAI)",
        category: "AI Assistant",
        description: "Advanced language model offering sophisticated code generation, debugging assistance, and technical documentation capabilities with multimodal support.",
        url: "https://openai.com/",
        docsUrl: "https://platform.openai.com/docs",
        keyFeatures: [
          "Advanced code generation",
          "Multimodal capabilities",
          "Debugging assistance",
          "Technical documentation"
        ]
      },
      {
        name: "Claude (Anthropic)",
        category: "Conversational AI",
        description: "Conversational AI assistant for development tasks, offering natural language interaction for architecture discussions and problem-solving approaches.",
        url: "https://www.anthropic.com/",
        docsUrl: "https://docs.anthropic.com/",
        keyFeatures: [
          "Natural conversation",
          "Context awareness",
          "Educational support",
          "Collaborative development"
        ]
      },
      {
        name: "Gemini (Google)",
        category: "Multimodal AI",
        description: "Google's multimodal AI assistant that works with text, code, images, and other media types to provide comprehensive development assistance.",
        url: "https://gemini.google.com/",
        docsUrl: "https://ai.google.dev/",
        keyFeatures: [
          "Multimodal capabilities",
          "Google ecosystem integration",
          "Cross-media understanding",
          "Full-stack development support"
        ]
      },
      {
        name: "GitHub Copilot",
        category: "AI Extension",
        description: "AI pair programmer that works directly in your editor, suggesting whole lines or entire functions as you code. Provides contextual assistance, code completion, explanations, and can act as a coding agent for task implementation.",
        url: "https://github.com/features/copilot",
        docsUrl: "https://docs.github.com/en/copilot",
        keyFeatures: [
          "AI-powered code suggestions",
          "Contextual assistance",
          "Code explanations",
          "Multi-IDE integration"
        ]
      },
      {
        name: "Cursor",
        category: "AI IDE",
        description: "AI-first code editor built on VS Code that integrates AI deeply into the development workflow with intelligent code completion and chat.",
        url: "https://cursor.sh/",
        docsUrl: "https://docs.cursor.sh/",
        keyFeatures: [
          "AI-powered code editor",
          "Context-aware suggestions",
          "Codebase chat",
          "VS Code compatible"
        ]
      },
      {
        name: "Cline",
        category: "AI Extension",
        description: "Open-source AI coding agent that integrates with VS Code and JetBrains IDEs. Provides autonomous coding capabilities, intelligent code suggestions, auto-completions, and in-line documentation with direct access to frontier AI models.",
        url: "https://github.com/cline/cline",
        docsUrl: "https://github.com/cline/cline#readme",
        keyFeatures: [
          "Autonomous coding agent",
          "AI-powered code suggestions",
          "In-line documentation",
          "Open-source"
        ]
      },
      {
        name: "Amazon Q",
        category: "AI Assistant",
        description: "Generative AI assistant from AWS designed for software developers and business users. Amazon Q Developer helps understand, build, extend, and operate applications and workloads on AWS with intelligent code generation and debugging assistance.",
        url: "https://aws.amazon.com/q/",
        docsUrl: "https://docs.aws.amazon.com/amazonq/",
        keyFeatures: [
          "AWS-focused development assistance",
          "Code generation and debugging",
          "Conversational AI capabilities",
          "AWS services integration"
        ]
      }
    ]
  },
  {
    id: "deployment",
    title: "Deployment & Delivery",
    description: "Modern deployment and hosting solutions that enable reliable, scalable application delivery. From version control to cloud platforms, covering the complete deployment pipeline.",
    tools: [
      {
        name: "GitHub",
        category: "Version Control",
        description: "Collaborative development platform providing code hosting, pull requests, issue tracking, and project management tools for modern software development.",
        url: "https://github.com/",
        docsUrl: "https://docs.github.com/",
        keyFeatures: [
          "Code collaboration",
          "Pull request workflow",
          "Issue tracking",
          "CI/CD integration"
        ]
      },
      {
        name: "Vercel",
        category: "Frontend Hosting",
        description: "Frontend hosting platform optimized for React, Next.js, and modern frameworks with automatic deployments and edge network optimization.",
        url: "https://vercel.com/",
        docsUrl: "https://vercel.com/docs",
        keyFeatures: [
          "Automatic deployments",
          "Edge network",
          "Framework optimization",
          "Developer experience"
        ]
      },
      {
        name: "Heroku",
        category: "PaaS",
        description: "Platform-as-a-service focusing on developer experience and simplicity, enabling rapid application development and deployment with minimal overhead.",
        url: "https://www.heroku.com/",
        docsUrl: "https://devcenter.heroku.com/",
        keyFeatures: [
          "Simple deployment",
          "Add-on ecosystem",
          "Automatic scaling",
          "Developer-friendly"
        ]
      },
      {
        name: "Render",
        category: "Cloud Hosting",
        description: "Full-stack hosting platform providing unified cloud services for both frontend and backend applications with enterprise-grade reliability.",
        url: "https://render.com/",
        docsUrl: "https://render.com/docs",
        keyFeatures: [
          "Full-stack hosting",
          "Automatic deployments",
          "Enterprise reliability",
          "Unified platform"
        ]
      },
      {
        name: "AWS S3",
        category: "Cloud Storage",
        description: "Scalable object storage service that provides reliable storage for static assets, user uploads, and backup data with global infrastructure.",
        url: "https://aws.amazon.com/s3/",
        docsUrl: "https://docs.aws.amazon.com/s3/",
        keyFeatures: [
          "Scalable object storage",
          "Global infrastructure",
          "Security features",
          "Cost optimization"
        ]
      },
      {
        name: "Cloudflare",
        category: "CDN & Security",
        description: "Web infrastructure platform providing content delivery, security protection, and edge computing services for enhanced performance and reliability.",
        url: "https://www.cloudflare.com/",
        docsUrl: "https://developers.cloudflare.com/",
        keyFeatures: [
          "Global CDN",
          "DDoS protection",
          "Edge computing",
          "Performance optimization"
        ]
      },
      {
        name: "Microsoft Azure",
        category: "Cloud Platform",
        description: "Comprehensive cloud computing platform offering infrastructure, platform, and software services with extensive enterprise integrations.",
        url: "https://azure.microsoft.com/",
        docsUrl: "https://docs.microsoft.com/azure/",
        keyFeatures: [
          "Comprehensive cloud services",
          "Enterprise integration",
          "Hybrid cloud support",
          "Global infrastructure"
        ]
      }
    ]
  },
  {
    id: "monitoring",
    title: "Monitoring & Communication",
    description: "Essential tools for application monitoring, error tracking, and team communication. These ensure application health and enable effective team collaboration.",
    tools: [
      {
        name: "Sentry",
        category: "Error Monitoring",
        description: "Application monitoring platform that provides real-time error tracking, performance monitoring, and release health insights for web applications.",
        url: "https://sentry.io/",
        docsUrl: "https://docs.sentry.io/",
        keyFeatures: [
          "Real-time error tracking",
          "Performance monitoring",
          "Release health insights",
          "Issue prioritization"
        ]
      },
      {
        name: "Resend",
        category: "Email Service",
        description: "Modern email API service designed for developers, providing reliable transactional email delivery with excellent developer experience.",
        url: "https://resend.com/",
        docsUrl: "https://resend.com/docs",
        keyFeatures: [
          "Transactional email delivery",
          "Developer-friendly API",
          "Email analytics",
          "Template management"
        ]
      }
    ]
  },
  {
    id: "project-management",
    title: "Project Management & Workflow",
    description: "Tools that streamline project management, task tracking, and team collaboration. From issue tracking to documentation, these tools organize and optimize development workflows.",
    tools: [
      {
        name: "Linear",
        category: "Project Management",
        description: "Modern project management and issue tracking tool designed for software development teams, focusing on speed and simplicity.",
        url: "https://linear.app/",
        docsUrl: "https://linear.app/docs",
        keyFeatures: [
          "Issue tracking",
          "Project planning",
          "Team collaboration",
          "Development workflow integration"
        ]
      },
      {
        name: "GitHub Projects",
        category: "Task Management",
        description: "GitHub's built-in project management feature that allows creating and tracking tasks within issues and pull requests for better project organization.",
        url: "https://github.com/features/issues",
        docsUrl: "https://docs.github.com/en/issues",
        keyFeatures: [
          "Task tracking",
          "Issue integration",
          "Progress visualization",
          "Team coordination"
        ]
      }
    ]
  },
  {
    id: "terminals",
    title: "Terminals & Utilities",
    description: "Modern development utilities and terminal applications that enhance developer productivity and provide superior command-line experiences.",
    tools: [
      {
        name: "Warp Terminal",
        category: "Terminal",
        description: "Modern terminal application with AI assistance, block-based interface, and collaborative features that enhance command-line productivity.",
        url: "https://www.warp.dev/",
        docsUrl: "https://docs.warp.dev/",
        keyFeatures: [
          "AI-powered assistance",
          "Block-based interface",
          "Collaborative terminals",
          "Modern UI/UX"
        ]
      }
    ]
  }
];

export const learningPaths = [
  {
    title: "Foundation principles and methodologies",
    description: "for scalable development"
  },
  {
    title: "Core development stack",
    description: "from Node.js to React and modern build tools"
  },
  {
    title: "Configuration, security, and environment",
    description: "management best practices"
  },
  {
    title: "Comprehensive testing strategies",
    description: "with AI-powered automation"
  },
  {
    title: "Modern AI assistants",
    description: "and development acceleration tools"
  },
  {
    title: "Complete deployment pipeline",
    description: "from version control to production"
  }
];
