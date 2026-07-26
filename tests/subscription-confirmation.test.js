const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const html = fs.readFileSync('writings.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const js = fs.readFileSync('main.js', 'utf8');

test('confirmation notice is hidden on initial page load', () => {
  assert.match(html, /id="writingUpdatesNotice"[^>]*hidden/);
});

test('confirmation notice uses accessible status markup', () => {
  assert.match(html, /id="writingUpdatesNotice"[^>]*role="status"/);
  assert.match(html, /id="writingUpdatesNotice"[^>]*aria-live="polite"/);
  assert.match(html, /aria-labelledby="writingUpdatesNoticeTitle"/);
  assert.match(html, /<h3 id="writingUpdatesNoticeTitle">One more step—check your inbox<\/h3>/);
});

test('confirmation notice includes the required confirmation copy and email placeholder', () => {
  assert.match(html, /Email confirmation required/);
  assert.match(html, /We sent a confirmation link to <strong data-submitted-email><\/strong>/);
  assert.match(html, /Open it to complete your subscription and start receiving new writing/);
  assert.match(html, /Check Spam or Promotions if it does not arrive/);
});

test('subscribers are told to stay on the site before submitting', () => {
  assert.match(html, /id="writingUpdatesHelper"/);
  assert.match(html, /Buttondown may open in a new tab/);
  assert.match(html, /Come back here and check your inbox to finish subscribing/);
  assert.match(html, /aria-describedby="writingUpdatesHelper writingUpdatesNotice"/);
});

test('valid submit reveals the notice and displays the submitted email safely', () => {
  assert.match(js, /writingUpdatesForm\.addEventListener\('submit'/);
  assert.match(js, /if \(!emailInput\.checkValidity\(\)\) return;/);
  assert.match(js, /submittedEmail\.textContent = email;/);
  assert.match(js, /notice\.hidden = false;/);
});

test('invalid email handling remains native and unchanged', () => {
  assert.match(html, /type="email"[^>]*required/);
  assert.match(js, /if \(!emailInput\.checkValidity\(\)\) return;/);
});

test('provider POST integration is preserved without claiming completion locally', () => {
  assert.match(html, /action="https:\/\/buttondown\.com\/api\/emails\/embed-subscribe\/gokdenizinan"/);
  assert.match(html, /method="post"/);
  assert.match(html, /target="_blank"/);
  assert.doesNotMatch(html, /buttondownSubscribeFrame/);
  assert.match(html, /name="embed"/);
  assert.doesNotMatch(html, /subscription is complete/i);
  assert.doesNotMatch(html, /successfully subscribed/i);
});

test('duplicate subscription safety prevents rapid repeat posts for the same email', () => {
  assert.match(js, /duplicateWindowMs = 60 \* 1000/);
  assert.match(js, /normalizedEmail === lastSubmittedEmail/);
  assert.match(js, /event\.preventDefault\(\)/);
});

test('resend action is not rendered because the static provider flow does not support it safely', () => {
  assert.doesNotMatch(html, /Resend confirmation/);
});

test('notice has responsive classes and mobile-safe layout', () => {
  assert.match(css, /\.writing-updates-confirmation \{/);
  assert.match(css, /\.writing-updates-helper \{/);
  assert.doesNotMatch(css, /\.writing-updates-frame/);
  assert.match(css, /overflow-wrap: anywhere/);
  assert.match(css, /@media \(max-width: 680px\)[\s\S]*\.writing-updates-confirmation \{[\s\S]*grid-template-columns: 1fr;/);
});

test('existing external-provider flow has no local CSRF surface to regress', () => {
  const subscriptionHandler = js.match(/WRITING UPDATES CONFIRMATION[\s\S]*?READING PROGRESS BAR/)?.[0] || '';

  assert.match(html, /embeddable-buttondown-form/);
  assert.doesNotMatch(html, /csrfmiddlewaretoken/);
  assert.doesNotMatch(subscriptionHandler, /fetch\(/);
});
