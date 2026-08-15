export type Project = {
  title: string;
  slug?: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  iconClassName?: string;
  published: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    title: 'Momentum Grids',
    description:
      'Quiet, year-at-a-glance habit tracker for building visible momentum one day at a time, with accounts, simple automation, and a heatmap-style view.',
    technologies: ['Web App', 'Habits'],
    liveUrl: 'https://momentumgrids.com/',
    iconClassName: 'momentum-grids-icon',
    published: '2026-07-15',
    featured: true,
  },
  {
    title: 'Music Chord Finder',
    slug: 'music-chord-finder',
    description:
      'Python command-line project with Version 1 complete: it accepts musical notes and identifies basic major, minor, diminished, and augmented chords, including inversions.',
    technologies: ['Python', 'CLI', 'Music Theory'],
    githubUrl: 'https://github.com/gokdenizinan/music-chord-finder.git',
    published: '2026-07-08',
    featured: true,
  },
  {
    title: 'CarDatabase',
    description:
      'Car database application for managing vehicle records with CRUD operations, search and filtering, database integration, and backend workflow scripts.',
    technologies: ['PHP', 'Python', 'Database'],
    githubUrl: 'https://github.com/Gorkem345/CarDatabase',
    published: '2026-07-06',
    featured: true,
  },
  {
    title: 'SmartCalendar',
    description:
      'Multi-user scheduling system that identifies optimal meeting times by analyzing shared calendar data. Includes invitations, notifications, role-based access, and calendar integration.',
    technologies: ['Java', 'GUI', 'Collaborative'],
    githubUrl: 'https://github.com/scarlettcsung/scheduler-app',
    published: '2026-06-01',
    featured: true,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => Date.parse(b.published) - Date.parse(a.published));
}
