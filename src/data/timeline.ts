export interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  tag: 'Education' | 'Work' | 'Achievement' | 'Future';
  icon: string;
}

export const timeline: TimelineItem[] = [
  {
    id: 1,
    date: '2018',
    title: 'First Line of Code',
    description: 'Wrote my very first HTML page — a simple "Hello World" that sparked an obsession with building things for the web.',
    tag: 'Achievement',
    icon: '💻',
  },
  {
    id: 2,
    date: '2020',
    title: 'Enrolled in Computer Science',
    description: 'Began my formal CS education, diving deep into algorithms, data structures, and the foundations of software engineering.',
    tag: 'Education',
    icon: '🎓',
  },
  {
    id: 3,
    date: '2021',
    title: 'Discovered the Web Ecosystem',
    description: 'Fell in love with React and the modern JavaScript ecosystem. Built my first full-stack application with Node.js and MongoDB.',
    tag: 'Achievement',
    icon: '⚛️',
  },
  {
    id: 4,
    date: '2022',
    title: 'Joined NASS Academy as Event Organizer',
    description: 'Led technical workshops and organized large-scale tech events, managing teams and ensuring seamless execution for hundreds of attendees.',
    tag: 'Work',
    icon: '🎪',
  },
  {
    id: 5,
    date: '2022',
    title: 'First AI/ML Project',
    description: 'Built a sentiment analysis model using Python and scikit-learn. This was my gateway into the world of machine learning.',
    tag: 'Achievement',
    icon: '🤖',
  },
  {
    id: 6,
    date: '2023',
    title: 'Fullstack Developer Role',
    description: 'Started professionally building production applications with Next.js, TypeScript, and various cloud services. Shipped features used by thousands.',
    tag: 'Work',
    icon: '🚀',
  },
  {
    id: 7,
    date: '2024',
    title: 'Deep Dive into AI Engineering',
    description: 'Specialized in integrating LLMs, building RAG pipelines, and deploying AI-powered features into production web applications.',
    tag: 'Achievement',
    icon: '🧠',
  },
  {
    id: 8,
    date: '2025',
    title: 'Computer Vision Research',
    description: 'Began exploring computer vision with OpenCV, PyTorch, and YOLO models. Working on real-time object detection and image segmentation projects.',
    tag: 'Achievement',
    icon: '👁️',
  },
  {
    id: 9,
    date: '2026 →',
    title: 'Next: Computer Vision Specialization',
    description: 'Goal: Become a world-class Computer Vision engineer. Building towards deploying vision models at scale and contributing to open-source CV research.',
    tag: 'Future',
    icon: '🔭',
  },
];
