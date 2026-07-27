export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'agent' | 'rag' | 'fullstack' | 'languages' | 'devops';
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  techStack: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Multi-Agent' | 'RAG Engines' | 'Web Automation' | 'Full-Stack AI';
  subtitle: string;
  description: string;
  image: string;
  metrics: string[];
  techStack: string[];
  architecture: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'work' | 'education' | 'certification';
  highlights: string[];
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  projectType: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  popular?: boolean;
  features: string[];
  idealFor: string;
  turnaround: string;
}

export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  steps: {
    title: string;
    type: 'thought' | 'tool' | 'action' | 'output';
    detail: string;
    durationMs: number;
  }[];
  resultSummary: string;
  sampleArtifact?: string;
}

export interface UserCustomization {
  brandName: string;
  tagline: string;
  accentColor: string;
  primaryBg: string;
  targetAudience: string;
  selectedSections: string[];
}

export interface ApiKeyRecord {
  id: string;
  prefix: string;
  key_hash: string;
  name: string;
  created_at: string;
  last_used_at?: string | null;
  status: 'active' | 'revoked';
}
