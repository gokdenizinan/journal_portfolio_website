import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

export type WritingKind = 'essay' | 'note';

export type Writing = {
  title: string;
  slug: string;
  date: string;
  displayDate: string;
  listDate: string;
  description: string;
  category: string;
  kind: WritingKind;
  featured: boolean;
  html: string;
};

const contentDirectory = path.join(process.cwd(), 'content/writings');

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: false,
});

function assertWriting(data: Record<string, unknown>, filePath: string): Omit<Writing, 'html'> {
  const required = ['title', 'slug', 'date', 'displayDate', 'listDate', 'description', 'category', 'kind'];

  for (const key of required) {
    if (typeof data[key] !== 'string') {
      throw new Error(`Missing or invalid ${key} in ${filePath}`);
    }
  }

  if (data.kind !== 'essay' && data.kind !== 'note') {
    throw new Error(`Invalid writing kind in ${filePath}`);
  }

  return {
    title: data.title as string,
    slug: data.slug as string,
    date: data.date as string,
    displayDate: data.displayDate as string,
    listDate: data.listDate as string,
    description: data.description as string,
    category: data.category as string,
    kind: data.kind as WritingKind,
    featured: Boolean(data.featured),
  };
}

export function getAllWritings(): Writing[] {
  return fs
    .readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const filePath = path.join(contentDirectory, fileName);
      const file = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(file);
      const metadata = assertWriting(data, filePath);

      return {
        ...metadata,
        html: markdown.render(content),
      };
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getWritingBySlug(slug: string): Writing | undefined {
  return getAllWritings().find((writing) => writing.slug === slug);
}

export function getEssays(): Writing[] {
  return getAllWritings().filter((writing) => writing.kind === 'essay');
}

export function getSmallNotes(): Writing[] {
  return getAllWritings().filter((writing) => writing.kind === 'note');
}

export function getLatestFeaturedEssays(limit = 3): Writing[] {
  return getEssays()
    .filter((writing) => writing.featured)
    .slice(0, limit);
}
