export type Project = {
  title: string;
  slug?: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  appStoreUrl?: string;
  iconClassName?: string;
  published: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    title: 'HugSelect Django UI',
    slug: 'hugselect-django-ui',
    description:
      'Research internship project: an evidence-driven Django decision-support tool for selecting Hugging Face foundation models from a 69,000-record Elasticsearch snapshot.',
    technologies: ['Python', 'Django', 'Elasticsearch', 'Decision Support'],
    githubUrl: 'https://github.com/gokdenizinan/hugselect-django-ui',
    iconClassName: 'hugselect-icon',
    published: '2026-09-11',
    featured: true,
  },
  {
    title: 'Momentum Grids',
    description:
      '🌱 Small habits are easy to lose track of. Momentum Grids helps you record the days you show up and see your progress across a whole year in a colourful heatmap. Whether you are reading, exercising, or practising something new, the grid makes your patterns easier to spot and your small wins harder to overlook. Available on the web and as an iOS app. One day, one square, a little more momentum.',
    technologies: ['Web App', 'iOS', 'Habits'],
    liveUrl: 'https://momentumgrids.com/',
    appStoreUrl: 'https://apps.apple.com/app/momentumgrids/id6797536141',
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
