export interface Project {
  id: string;
  title: string;
  category: 'web-apps' | 'ecommerce' | 'ai-tools' | 'branding';
  categoryLabel: string;
  year: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  stack: string[];
  features: string[];
  architecture: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  tech: string[];
  timeline: string;
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Cloud & Edge' | 'Payments & AI';
  role: string;
  whyItMattersForClient: string;
}
