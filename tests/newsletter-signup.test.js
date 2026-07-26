const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const html = fs.readFileSync('writings.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const js = fs.readFileSync('main.js', 'utf8');

test('newsletter signup uses the hosted Buttondown page', () => {
  assert.match(html, /href="https:\/\/buttondown\.com\/gokdenizinan#subscribe-form"/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noopener"/);
  assert.match(html, />Subscribe on Buttondown</);
});

test('custom embed POST form is not rendered', () => {
  assert.doesNotMatch(html, /embed-subscribe\/gokdenizinan/);
  assert.doesNotMatch(html, /embeddable-buttondown-form/);
  assert.doesNotMatch(html, /name="email"/);
  assert.doesNotMatch(html, /name="embed"/);
  assert.doesNotMatch(html, /name="tag"/);
});

test('copy explains that Buttondown handles verification', () => {
  assert.match(html, /Buttondown handles the signup, spam check, and confirmation email/);
  assert.match(html, /open the confirmation link in your inbox/);
  assert.doesNotMatch(html, /subscription is complete/i);
  assert.doesNotMatch(html, /successfully subscribed/i);
});

test('hosted signup card has accessible structure', () => {
  assert.match(html, /class="writing-updates-cta" aria-labelledby="writingUpdatesTitle"/);
  assert.match(html, /<h3 id="writingUpdatesTitle">Subscribe from the official page<\/h3>/);
});

test('old local subscription JavaScript is removed', () => {
  assert.doesNotMatch(js, /WRITING UPDATES CONFIRMATION/);
  assert.doesNotMatch(js, /writingUpdatesForm/);
  assert.doesNotMatch(js, /submittedEmail/);
  assert.doesNotMatch(js, /duplicateWindowMs/);
});

test('old iframe workaround is not present', () => {
  assert.doesNotMatch(html, /buttondownSubscribeFrame/);
  assert.doesNotMatch(css, /\.writing-updates-frame/);
});

test('signup card styles are responsive and reuse site button styling', () => {
  assert.match(css, /\.writing-updates-cta \{/);
  assert.match(css, /\.writing-updates-actions \{/);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.writing-updates-actions \.btn-primary \{[\s\S]*width: 100%;/);
});
