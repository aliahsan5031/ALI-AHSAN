import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = join(__dirname, '..');

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

describe('bank details live in one place', () => {
  const files = walk(SRC).filter(
    (f) => /\.(ts|tsx)$/.test(f) && !/\.test\.(ts|tsx)$/.test(f),
  );

  it.each(['00300114746720', 'PK66MEZN0000300114746720'])('%s appears only in paymentConfig.ts', (value) => {
    const hits = files.filter((f) => readFileSync(f, 'utf8').includes(value));
    expect(hits.map((f) => f.slice(SRC.length + 1))).toEqual([join('data', 'paymentConfig.ts')]);
  });

  it('no payment secret is read from a VITE_-prefixed variable in client code', () => {
    const offenders = files.filter((f) =>
      /VITE_[A-Z0-9_]*(SECRET|API_KEY|WEBHOOK|PRIVATE)/.test(readFileSync(f, 'utf8')),
    );
    expect(offenders).toEqual([]);
  });
});
