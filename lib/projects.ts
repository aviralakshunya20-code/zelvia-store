import { Project, Service, TechItem } from './types';

export const FOUNDER_INFO = {
  name: 'Aviral',
  brandName: 'Online Measurer',
  role: 'Lead Full-Stack Web Architect & Systems Engineer',
  tagline: 'Engineering high-performance web applications and digital platforms for modern businesses.',
  email: 'aviralakshunya20@gmail.com',
  github: 'https://github.com/aviralakshunya20-code',
  githubUrl: 'https://github.com/aviralakshunya20-code',
  whatsappUrl: 'https://wa.me/?text=Hi%20Aviral,%20I%20saw%20Online%20Measurer%20and%20I%20want%20to%20discuss%20a%20website/webapp%20project%20for%20my%20business.',
  location: 'India (Serving Global Clients)',
  status: 'Accepting Projects for Q2/Q3',
  philosophy: 'Zero manufactured hype. No fake reviews. Point-to-point code, 100/100 performance, and real business results.',
};

export const PROJECTS: Project[] = [
  {
    id: 'zelvia-store',
    title: 'Zelvia Store',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce Platform',
    year: '2025 – 2026',
    tagline: 'Ultra-fast headless luxury e-commerce with real-time checkout and sub-second cart sync.',
    description:
      'A high-performance modern e-commerce storefront engineered for high conversion rates. Features instantaneous product filtering, an interactive slide-over cart drawer, and frictionless checkout integration.',
    problem:
      'Standard template stores (Shopify/WooCommerce) suffer from code bloat, high bounce rates on mobile, and latency spikes during peak checkout traffic.',
    solution:
      'Architected a custom headless Next.js 16 storefront utilizing Edge caching, client-side optimistic UI state, Stripe Elements integration, and 100% strict TypeScript.',
    metrics: [
      { label: 'Lighthouse Score', value: '99', sublabel: 'Performance & SEO' },
      { label: 'First Contentful Paint', value: '0.38s', sublabel: 'Instantaneous paint' },
      { label: 'Checkout Drop-off', value: '-34%', sublabel: 'Streamlined 1-tap UX' },
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Stripe API', 'Vercel Edge'],
    features: [
      'Zero-layout-shift responsive catalog grid with dynamic variant pickers',
      'Optimistic cart drawer with instant quantity increments and discount calculation',
      'PCI-compliant tokenized payment flow with Apple Pay, Google Pay & Card inputs',
      'Sub-50ms Edge API response times via CDN caching',
      'Accessible WCAG AA keyboard-navigable interface',
    ],
    architecture: [
      'Next.js 16 App Router with Server-Side Component rendering for static catalogs',
      'Optimistic state synchronization with persistent client localStorage & Session store',
      'Server Actions for atomic inventory checks and secure payment intent creation',
      'Edge deployment across multi-region serverless nodes',
    ],
    githubUrl: 'https://github.com/aviralakshunya20-code/zelvia-store',
    featured: true,
  },
  {
    id: 'onlinemeasurer-ai',
    title: 'OnlineMeasurer AI',
    category: 'ai-tools',
    categoryLabel: 'Multimodal AI System',
    year: '2026',
    tagline: 'Real-time computer vision analysis engine with multimodal Gemini integration.',
    description:
      'A browser-native AI application that processes live camera streams and high-resolution photos to identify items, compute precise nutritional metrics, and log telemetry with zero privacy risk.',
    problem:
      'Existing analysis tools require slow manual input forms, send raw customer media to insecure third-party servers, and have slow turnaround times.',
    solution:
      'Engineered an edge-first computer vision pipeline using Gemini Vision API with client-side canvas pre-processing, WebRTC camera feeds, and 100% zero-retention photo handling.',
    metrics: [
      { label: 'Inference Speed', value: '1.4s', sublabel: 'Multimodal response' },
      { label: 'Data Retention', value: '0%', sublabel: 'Pure client-side privacy' },
      { label: 'Recognition Accuracy', value: '96.2%', sublabel: 'Verified test suite' },
    ],
    stack: ['Next.js 16', 'TypeScript', 'Google Gemini Vision API', 'WebRTC', 'IndexedDB', 'Tailwind CSS'],
    features: [
      'Live camera scanner with automatic aspect ratio correction & flash control',
      'Real-time macro nutrient breakdown and visual component identification',
      'Offline-first synchronization using browser IndexedDB storage',
      'High-contrast accessible telemetry dashboard with custom SVG dials',
    ],
    architecture: [
      'Client-side HTML5 Canvas compression reducing payload size by 85%',
      'Encrypted streaming API endpoint calling Google Gemini Vision model',
      'Strict schema validation ensuring structured JSON response guarantees',
      'Local persistence with zero backend storage of sensitive user images',
    ],
    liveUrl: 'https://onlinemeasurer.com',
    featured: true,
  },
  {
    id: 'apex-crm-dashboard',
    title: 'Apex Operations & Telemetry',
    category: 'web-apps',
    categoryLabel: 'Enterprise Web Application',
    year: '2025',
    tagline: 'High-density real-time SaaS command center with keyboard navigation & live socket feeds.',
    description:
      'A full-stack business operational dashboard built for founders and teams to monitor revenue, customer pipelines, and live server telemetry without page refreshes.',
    problem:
      'Off-the-shelf business management software is often bloated, confusing to navigate, and too slow for fast-moving teams who require instant data updates.',
    solution:
      'Designed and engineered an ultra-minimalist, high-density dark mode dashboard featuring ⌘K command palettes, WebSocket live feeds, and sub-30ms database queries.',
    metrics: [
      { label: 'Render Rate', value: '60 FPS', sublabel: 'Hardware accelerated charts' },
      { label: 'Query Latency', value: '28ms', sublabel: 'Indexed PostgreSQL queries' },
      { label: 'Time Saved / Day', value: '45m', sublabel: 'Via keyboard shortcuts' },
    ],
    stack: ['Next.js', 'React 19', 'TypeScript', 'PostgreSQL', 'WebSockets', 'Tailwind CSS'],
    features: [
      'Global ⌘K command bar for instant search across customers, invoices, and metrics',
      'Real-time WebSocket event bus pushing live business telemetry',
      'Role-based access control (RBAC) with granular admin/member permissions',
      'Exportable reporting engines (CSV, PDF, JSON) generated asynchronously',
    ],
    architecture: [
      'Layered architecture: Presentation, Domain Services, and Data Access Layer',
      'Connection pooling with Prisma & PostgreSQL on high-availability cloud clusters',
      'JWT session management with HTTP-only rotation cookies',
    ],
    featured: true,
  },
  {
    id: 'monolith-branding',
    title: 'Monolith Engineering Site',
    category: 'branding',
    categoryLabel: 'High-Impact Brand Presence',
    year: '2025 – 2026',
    tagline: 'Bespoke black & white corporate web experience engineered for high-ticket client conversion.',
    description:
      'An architectural, razor-sharp digital portfolio and business landing page built to position high-value agencies at the peak of their industry.',
    problem:
      'Generic corporate templates make businesses look indistinguishable from their cheaper competitors, eroding trust and lowering closed deal sizes.',
    solution:
      'Built a custom, hyper-polished black-and-white design system with micro-interactions, responsive typographic scales, and instant lead capture forms.',
    metrics: [
      { label: 'Core Web Vitals', value: '100/100', sublabel: 'Flawless audit' },
      { label: 'Lead Conversion', value: '+42%', sublabel: 'Point-to-point inquiry funnel' },
      { label: 'Bundle Size', value: '< 45KB', sublabel: 'Zero external CSS bloat' },
    ],
    stack: ['Next.js 16', 'TypeScript', 'Vanilla CSS', 'Tailwind CSS', 'Edge Functions'],
    features: [
      'Pure monochrome aesthetic with subtle depth layers and micro-glow highlights',
      'Interactive scope builder and price estimator for frictionless client onboarding',
      'Direct one-click contact integration with auto-formatted messages',
      'Zero layout shift, 100% responsive down to 320px mobile screens',
    ],
    architecture: [
      'Fully static pre-rendering (SSG) with ISR revalidation',
      'Optimized font sub-setting and inline SVG sprite optimization',
      'Automated email notifications via transactional webhooks',
    ],
    featured: false,
  },
];

export const SERVICES: Service[] = [
  {
    id: 'web-apps',
    number: '01',
    title: 'Full-Stack Web Applications',
    tagline: 'Turn your complex business workflows into fast, reliable software.',
    description:
      'I architect and build end-to-end web applications—from user authentication and database models to intuitive, reactive user interfaces that your customers and team love using.',
    deliverables: [
      'Custom SaaS & business portals',
      'User authentication & Role-Based Access Control (RBAC)',
      'Database schema design (PostgreSQL / Supabase)',
      'API design, webhooks, and third-party integrations',
      'Admin command centers & operational dashboards',
    ],
    idealFor: 'Founders, startups, and growing companies needing custom business software.',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL', 'Node.js', 'Tailwind CSS'],
    timeline: '2 – 4 Weeks typical turnaround',
  },
  {
    id: 'ecommerce',
    number: '02',
    title: 'High-Converting E-Commerce',
    tagline: 'Fast, bespoke shopping experiences built to maximize revenue.',
    description:
      'Ditch clunky, slow e-commerce templates. I engineer lightning-fast custom stores with instant cart updates, one-tap mobile checkout, and high conversion design patterns.',
    deliverables: [
      'Headless custom storefront design & code',
      'Frictionless slide-over cart with instant totals',
      'Secure payment gateway integration (Stripe, Razorpay, etc.)',
      'Inventory, order management & customer account flows',
      'Sub-second mobile checkout speed',
    ],
    idealFor: 'Direct-to-consumer brands, premium retailers, and product businesses.',
    tech: ['Next.js', 'Stripe Elements', 'TypeScript', 'Tailwind CSS', 'Server Actions'],
    timeline: '2 – 3 Weeks typical turnaround',
  },
  {
    id: 'brand-websites',
    number: '03',
    title: 'High-Impact Business Websites',
    tagline: 'Websites that establish authority and convert visitors into paying clients.',
    description:
      'Your website is your best salesperson. I build bespoke, aesthetic, point-to-point websites that communicate your business value immediately without corporate filler.',
    deliverables: [
      'Bespoke, brand-aligned visual design system',
      '100/100 Google Lighthouse Core Web Vitals score',
      'Conversion-focused copywriting structure & clear CTAs',
      'Interactive cost calculators & project estimator widgets',
      'Full SEO technical setup, sitemaps, and metadata',
    ],
    idealFor: 'Agencies, consultants, high-ticket service providers, and local businesses.',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vercel Edge'],
    timeline: '7 – 14 Days typical turnaround',
  },
  {
    id: 'ai-automation',
    number: '04',
    title: 'Custom AI & Workflow Tools',
    tagline: 'Automate repetitive tasks with custom LLM and computer vision pipelines.',
    description:
      'Integrate modern AI capabilities directly into your business operations. From intelligent document/image processing to automated customer handling.',
    deliverables: [
      'Multimodal AI image/document analysis pipelines',
      'Custom LLM integrations (Gemini, Claude, OpenAI)',
      'Automated data ingestion and report generation',
      'Internal efficiency tools and automated bots',
    ],
    idealFor: 'Businesses looking to cut manual operational hours with modern AI.',
    tech: ['Gemini API', 'TypeScript', 'Edge Handlers', 'WebSockets', 'Python/Node'],
    timeline: '1 – 3 Weeks typical turnaround',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Scope & Technical Spec',
    duration: 'Day 1 – 2',
    description:
      'No endless 2-hour meetings. We identify your core business goals, define the exact feature set, select the ideal tech stack, and agree on a fixed timeline.',
  },
  {
    step: '02',
    title: 'Architecture & Prototype',
    duration: 'Day 3 – 5',
    description:
      'We finalize database structures, API routes, and high-fidelity interactive user flows. You get a clear visual representation of every screen before code is locked.',
  },
  {
    step: '03',
    title: 'Rapid Engineering & Live Staging',
    duration: 'Week 1 – 3',
    description:
      'Code is written with strict TypeScript, clean architecture, and extreme performance. You receive a private live staging URL to test updates in real-time.',
  },
  {
    step: '04',
    title: 'Zero-Downtime Deployment & Handover',
    duration: 'Launch Day',
    description:
      'We deploy to your custom domain on a global edge CDN, optimize caching, verify 100/100 Core Web Vitals, and hand over full repository ownership.',
  },
];

export const TECH_STACK: TechItem[] = [
  {
    name: 'Next.js 16 (App Router)',
    category: 'Frontend',
    role: 'Full-Stack Framework',
    whyItMattersForClient: 'Provides instantaneous page transitions, perfect SEO, and sub-50ms server response.',
  },
  {
    name: 'React 19',
    category: 'Frontend',
    role: 'UI Engine',
    whyItMattersForClient: 'Allows smooth, reactive, app-like interfaces without stuttering or full-page refreshes.',
  },
  {
    name: 'TypeScript (Strict)',
    category: 'Frontend',
    role: 'Type Safety & Stability',
    whyItMattersForClient: 'Eliminates 95% of common runtime bugs before code ever reaches production.',
  },
  {
    name: 'Tailwind CSS & Vanilla CSS',
    category: 'Frontend',
    role: 'Styling Architecture',
    whyItMattersForClient: 'Zero design framework bloat. Razor-sharp, custom-branded black & white aesthetic.',
  },
  {
    name: 'PostgreSQL & Supabase',
    category: 'Database',
    role: 'Data Persistence',
    whyItMattersForClient: 'Industrial-grade relational database guaranteeing data integrity and lightning-fast queries.',
  },
  {
    name: 'Stripe & Razorpay',
    category: 'Payments & AI',
    role: 'Secure Billing',
    whyItMattersForClient: 'Friction-free, PCI-compliant payment flows that protect client revenue and customer trust.',
  },
  {
    name: 'Google Gemini & LLMs',
    category: 'Payments & AI',
    role: 'Multimodal AI Engines',
    whyItMattersForClient: 'Empowers web apps with intelligent photo processing and automated natural-language workflows.',
  },
  {
    name: 'Vercel Global Edge Network',
    category: 'Cloud & Edge',
    role: 'Infrastructure & CDN',
    whyItMattersForClient: 'Guarantees 99.99% uptime with servers located in 300+ edge locations worldwide.',
  },
];
