export interface Project {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  category: 'Web' | 'AI' | 'Fullstack';
  techs: string[];
  color: string;
  gradient: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  challenges: string;
  solution: string;
  codeSnippet?: string;
}

export interface TechNode {
  id: string;
  label: string;
  color: string;
  size: number;
  group: 'frontend' | 'backend' | 'ai' | 'tools' | 'database';
}

export interface TechEdge {
  source: string;
  target: string;
  projectId: number;
  strength: number;
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'Itqan Platform',
    description: 'AI-powered learning management system for Arabic content',
    longDescription: 'A comprehensive LMS platform built with Next.js 16 and React 19, featuring AI-generated content, adaptive learning paths, and real-time collaboration tools. Serves thousands of Arabic-speaking learners.',
    category: 'Fullstack',
    techs: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'OpenAI API', 'PostgreSQL'],
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    liveUrl: 'https://itqan.app',
    githubUrl: 'https://github.com/4kair0/itqan',
    featured: true,
    challenges: 'Building right-to-left (RTL) interfaces with complex animations and ensuring AI responses were contextually appropriate for Arabic cultural norms.',
    solution: 'Created a custom RTL animation system and fine-tuned prompts with cultural context. Used Framer Motion\'s layoutId for seamless RTL transitions.',
    codeSnippet: `// AI content generation with cultural context
async function generateArabicContent(topic: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{
      role: 'system',
      content: 'You are an Arabic educational content expert...'
    }],
    temperature: 0.7,
  });
  return response.choices[0].message.content;
}`,
  },
  {
    id: 2,
    name: 'Vision Sentinel',
    description: 'Real-time object detection & surveillance system',
    longDescription: 'Computer vision system using YOLOv8 for real-time object detection and anomaly detection in surveillance footage. Features a React dashboard for live monitoring and alert management.',
    category: 'AI',
    techs: ['Python', 'PyTorch', 'YOLOv8', 'OpenCV', 'FastAPI', 'React', 'WebSocket'],
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #3b82f6)',
    githubUrl: 'https://github.com/4kair0/vision-sentinel',
    featured: true,
    challenges: 'Achieving real-time performance (30fps+) while running YOLOv8 inference on CPU-only servers without GPU acceleration.',
    solution: 'Implemented frame skipping with interpolation, model quantization (INT8), and ONNX runtime optimization to achieve 28fps on CPU.',
    codeSnippet: `# Optimized inference pipeline
model = YOLO('yolov8n.pt')
model.export(format='onnx', dynamic=True, simplify=True)

session = ort.InferenceSession(
  'yolov8n.onnx',
  providers=['CPUExecutionProvider']
)`,
  },
  {
    id: 3,
    name: 'DevFlow Dashboard',
    description: 'Developer productivity analytics platform',
    longDescription: 'A comprehensive analytics dashboard for development teams. Integrates with GitHub, Jira, and Slack to provide insights on team velocity, code quality trends, and deployment frequency.',
    category: 'Web',
    techs: ['React', 'TypeScript', 'D3.js', 'Node.js', 'Express', 'MongoDB', 'GitHub API'],
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    liveUrl: 'https://devflow.demo',
    githubUrl: 'https://github.com/4kair0/devflow',
    featured: false,
    challenges: 'Handling rate limits from multiple APIs simultaneously while keeping dashboards real-time without hammering the APIs.',
    solution: 'Built a smart caching layer with Redis and WebSocket push notifications. API calls are queued and deduplicated with exponential backoff.',
  },
  {
    id: 4,
    name: 'RAG Knowledge Base',
    description: 'Semantic search engine over custom document collections',
    longDescription: 'Production RAG system that ingests PDFs, web pages, and Notion docs into a vector database, then serves semantic search and Q&A via a clean chat interface.',
    category: 'AI',
    techs: ['Python', 'LangChain', 'OpenAI API', 'Pinecone', 'FastAPI', 'React', 'Tailwind CSS'],
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    githubUrl: 'https://github.com/4kair0/rag-kb',
    featured: false,
    challenges: 'Chunking strategies that preserve context across document boundaries without splitting mid-thought.',
    solution: 'Implemented semantic chunking using sentence embeddings to find natural break points, combined with sliding window overlap for context continuity.',
  },
  {
    id: 5,
    name: 'EventSync Pro',
    description: 'Full-featured event management & ticketing platform',
    longDescription: 'End-to-end event management system used for NASS Academy events. Handles registrations, check-in QR codes, live attendance tracking, and post-event analytics.',
    category: 'Fullstack',
    techs: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'QR Code API'],
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #f97316)',
    featured: false,
    challenges: 'Handling thousands of simultaneous check-ins at event doors without server overload.',
    solution: 'Implemented offline-capable PWA for check-in devices with local IndexedDB sync, then batch-synced to server when connectivity was available.',
  },
];

export const techNodes: TechNode[] = [
  { id: 'react', label: 'React', color: '#61dafb', size: 18, group: 'frontend' },
  { id: 'nextjs', label: 'Next.js', color: '#ffffff', size: 16, group: 'frontend' },
  { id: 'typescript', label: 'TypeScript', color: '#3178c6', size: 15, group: 'frontend' },
  { id: 'tailwind', label: 'Tailwind', color: '#06b6d4', size: 13, group: 'frontend' },
  { id: 'framer', label: 'Framer Motion', color: '#bb22ff', size: 11, group: 'frontend' },
  { id: 'python', label: 'Python', color: '#ffd343', size: 17, group: 'backend' },
  { id: 'fastapi', label: 'FastAPI', color: '#009688', size: 12, group: 'backend' },
  { id: 'nodejs', label: 'Node.js', color: '#339933', size: 14, group: 'backend' },
  { id: 'pytorch', label: 'PyTorch', color: '#ee4c2c', size: 13, group: 'ai' },
  { id: 'openai', label: 'OpenAI API', color: '#10a37f', size: 14, group: 'ai' },
  { id: 'yolo', label: 'YOLOv8', color: '#ff6b35', size: 11, group: 'ai' },
  { id: 'opencv', label: 'OpenCV', color: '#5c3ee8', size: 12, group: 'ai' },
  { id: 'langchain', label: 'LangChain', color: '#1c3c3c', size: 11, group: 'ai' },
  { id: 'postgres', label: 'PostgreSQL', color: '#336791', size: 13, group: 'database' },
  { id: 'mongodb', label: 'MongoDB', color: '#47a248', size: 12, group: 'database' },
  { id: 'pinecone', label: 'Pinecone', color: '#0044ff', size: 10, group: 'database' },
  { id: 'd3', label: 'D3.js', color: '#f68e2e', size: 10, group: 'frontend' },
];
