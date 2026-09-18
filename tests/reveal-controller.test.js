import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../components/RevealController.tsx', import.meta.url), 'utf8');

test('reveal controller reinitialises after client-side route changes', () => {
  assert.match(source, /const pathname = usePathname\(\)/);
  assert.match(source, /\}, \[pathname\]\)/);
});

test('above-the-fold reveal elements become visible immediately', () => {
  assert.match(source, /getBoundingClientRect\(\)/);
  assert.match(source, /bounds\.top < window\.innerHeight/);
  assert.match(source, /classList\.add\('is-visible'\)/);
});
