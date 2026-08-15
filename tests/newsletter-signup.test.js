import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const page = fs.readFileSync('app/writings/page.tsx', 'utf8');
const css = fs.readFileSync('app/globals.css', 'utf8');

test('newsletter signup uses the hosted Buttondown page', () => {
  assert.match(page, /href="https:\/\/buttondown\.com\/gokdenizinan#subscribe-form"/);
  assert.match(page, /target="_blank"/);
  assert.match(page, /rel="noopener"/);
  assert.match(page, />\s*Subscribe on Buttondown\s*</);
});

test('custom embed POST form is not rendered', () => {
  assert.doesNotMatch(page, /embed-subscribe\/gokdenizinan/);
  assert.doesNotMatch(page, /embeddable-buttondown-form/);
  assert.doesNotMatch(page, /name="email"/);
  assert.doesNotMatch(page, /name="embed"/);
  assert.doesNotMatch(page, /name="tag"/);
});

test('copy explains that Buttondown handles verification', () => {
  assert.match(page, /Buttondown handles the signup, spam check, and confirmation email/);
  assert.match(page, /open the\s+confirmation link in your inbox/);
  assert.doesNotMatch(page, /subscription is complete/i);
  assert.doesNotMatch(page, /successfully subscribed/i);
});

test('hosted signup card has accessible structure', () => {
  assert.match(page, /className="writing-updates-cta" aria-labelledby="writingUpdatesTitle"/);
  assert.match(page, /<h3 id="writingUpdatesTitle">Subscribe from the official page<\/h3>/);
});

test('old local subscription JavaScript is removed', () => {
  assert.doesNotMatch(page, /WRITING UPDATES CONFIRMATION/);
  assert.doesNotMatch(page, /writingUpdatesForm/);
  assert.doesNotMatch(page, /submittedEmail/);
  assert.doesNotMatch(page, /duplicateWindowMs/);
});

test('old iframe workaround is not present', () => {
  assert.doesNotMatch(page, /buttondownSubscribeFrame/);
  assert.doesNotMatch(css, /\.writing-updates-frame/);
});

test('signup card styles are responsive and reuse site button styling', () => {
  assert.match(css, /\.writing-updates-cta \{/);
  assert.match(css, /\.writing-updates-actions \{/);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.writing-updates-actions \.btn-primary \{[\s\S]*width: 100%;/);
});
