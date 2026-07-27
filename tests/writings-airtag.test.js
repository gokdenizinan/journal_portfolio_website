const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const writingsHtml = fs.readFileSync('writings.html', 'utf8');
const articleHtml = fs.readFileSync('how-airtag-works.html', 'utf8');

test('AirTag article page exists with correct metadata', () => {
  assert.match(articleHtml, /<title>How AirTag Works\? — Gökdeniz İnan<\/title>/);
  assert.match(articleHtml, /<span class="post-tag">Technology<\/span>/);
  assert.match(articleHtml, /<span class="post-date">Jul 27, 2026<\/span>/);
  assert.match(articleHtml, /<h1 class="post-heading reveal-up"[^>]*>How AirTag Works\?<\/h1>/);
});

test('AirTag article is listed first on the writings page', () => {
  const firstWriting = writingsHtml.match(/<a href="([^"]+)" class="writing-row"/);

  assert.equal(firstWriting?.[1], 'how-airtag-works.html');
  assert.match(writingsHtml, /<button class="filter-btn" data-filter="Technology">Technology<\/button>/);
  assert.match(writingsHtml, /<a href="how-airtag-works\.html" class="writing-row" data-category="Technology">/);
});

test('AirTag article is listed first in latest writings on the homepage', () => {
  const firstCard = indexHtml.match(/<a href="([^"]+)" class="post-card">/);

  assert.equal(firstCard?.[1], 'how-airtag-works.html');
  assert.match(indexHtml, /<h3 class="post-title">How AirTag Works\?<\/h3>/);
});

test('article uses British spelling and avoids the requested American spelling', () => {
  assert.match(articleHtml, /metres/);
  assert.match(articleHtml, /recognises/);
  assert.match(articleHtml, /summarise/);
  assert.doesNotMatch(articleHtml, /utilize|meter away|recognizes|summarize/);
});

test('article includes the requested public-key math note', () => {
  assert.match(articleHtml, /Apple uses elliptic curve public key cryptography/);
  assert.match(articleHtml, /I will update this writing when that part is ready/);
});
