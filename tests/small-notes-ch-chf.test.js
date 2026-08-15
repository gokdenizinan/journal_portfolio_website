const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const writingsHtml = fs.readFileSync('writings.html', 'utf8');
const noteHtml = fs.readFileSync('why-switzerland-uses-ch-and-chf.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

test('CH and CHF small note page exists with correct metadata', () => {
  assert.match(noteHtml, /<title>Why Switzerland Uses CH and CHF — Gökdeniz İnan<\/title>/);
  assert.match(noteHtml, /<span class="post-tag">Small Note<\/span>/);
  assert.match(noteHtml, /<span class="post-date">Aug 15, 2026<\/span>/);
  assert.match(noteHtml, /<h1 class="post-heading reveal-up"[^>]*>Why Switzerland Uses CH and CHF<\/h1>/);
});

test('CH and CHF small note explains the origin clearly', () => {
  assert.match(noteHtml, /The <code>CH<\/code> comes from <em>Confoederatio Helvetica<\/em>/);
  assert.match(noteHtml, /German, French, Italian, and Romansh/);
  assert.match(noteHtml, /<code>CH<\/code> identifies Switzerland and <code>F<\/code> stands for franc/);
  assert.match(noteHtml, /Confoederatio Helvetica Franc/);
  assert.match(noteHtml, /country code <code>CH<\/code> plus <code>F<\/code> for franc/);
});

test('CH and CHF small note is linked from small notes sections', () => {
  assert.match(indexHtml, /<a href="why-switzerland-uses-ch-and-chf\.html" class="small-note-card small-note-card-empty">/);
  assert.match(writingsHtml, /<a href="why-switzerland-uses-ch-and-chf\.html" class="small-note-card small-note-card-empty">/);
  assert.match(indexHtml, /<h2>Why Switzerland Uses CH and CHF<\/h2>/);
  assert.match(writingsHtml, /<h2>Why Switzerland Uses CH and CHF<\/h2>/);
  assert.doesNotMatch(writingsHtml, /Coming soon/);
});

test('CH and CHF small note includes source links and clickable card styling', () => {
  assert.match(noteHtml, /href="https:\/\/www\.iso\.org\/iso-4217-currency-codes\.html"/);
  assert.match(noteHtml, /href="https:\/\/www\.swissinfo\.ch\/eng\/demographics\/facts-about-switzerland\/29050470"/);
  assert.match(css, /a\.small-note-card:hover/);
});
