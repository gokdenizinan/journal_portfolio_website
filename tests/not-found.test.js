import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const html = fs.readFileSync('app/not-found.tsx', 'utf8');
const route = fs.readFileSync('app/404/page.tsx', 'utf8');
const css = fs.readFileSync('app/globals.css', 'utf8');

test('custom 404 page exists with helpful navigation', () => {
  assert.match(route, /import NotFound from/);
  assert.match(html, /404: This page wandered off\./);
  assert.match(html, /href="\/index\.html" className="btn-primary"/);
  assert.match(html, /href="\/writings\.html" className="btn-ghost"/);
  assert.match(html, /href="\/index\.html#work" className="btn-ghost"/);
});

test('custom 404 page includes the small HTTP status note', () => {
  assert.match(html, /Small note/);
  assert.match(html, /404 comes from HTTP status codes/);
  assert.match(html, /The first 4 means the problem is on the client\/request side/);
  assert.match(html, /04\s*\n\s*identifies “not found”/);
});

test('custom 404 page uses dedicated responsive styling', () => {
  assert.match(css, /\.not-found-page \{/);
  assert.match(css, /\.not-found-card \{/);
  assert.match(css, /\.not-found-note \{/);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.not-found-actions \.btn-primary/);
});
