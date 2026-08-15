import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const homePage = fs.readFileSync('app/page.tsx', 'utf8');
const writingsPage = fs.readFileSync('app/writings/page.tsx', 'utf8');
const articleMarkdown = fs.readFileSync('content/writings/how-airtag-works.md', 'utf8');
const writingRoute = fs.readFileSync('app/[slug]/page.tsx', 'utf8');

test('AirTag article page exists with correct metadata', () => {
  assert.match(articleMarkdown, /title: "How AirTag Works\?"/);
  assert.match(articleMarkdown, /category: "Technology"/);
  assert.match(articleMarkdown, /displayDate: "Jul 27, 2026"/);
  assert.match(writingRoute, /generateStaticParams/);
});

test('AirTag article is listed first on the writings page', () => {
  assert.match(writingsPage, /getEssays\(\)/);
  assert.match(writingsPage, /<WritingsArchive essays=\{essays\}/);
  assert.match(articleMarkdown, /date: "2026-07-27"/);
});

test('AirTag article is listed first in latest writings on the homepage', () => {
  assert.match(homePage, /getLatestFeaturedEssays\(3\)/);
  assert.match(articleMarkdown, /featured: true/);
});

test('article uses British spelling and avoids the requested American spelling', () => {
  assert.match(articleMarkdown, /metres/);
  assert.match(articleMarkdown, /recognises/);
  assert.match(articleMarkdown, /summarise/);
  assert.doesNotMatch(articleMarkdown, /utilize|meter away|recognizes|summarize/);
});

test('article includes the requested public-key math note', () => {
  assert.match(articleMarkdown, /Small math note <span class="math-symbol" aria-hidden="true">∑<\/span>:/);
  assert.match(articleMarkdown, /Apple uses elliptic curve public key cryptography/);
  assert.match(articleMarkdown, /I will update this writing when that part is ready/);
});

test('article links to the rough notes PDF and mentions later math PDF', () => {
  assert.match(articleMarkdown, /<h2><span class="math-symbol" aria-hidden="true">∑<\/span> Rough notes and mechanism sketches<\/h2>/);
  assert.match(articleMarkdown, /Rough notes and mechanism sketches/);
  assert.match(articleMarkdown, /href="airtag-mechanism-notes\.pdf"/);
  assert.match(articleMarkdown, /The separate math PDF is still in progress and will be added later/);
});
