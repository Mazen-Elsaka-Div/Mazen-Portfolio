export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  category: 'Tech Talk' | 'Workshop' | 'Hackathon' | 'Conference' | 'Bootcamp';
  year: number;
  description: string;
  role: string;
  impact: string;
  attendees: number;
  color: string;
  gradient: string;
}

export const events: Event[] = [
  {
    id: 1,
    name: 'Tech Horizons 2022',
    date: 'March 15, 2022',
    location: 'Cairo, Egypt',
    category: 'Conference',
    year: 2022,
    description: 'Annual technology conference featuring keynotes, workshops, and networking sessions for developers and tech enthusiasts across Egypt.',
    role: 'Lead Event Coordinator',
    impact: 'Coordinated 12 speakers, managed logistics for the full 2-day event, and ensured smooth execution of all parallel tracks.',
    attendees: 450,
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  },
  {
    id: 2,
    name: 'AI & Future Workshop',
    date: 'June 8, 2022',
    location: 'Alexandria, Egypt',
    category: 'Workshop',
    year: 2022,
    description: 'Hands-on workshop introducing participants to machine learning fundamentals, Python for AI, and practical model building exercises.',
    role: 'Workshop Facilitator & Technical Lead',
    impact: 'Guided 80 participants through end-to-end ML projects. 90% completion rate with post-workshop projects submitted.',
    attendees: 80,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
  },
  {
    id: 3,
    name: 'NASS Hackathon 2022',
    date: 'October 22, 2022',
    location: 'Cairo, Egypt',
    category: 'Hackathon',
    year: 2022,
    description: '48-hour hackathon challenging teams to build innovative solutions for real-world problems in education and social impact.',
    role: 'Head Organizer & Mentor',
    impact: 'Organized and mentored 35 teams. Top 3 projects received funding and were incubated through NASS Academy\'s startup program.',
    attendees: 210,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
  },
  {
    id: 4,
    name: 'Web Dev Bootcamp',
    date: 'January 15, 2023',
    location: 'Cairo, Egypt',
    category: 'Bootcamp',
    year: 2023,
    description: '4-week intensive bootcamp covering modern web development from HTML/CSS fundamentals to React and Node.js backend development.',
    role: 'Lead Instructor & Curriculum Designer',
    impact: 'Designed the entire 4-week curriculum. 95% of graduates landed internships or junior dev roles within 3 months of graduation.',
    attendees: 45,
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  },
  {
    id: 5,
    name: 'DevTalks Spring 2023',
    date: 'April 20, 2023',
    location: 'Online (Zoom)',
    category: 'Tech Talk',
    year: 2023,
    description: 'Monthly tech talk series featuring industry experts sharing insights on software architecture, career growth, and emerging technologies.',
    role: 'Event Host & Speaker Coordinator',
    impact: 'Grew the series from 50 to 300+ regular attendees. Onboarded 8 international speakers from top tech companies.',
    attendees: 320,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
  },
  {
    id: 6,
    name: 'Computer Vision Summit',
    date: 'November 5, 2023',
    location: 'Cairo, Egypt',
    category: 'Conference',
    year: 2023,
    description: 'Specialized conference on computer vision, deep learning, and their applications in industry. Featured live demos and research presentations.',
    role: 'Technical Program Chair',
    impact: 'Curated 18 technical sessions, coordinated peer review for research papers, and organized industry demo booths from 5 companies.',
    attendees: 280,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
  },
];

export const eventYears = [...new Set(events.map(e => e.year))].sort();
export const eventCategories = [...new Set(events.map(e => e.category))];
