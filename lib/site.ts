export const site = {
  name: 'Gökdeniz İnan',
  title: 'Gökdeniz İnan — Portfolio & Journal',
  description:
    'Developer, thinker, writer. Exploring technology, economics, and the systems that shape us.',
  url: 'https://gokdenizinan.com',
  email: 'gokdeniz.inan@sabanciuniv.edu',
  github: 'https://github.com/gokdenizinan',
  linkedin: 'https://linkedin.com/in/gökdeniz-inan-0769b6203',
};

export const navItems = [
  { href: '/index.html#work', label: 'Work', match: 'work' },
  { href: '/writings.html', label: 'Writings', match: 'writings' },
  { href: '/music.html', label: 'Music', match: 'music' },
  { href: '/index.html#about', label: 'About', match: 'about' },
  { href: '/cv.html', label: 'CV', match: 'cv' },
] as const;
