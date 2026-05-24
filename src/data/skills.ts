export interface Skill {
  id: number;
  name: string;
  icon: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Tools' | 'Design';
  color: string;
  description: string;
}

export const skills: Skill[] = [
  // Frontend
  { id: 1, name: 'React', icon: '⚛️', level: 95, category: 'Frontend', color: '#61dafb', description: 'Advanced hooks, context, performance optimization' },
  { id: 2, name: 'Next.js', icon: '▲', level: 90, category: 'Frontend', color: '#ffffff', description: 'App Router, RSC, SSR/SSG, Edge Runtime' },
  { id: 3, name: 'TypeScript', icon: '🔷', level: 88, category: 'Frontend', color: '#3178c6', description: 'Generics, utility types, strict mode, type guards' },
  { id: 4, name: 'Tailwind CSS', icon: '🎨', level: 92, category: 'Frontend', color: '#06b6d4', description: 'Custom design systems, v4 CSS-first config' },
  { id: 5, name: 'Framer Motion', icon: '🎭', level: 85, category: 'Frontend', color: '#bb22ff', description: 'Spring physics, gestures, layout animations' },

  // Backend
  { id: 6, name: 'Python', icon: '🐍', level: 90, category: 'Backend', color: '#ffd343', description: 'FastAPI, data processing, ML pipelines, scripting' },
  { id: 7, name: 'Node.js', icon: '🟢', level: 82, category: 'Backend', color: '#339933', description: 'Express, REST APIs, WebSockets, stream processing' },
  { id: 8, name: 'PostgreSQL', icon: '🐘', level: 78, category: 'Backend', color: '#336791', description: 'Complex queries, indexing, schema design, Prisma ORM' },
  { id: 9, name: 'FastAPI', icon: '⚡', level: 80, category: 'Backend', color: '#009688', description: 'Async REST APIs, Pydantic validation, dependency injection' },

  // AI/ML
  { id: 10, name: 'PyTorch', icon: '🔥', level: 75, category: 'AI/ML', color: '#ee4c2c', description: 'CNN architectures, training loops, model optimization' },
  { id: 11, name: 'OpenCV', icon: '👁️', level: 72, category: 'AI/ML', color: '#5c3ee8', description: 'Image processing, object detection, video analysis' },
  { id: 12, name: 'LangChain', icon: '🔗', level: 80, category: 'AI/ML', color: '#1c3c3c', description: 'RAG pipelines, agents, chains, vector stores' },
  { id: 13, name: 'OpenAI API', icon: '🧠', level: 88, category: 'AI/ML', color: '#10a37f', description: 'GPT-4, embeddings, function calling, fine-tuning' },
  { id: 14, name: 'YOLOv8', icon: '🎯', level: 70, category: 'AI/ML', color: '#ff6b35', description: 'Real-time object detection, ONNX export, optimization' },

  // Tools
  { id: 15, name: 'Git / GitHub', icon: '🐙', level: 90, category: 'Tools', color: '#f05032', description: 'Advanced git workflows, CI/CD, GitHub Actions' },
  { id: 16, name: 'Docker', icon: '🐳', level: 75, category: 'Tools', color: '#2496ed', description: 'Containerization, multi-stage builds, compose' },
  { id: 17, name: 'Linux / Bash', icon: '🐧', level: 80, category: 'Tools', color: '#ffcc00', description: 'Shell scripting, server management, cron jobs' },
  { id: 18, name: 'VS Code', icon: '💙', level: 95, category: 'Tools', color: '#007acc', description: 'Extensions, debugging, multi-cursor, workspace config' },

  // Design
  { id: 19, name: 'Figma', icon: '🎪', level: 72, category: 'Design', color: '#f24e1e', description: 'Component libraries, auto-layout, prototyping' },
  { id: 20, name: 'UI/UX Principles', icon: '✨', level: 78, category: 'Design', color: '#ec4899', description: 'Accessibility, information architecture, user flows' },
];

export const skillCategories = ['Frontend', 'Backend', 'AI/ML', 'Tools', 'Design'] as const;
