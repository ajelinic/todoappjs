const fs = require('fs');
const path = require('path');

const root = process.cwd();
const excludeDirs = new Set(['node_modules', '.git', 'dist', 'build']);

function walk(dir, files = []) {
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
            if (excludeDirs.has(name)) continue;
            walk(full, files);
        } else if (name.endsWith('.js')) {
            files.push(full);
        }
    }
    return files;
}

function hasDocblockBefore(lines, idx) {
    let i = idx - 1;
    while (i >= 0) {
        const t = lines[i].trim();
        if (t === '') { i--; continue; }
        if (t.startsWith('/**')) return true;
        if (t.startsWith('//')) { i--; continue; }
        return false;
    }
    return false;
}

function findClassName(line) {
    // named class declaration: [export] [default] class Name
    let m = line.match(/^\s*(?:export\s+)?(?:default\s+)?class\s+([A-Za-z0-9_]+)/);
    if (m) return m[1];
    // class expression assigned to variable: [export] const Name = class
    m = line.match(/^\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z0-9_]+)\s*=\s*class\b/);
    if (m) return m[1];
    return null;
}

function insertDocblocksInFile(file) {
    const raw = fs.readFileSync(file, 'utf8');
    const lines = raw.split(/\r?\n/);
    const out = [];
    let changed = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const name = findClassName(line);
        if (name && !hasDocblockBefore(lines, i)) {
            out.push('/**');
            out.push(` * @class ${name}`);
            out.push(` * @description ${name}`);
            out.push(' */');
            changed = true;
        }
        out.push(line);
    }

    if (changed) {
        fs.writeFileSync(file, out.join('\n'), 'utf8');
        console.log('Updated:', path.relative(root, file));
    }
}

const files = walk(root);
files.forEach(insertDocblocksInFile);
console.log('Done.');