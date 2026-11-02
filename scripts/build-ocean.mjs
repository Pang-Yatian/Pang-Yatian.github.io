// Requires Node.js 22.13+ with TypeScript transformation support.
import { stripTypeScriptTypes } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
const modules = ['math', 'species', 'world', 'renderer', 'engine']
  .map(name => `js/vendor/ascii-sharks/${name}.ts`);
modules.push('js/ocean-entry.ts');
const body = modules.map(file => {
  const source = readFileSync(file, 'utf8').replace(/^import .*;\r?\n/gm, '');
  return stripTypeScriptTypes(source, { mode: 'transform' }).replace(/^export /gm, '');
}).join('\n');
writeFileSync('js/ascii-ocean.js',
  '/*! ASCII Sharks, Copyright (c) 2026 drewdi. MIT license: js/vendor/ascii-sharks/LICENSE */\n' +
  '(() => {\n' + body + '\n})();\n');
