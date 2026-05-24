export interface Degree {
  id: number;
  degree: string;
  institution: string;
  location: string;
  year: string;
  gpa?: string;
  description: string;
  color: string;
}

export interface Certification {
  id: number;
  name: string;
  organization: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  color: string;
  icon: string;
}

export const degrees: Degree[] = [
  {
    id: 1,
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Faculty of Computers and Information',
    location: 'Cairo, Egypt',
    year: '2020 — 2024',
    description: 'Specialized in software engineering and artificial intelligence. Thesis focused on deep learning applications in natural language processing for Arabic text.',
    color: '#6366f1',
  },
];

export const certifications: Certification[] = [
  {
    id: 1,
    name: 'Machine Learning Specialization',
    organization: 'DeepLearning.AI / Coursera',
    date: 'Jan 2023',
    credentialId: 'ML-2023-001',
    verifyUrl: 'https://coursera.org',
    color: '#3b82f6',
    icon: '🧠',
  },
  {
    id: 2,
    name: 'React — The Complete Guide',
    organization: 'Udemy',
    date: 'Mar 2022',
    color: '#61dafb',
    icon: '⚛️',
  },
  {
    id: 3,
    name: 'AWS Cloud Practitioner',
    organization: 'Amazon Web Services',
    date: 'Jun 2023',
    credentialId: 'AWS-CP-2023',
    verifyUrl: 'https://aws.amazon.com/verification',
    color: '#ff9900',
    icon: '☁️',
  },
  {
    id: 4,
    name: 'Deep Learning Specialization',
    organization: 'DeepLearning.AI / Coursera',
    date: 'Sep 2023',
    credentialId: 'DL-2023-002',
    verifyUrl: 'https://coursera.org',
    color: '#10a37f',
    icon: '🔥',
  },
  {
    id: 5,
    name: 'CS50: Introduction to Computer Science',
    organization: 'Harvard University (edX)',
    date: 'Dec 2021',
    credentialId: 'CS50-2021',
    verifyUrl: 'https://cs50.harvard.edu',
    color: '#a51c30',
    icon: '🎓',
  },
  {
    id: 6,
    name: 'Fullstack Open',
    organization: 'University of Helsinki',
    date: 'Aug 2022',
    verifyUrl: 'https://fullstackopen.com',
    color: '#4a90d9',
    icon: '🌐',
  },
];
