const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const html = fs.readFileSync('404.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

test('custom 404 page exists with helpful navigation', () => {
  assert.match(html, /<title>404 — Page Not Found \| Gökdeniz İnan<\/title>/);
  assert.match(html, /404: This page wandered off\./);
  assert.match(html, /href="index\.html" class="btn-primary">Go home<\/a>/);
  assert.match(html, /href="writings\.html" class="btn-ghost">Read writings<\/a>/);
  assert.match(html, /href="index\.html#work" class="btn-ghost">View projects<\/a>/);
});

test('custom 404 page includes the small HTTP status note', () => {
  assert.match(html, /Small note/);
  assert.match(html, /404 comes from HTTP status codes/);
  assert.match(html, /The first 4 means the problem is on the client\/request side/);
  assert.match(html, /04 identifies &ldquo;not found&rdquo;/);
});

test('custom 404 page uses dedicated responsive styling', () => {
  assert.match(css, /\.not-found-page \{/);
  assert.match(css, /\.not-found-card \{/);
  assert.match(css, /\.not-found-note \{/);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.not-found-actions \.btn-primary/);
});
