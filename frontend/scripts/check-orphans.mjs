import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.resolve(process.cwd(), 'src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, out);
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      out.push(fullPath);
    }
  }
  return out;
}

const allFiles = walk(SRC_DIR);
const barrelFiles = allFiles.filter((f) => path.basename(f).startsWith('index.'));

if (barrelFiles.length > 0) {
  console.warn('Warning: barrel index files detected:', barrelFiles);
}

const contents = new Map(allFiles.map((f) => [f, fs.readFileSync(f, 'utf8')]));
const componentFiles = allFiles.filter(
  (f) => f.startsWith(COMPONENTS_DIR) && f.endsWith('.tsx') && path.basename(f) !== 'index.tsx',
);

const orphans = [];

for (const comp of componentFiles) {
  const base = path.basename(comp, '.tsx');
  let referenced = false;

  for (const [filePath, text] of contents) {
    if (filePath === comp) continue;
    if (text.includes(base)) {
      referenced = true;
      break;
    }
  }

  if (!referenced) {
    orphans.push(path.relative(process.cwd(), comp));
  }
}

console.log(`Scanned ${componentFiles.length} components under src/components.`);

if (orphans.length > 0) {
  console.error(`Found ${orphans.length} orphan component(s):`);
  for (const orphan of orphans.sort()) {
    console.error(`  - ${orphan}`);
  }
  process.exit(1);
}

console.log('0 orphan components found. Tree is clean.');
