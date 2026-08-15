import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const homePage = fs.readFileSync('app/page.tsx', 'utf8');
const writingsPage = fs.readFileSync('app/writings/page.tsx', 'utf8');
const noteMarkdown = fs.readFileSync('content/writings/why-switzerland-uses-ch-and-chf.md', 'utf8');
const css = fs.readFileSync('app/globals.css', 'utf8');

test('CH and CHF small note page exists with correct metadata', () => {
  assert.match(noteMarkdown, /title: "Why Switzerland Uses CH and CHF"/);
  assert.match(noteMarkdown, /slug: "why-switzerland-uses-ch-and-chf"/);
  assert.match(noteMarkdown, /displayDate: "Aug 15, 2026"/);
  assert.match(noteMarkdown, /kind: "note"/);
});

test('CH and CHF small note explains the origin clearly', () => {
  assert.match(noteMarkdown, /The <code>CH<\/code> comes from <em>Confoederatio Helvetica<\/em>/);
  assert.match(noteMarkdown, /German, French, Italian, and Romansh/);
  assert.match(noteMarkdown, /<em>Helvetica<\/em> here means something like "Helvetian" or "Swiss"/);
  assert.match(noteMarkdown, /ultimately to the Helvetii, a Celtic tribe/);
  assert.match(noteMarkdown, /<code>CH<\/code> identifies Switzerland and <code>F<\/code> stands for franc/);
  assert.match(noteMarkdown, /Confoederatio Helvetica Franc/);
  assert.match(noteMarkdown, /country code <code>CH<\/code> plus <code>F<\/code> for franc/);
});

test('CH and CHF small note is linked from small notes sections', () => {
  assert.match(homePage, /getSmallNotes\(\)\[0\]/);
  assert.match(writingsPage, /notes\.map/);
  assert.doesNotMatch(writingsPage, /Coming soon/);
});

test('CH and CHF small note includes source links and clickable card styling', () => {
  assert.match(noteMarkdown, /href="https:\/\/www\.iso\.org\/iso-4217-currency-codes\.html"/);
  assert.match(noteMarkdown, /href="https:\/\/www\.swissinfo\.ch\/eng\/demographics\/facts-about-switzerland\/29050470"/);
  assert.match(noteMarkdown, /href="https:\/\/www\.nb\.admin\.ch\/en\/helvetia-en"/);
  assert.match(css, /a\.small-note-card:hover/);
});
