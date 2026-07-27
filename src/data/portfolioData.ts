import { Service, Project, Experience, Testimonial, PricingPlan, AgentTemplate } from '../types';
import profileAvatar from '../assets/images/ali_profile_avatar_1784809209294.jpg';
import agenticCover from '../assets/images/agentic_workflow_cover_1784809228167.jpg';
import ragCover from '../assets/images/rag_system_cover_1784809247211.jpg';
import b2bQuotationCover from '../assets/images/b2b_quotation_n8n_agent_1784957895903.jpg';

export const PERSONAL_INFO = {
  name: 'Ali Ahsan',
  brandName: 'Ali Ahsan',
  title: 'AI Agent Architect & Autonomous Systems Developer',
  email: 'aliahsan5031@gmail.com',
  phone: '+923098200159',
  whatsapp: '+923098200159',
  location: 'Available Worldwide',
  avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQGZ049LQUJqqg/profile-displayphoto-crop_800_800/B4DZ5P.GonHAAI-/0/1779458143041?e=1786579200&v=beta&t=_Y0wLwkON96wGEIY9g6gIjC7fwETYAIX09-pJDNtJeU',
  status: 'Available for Freelance & AI Consultations',
  bio: 'Expert AI Systems Architect specializing in autonomous multi-agent orchestration, custom RAG search pipelines, self-healing web scrapers, and enterprise tool-calling AI workflows. I help businesses automate complex cognitive operations and cut operational costs by up to 85%.',
  stats: [
    { label: 'Autonomous Agents Built', value: '50+' },
    { label: 'Execution Reliability', value: '99.8%' },
    { label: 'Hours Saved for Clients', value: '12,500+' },
    { label: 'Enterprise Deployments', value: '35+' },
  ],
  languages: [
    { name: 'English', level: 'Native / Fluent' },
    { name: 'Urdu', level: 'Native' },
  ],
  socials: {
    github: 'https://github.com/AliAhsan5031',
    linkedin: 'https://www.linkedin.com/in/ali-ahsan-7308b033b/',
    fiverr: 'https://www.fiverr.com/s/7YR4Vlk',
    whatsapp: 'https://wa.me/923098200159',
    email: 'mailto:aliahsan5031@gmail.com',
  },
};

export const RADIAL_SKILLS = [
  { name: 'Multi-Agent Teams (CrewAI/AutoGen)', percentage: 98 },
  { name: 'RAG & Vector Databases', percentage: 95 },
  { name: 'Full-Stack AI Apps (React/FastAPI)', percentage: 93 },
  { name: 'Autonomous Web Scraping & RPA', percentage: 96 },
];

export const LINEAR_SKILLS = [
  { name: 'Python & LangChain / LangGraph', percentage: 98 },
  { name: 'Gemini 2.5/3.6 & OpenAI API Integration', percentage: 96 },
  { name: 'Prompt Engineering & Fine-tuning', percentage: 92 },
];

export const SERVICES: Service[] = [
  {
    id: 'multi-agent-orchestration',
    title: 'Multi-Agent Team Architecture',
    shortDesc: 'Design and deploy collaborative AI agent teams that execute multi-step workflows autonomously.',
    fullDesc: 'We architect hierarchical multi-agent teams where specialist AI agents (Researcher, Writer, Reviewer, Auditor) communicate, validate each other’s work, and execute complex workflows without human intervention.',
    iconName: 'Bot',
    features: [
      'Hierarchical agent role & task delegation',
      'Self-correcting feedback loops & validation',
      'Human-in-the-loop approval checkpoints',
      'Stateful memory & persistent context windows',
    ],
    deliverables: [
      'Production-ready agent framework codebase',
      'Dockerized microservices & API endpoints',
      'Monitoring dashboard & error log alerts',
      'Comprehensive architecture documentation',
    ],
    techStack: ['Python', 'CrewAI', 'LangGraph', 'n8n', 'FastAPI', 'Redis'],
  },
  {
    id: 'rag-knowledge-engines',
    title: 'Custom RAG & Semantic Knowledge Engines',
    shortDesc: 'Transform enterprise documents into high-precision, hallucination-resistant vector search engines.',
    fullDesc: 'Build high-precision Retrieval-Augmented Generation (RAG) engines utilizing hybrid keyword/semantic search, query rewriting, reranking, and citation tracking across millions of internal documents.',
    iconName: 'Database',
    features: [
      'Hybrid Dense + Sparse Vector Search',
      'Automated document ingestion & chunking pipelines',
      'Cross-Encoder reranking for 99%+ context accuracy',
      'Hallucination prevention & source grounding',
    ],
    deliverables: [
      'Vector DB cluster setup (Pinecone/Qdrant/PGVector)',
      'Document processing API endpoint',
      'Interactive chat & semantic search interface',
      'Benchmarking & recall test suite',
    ],
    techStack: ['Embedding', 'Vector Database', 'NLP', 'Tokenization'],
  },
  {
    id: 'autonomous-web-scraping',
    title: 'Autonomous Web Scraping & AI RPA',
    shortDesc: 'AI-powered web automation tools that extract structured data and bypass anti-bot shields.',
    fullDesc: 'Stop worrying about broken web scrapers. Our AI web scrapers adapt dynamically to website layout changes, navigate multi-step forms, and clean messy HTML into validated structured data.',
    iconName: 'Globe',
    features: [
      'Self-healing selectors using LLM vision/DOM parsing',
      'Proxy rotation & headless browser stealth mode',
      'Automated pagination & dynamic JS rendering',
      'Instant Webhook & CRM data delivery via n8n',
    ],
    deliverables: [
      'Standalone Playwright / Puppeteer scraper script',
      'Scheduled cloud cron trigger / n8n workflow pipeline',
      'Data validation schema (Pydantic / Zod)',
      'Export to Google Sheets, Postgres, or Airtable',
    ],
    techStack: ['Playwright', 'Python', 'n8n', 'Selenium', 'BeautifulSoup', 'FastAPI'],
  },
  {
    id: 'fullstack-ai-applications',
    title: 'Full-Stack AI Web Applications',
    shortDesc: 'End-to-end modern web applications with seamless server-side AI model integration.',
    fullDesc: 'Turn your AI product idea into a polished SaaS web application featuring real-time streaming, user authentication, subscription billing, interactive canvas/dashboards, and high-speed API performance.',
    iconName: 'Layout',
    features: [
      'Responsive React + Tailwind UI with silky animations',
      'Server-side API key proxying for absolute security',
      'Server-Sent Events (SSE) & WebSocket streaming responses',
      'Database integration with Firebase or PostgreSQL',
    ],
    deliverables: [
      'Full source code repository',
      'Deployed live production instance on Cloud Run / Vercel',
      'Admin management portal',
      'API documentation & post-launch support',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js/Express', 'Vite'],
  },
  {
    id: 'ai-consulting-audit',
    title: 'AI Strategy & Workflow Optimization Audit',
    shortDesc: '1-on-1 technical consultation and architecture roadmap for AI implementation.',
    fullDesc: 'Unsure which LLMs or frameworks to use? Get a clear, actionable AI implementation roadmap tailored to your technical budget, security requirements, and operational bottlenecks.',
    iconName: 'Sparkles',
    features: [
      'Architecture design review & cost projection',
      'Framework selection (LangChain vs CrewAI vs LlamaIndex)',
      'Data privacy & self-hosted open-source model strategy',
      'ROI calculation & pilot proof-of-concept design',
    ],
    deliverables: [
      '90-minute live video strategy session',
      'Comprehensive 15-page AI Architecture Blueprint PDF',
      'Recommended tech stack & code boilerplate template',
      '30-day follow-up Q&A access',
    ],
    techStack: ['Architecture Design', 'Security Audit', 'LLM Benchmarking'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'b2b-bulk-order-ai-agent',
    title: 'B2B Quotation & Bulk Order Agent',
    category: 'Multi-Agent',
    subtitle: 'Automated bulk order processing, lead qualification & support',
    description: 'AI agent created with n8n workflows that automates bulk order processing, lead qualification, quotation generation, business information retrieval, and customer support.',
    image: b2bQuotationCover,
    metrics: ['85% Cost Reduction', '24/7 Bulk Processing', 'Zero Lead Loss'],
    techStack: ['JavaScript', 'n8n', 'Email Automation', 'Workflow Automation', 'LLMs', 'RAG', 'APIs'],
    architecture: [
      'n8n workflows listen to webhooks, email triggers, and custom form submissions',
      'RAG pipeline retrieves verified product specs and inventory availability',
      'LLM agent qualifies B2B buyer intents and calculates bulk order pricing',
      'Automated email & CRM sync logs qualified opportunities instantly',
    ],
    liveUrl: '#contact',
    githubUrl: 'https://github.com/AliAhsan5031',
    featured: true,
  },
  {
    id: 'ai-email-assistant',
    title: 'AI Email Assistant',
    category: 'Full-Stack AI',
    subtitle: 'Intent detection & automated intelligent reply drafting',
    description: 'Reads incoming emails, understands intent, and generates intelligent draft replies automatically.',
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=800&q=80',
    metrics: ['< 5s Response Time', '98% Draft Accuracy', '100% Privacy Guarded'],
    techStack: ['Claude', 'Gmail API', 'Python'],
    architecture: [
      'Gmail API listener catches incoming inbox messages via webhooks',
      'Claude model analyzes sentiment, urgency, and underlying customer intent',
      'Contextual memory fetches previous email thread history',
      'Generates structured draft reply directly in Gmail ready for review',
    ],
    liveUrl: '#contact',
    githubUrl: 'https://github.com/AliAhsan5031',
    featured: true,
  },
  {
    id: 'whatsapp-ai-assistant',
    title: 'WhatsApp AI Assistant',
    category: 'Web Automation',
    subtitle: 'Unified business operations assistant across WhatsApp, Drive & Calendar',
    description: 'AI assistant connected with Gmail, Google Drive, Google Calendar, and WhatsApp to manage business workflows from one interface.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=800&q=80',
    metrics: ['1 Unified Interface', 'Real-time Sync', 'Zero Context Switching'],
    techStack: ['n8n', 'WhatsApp', 'Google APIs', 'Python'],
    architecture: [
      'WhatsApp Business API receives natural language text & voice commands',
      'n8n orchestration layer routes requests to Google Workspace APIs',
      'Schedules Calendar events, searches Google Drive docs, and checks Gmail',
      'Delivers formatted summaries and instant confirmation messages in WhatsApp',
    ],
    liveUrl: '#contact',
    githubUrl: 'https://github.com/AliAhsan5031',
    featured: true,
  },
  {
    id: 'ecotex-ai-rag-system',
    title: 'EcoTex AI RAG System',
    category: 'RAG Engines',
    subtitle: 'Sustainable textile recommendation knowledge assistant',
    description: 'AI-powered knowledge assistant for sustainable textile recommendations using Retrieval-Augmented Generation.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    metrics: ['10k+ Materials Indexed', '100% Citation Grounded', '<300ms Search'],
    techStack: ['Python', 'ChromaDB', 'LangChain', 'Hugging Face'],
    architecture: [
      'Hugging Face embedding models generate dense vector representations for textile data',
      'ChromaDB stores and executes semantic similarity queries across fabric specs',
      'LangChain RAG pipeline constructs grounded prompt payloads',
      'Delivers eco-certified textile recommendations with sustainability compliance data',
    ],
    liveUrl: '#contact',
    githubUrl: 'https://github.com/AliAhsan5031',
    featured: true,
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    role: 'Lead AI Agent Architect',
    company: 'Freelancing',
    period: '',
    location: 'Remote',
    type: 'work',
    badge: 'Current Role',
    highlights: [
      'Architected 35+ custom multi-agent workflow systems for fintech, legaltech, and SaaS clients worldwide.',
      'Reduced manual data processing overhead by 85% on average for client operational teams.',
      'Pioneered self-healing Playwright web scrapers with 99.9% reliability rate.',
    ],
  },
  {
    id: 'exp-2',
    role: 'Generative AI Developer',
    company: 'NeuralAutomation Systems',
    period: '',
    location: 'Remote',
    type: 'work',
    highlights: [
      'Designed and deployed 3+ Retrieval-Augmented Generation (RAG) pipelines using Flowise and ChromaDB.',
      'Gen AI applications using GPT-4, Claude, and Gemini APIs for document intelligence, content generation, etc. and accessible to end users.',
      'Integrated vector databases (ChromaDB, FAISS) with LLMs to implement semantic search.',
      'Tested, debugged, and refined AI agent pipelines iteratively.',
    ],
  },
  {
    id: 'exp-3',
    role: 'AI Automation & Consultant',
    company: 'DataPulse Technologies',
    period: '',
    location: 'Remote',
    type: 'work',
    highlights: [
      'Built distributed Python web crawling microservices handling 10M+ daily HTTP requests.',
      'Designed PostgreSQL & Redis caching layers reducing database query latency by 65%.',
    ],
  },
  {
    id: 'cert-hec',
    role: 'HEC Generative AI Application Developer',
    company: 'Higher Educaion Commission (HEC) & ULEF USA',
    period: '',
    location: 'Remote',
    type: 'certification',
    highlights: ['Certified Generative AI Application Developer specializing in LLM Orchestration, RAG Architectures, and Autonomous Agent Systems.'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    role: 'CTO',
    company: 'FinScale Technologies',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=200',
    quote: 'Ali built a 4-agent market research team for our firm in just two weeks. What used to take our analysts 20 hours now happens automatically in 3 minutes with higher accuracy. Truly exceptional AI developer!',
    rating: 5,
    projectType: 'Multi-Agent Workflow System',
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    role: 'VP of Product',
    company: 'LegalPulse AI',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=200',
    quote: 'Our enterprise RAG search was constantly hallucinating until Ali re-architected our chunking and reranking pipeline. Our accuracy jumped to 99.4% overnight. His communication and code quality are top-tier.',
    rating: 5,
    projectType: 'Enterprise RAG Engine',
  },
  {
    id: 'test-3',
    name: 'David Chen',
    role: 'Founder & CEO',
    company: 'GrowthFlow Automation',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=200',
    quote: 'Ali is the rare engineer who understands both deep technical AI architecture and beautiful front-end user experience. The AI Web Application he delivered blew our investors away.',
    rating: 5,
    projectType: 'Full-Stack AI Application',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-starter',
    name: 'Single Autonomous Agent',
    price: '$99',
    subtitle: '',
    popular: false,
    idealFor: '',
    turnaround: '5 - 7 Business Days',
    features: [
      '1 Custom AI Agent (CrewAI / LangGraph)',
      'Up to 3 Tool Integrations (Web, Database, CRM)',
      'Prompt Optimization & Guardrails',
      '14 Days Post-Launch Maintenance & Bug Fixes',
    ],
  },
  {
    id: 'plan-growth',
    name: 'Multi-Agent Ecosystem',
    price: '$149',
    subtitle: '',
    popular: true,
    idealFor: '',
    turnaround: '10 - 14 Business Days',
    features: [
      '3-5 Collaborative AI Agents with Manager Node',
      'Custom RAG Knowledge Base Integration',
      'Unlimited Tool & API Integrations',
      'Self-Healing Error Handling & Logging',
      'Complete Code & Deployment Script Transfer',
    ],
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise Custom AI Engine',
    price: '$199',
    subtitle: '',
    popular: false,
    idealFor: '',
    turnaround: '3 - 4 Weeks',
    features: [
      'Unlimited Multi-Agent Orchestration',
      'Self-Hosted / Private Vector DB & LLM Setup',
      '60 Days Dedicated Support & Live Team Training',
      'Direct Slack / Discord Communication Channel',
    ],
  },
];

export const AGENT_TEMPLATES: AgentTemplate[] = [
  {
    id: 'template-market-research',
    name: 'Market Intelligence Agent',
    description: 'Scrapes competitor websites, analyzes pricing structures, and generates a structured competitive positioning matrix.',
    icon: 'Search',
    steps: [
      { title: 'Goal Initialization', type: 'thought', detail: 'Received user prompt: "Analyze AI automation pricing models across top 3 competitor platforms."', durationMs: 600 },
      { title: 'Web Scraping Tool', type: 'tool', detail: 'Calling Playwright Scraper Tool on target URLs: competitor-a.com, competitor-b.com...', durationMs: 1200 },
      { title: 'DOM Data Extraction', type: 'action', detail: 'Extracted 14 pricing tiers, feature lists, and enterprise discount quotes.', durationMs: 900 },
      { title: 'Synthesis & Reranking', type: 'thought', detail: 'Filtering noise and calculating average monthly cost per seat ($49/mo avg).', durationMs: 700 },
      { title: 'Report Generation', type: 'output', detail: 'Generated Competitive Matrix Report with key value propositions and strategic recommendations.', durationMs: 800 },
    ],
    resultSummary: 'Analysis Complete! Evaluated 3 competitor platforms. Found average pricing at $49/user/month with standard 14-day free trial.',
    sampleArtifact: `### Competitive Intelligence Matrix Summary
- **Competitor A**: $39/mo (Basic multi-agent) | Missing RAG Knowledge base
- **Competitor B**: $79/mo (Enterprise) | Includes FastMCP integrations
- **Opportunity**: Position "Ali Ahsan" custom build at $49/mo with hybrid vector RAG and self-healing web scraping.`,
  },
  {
    id: 'template-code-audit',
    name: 'Code Security & Refactoring Agent',
    description: 'Parses code files, detects OWASP Top 10 vulnerabilities, and outputs clean refactored code with explanatory diffs.',
    icon: 'Code',
    steps: [
      { title: 'AST Parsing', type: 'thought', detail: 'Analyzing provided TypeScript server codebase for memory leaks and unsanitized inputs.', durationMs: 500 },
      { title: 'Vulnerability Detector', type: 'tool', detail: 'Running AST Tree-sitter Security Inspector Tool...', durationMs: 1000 },
      { title: 'Security Issue Found', type: 'action', detail: 'High Severity: Direct SQL query string concatenation detected on line 42.', durationMs: 600 },
      { title: 'Auto-Refactoring', type: 'thought', detail: 'Generating parameterized SQL query replacement using ORM parameterized queries.', durationMs: 800 },
      { title: 'Code Review Output', type: 'output', detail: 'Generated patch diff and unit test assertion suite.', durationMs: 700 },
    ],
    resultSummary: 'Audit Finished! Identified 1 Critical SQL Injection vulnerability and 2 Unhandled Promise Rejections. Refactored code patch generated.',
    sampleArtifact: `\`\`\`typescript
// BEFORE (Vulnerable SQL Query)
const user = await db.query("SELECT * FROM users WHERE email = '" + req.body.email + "'");

// AFTER (Refactored Secure Parameterized Query by Ali Ahsan)
const user = await db.query("SELECT * FROM users WHERE email = $1", [req.body.email]);
\`\`\``,
  },
  {
    id: 'template-rag-search',
    name: 'RAG Semantic Knowledge Search',
    description: 'Queries 250,000+ internal vector document embeddings, applies Cohere reranking, and outputs grounded answers with exact source page citations.',
    icon: 'Database',
    steps: [
      { title: 'Query Embedding', type: 'thought', detail: 'Generating 1536-dimensional embedding vector for query: "What is the warranty policy for hardware failure?"', durationMs: 500 },
      { title: 'Pinecone Vector Search', type: 'tool', detail: 'Executing Cosine Similarity Top-20 match retrieval on Pinecone vector index...', durationMs: 900 },
      { title: 'Cross-Encoder Rerank', type: 'action', detail: 'Reranking retrieved chunks using Cohere-Rerank v3 model. Filtered top 3 relevant passages.', durationMs: 700 },
      { title: 'Grounding Audit', type: 'thought', detail: 'Checking output response against retrieved chunks to ensure 100% factual zero-hallucination accuracy.', durationMs: 600 },
      { title: 'Grounded Output', type: 'output', detail: 'Synthesized grounded response with exact page & document citations.', durationMs: 800 },
    ],
    resultSummary: 'Grounding Verification Passed! Hardware failure is covered under Section 4.2 of Hardware_Policy_2024.pdf (Page 18).',
    sampleArtifact: `**Answer**: Hardware failure is covered under 2-year full replacement warranty.
**Citations**:
- *Hardware_Policy_2024.pdf* (Page 18, Section 4.2)
- *Terms_of_Service_v3.pdf* (Page 4, Clause 8.1)`,
  },
];
