import { cp, mkdir, rm } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js', 'AmanImage.jpg', 'assets']) {
  await cp(resolve(root, file), resolve(output, file), {
    recursive: true,
    filter: source => basename(source) !== 'README.md'
  });
}
console.log('Static production site prepared in dist/');
