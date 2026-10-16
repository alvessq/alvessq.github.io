// Confere todos os links internos e arquivos (href/src) das páginas do site:
// cada um precisa apontar para um arquivo que existe, e cada #âncora para um
// id da página. Os currículos em PDF podem faltar enquanto não forem
// adicionados: viram aviso, não erro.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OPTIONAL = [/^assets\/cv\/.+\.pdf$/];

const pages = ['index.html', '404.html', ...fs.readdirSync(path.join(ROOT, 'cases')).map((f) => `cases/${f}`)];
const errors = [];
const warnings = [];

const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

for (const page of pages) {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const ids = idsOf(html);
  if (!/<html lang="pt-BR">/.test(html)) errors.push(`${page}: falta lang="pt-BR"`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${page}: falta <title>`);
  for (const [, alt] of html.matchAll(/<img\b([^>]*)>/g)) if (!/\salt="[^"]+"/.test(alt)) errors.push(`${page}: imagem sem texto alternativo`);

  for (const [, attr, raw] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:|tel:)/.test(raw)) continue;
    const [target, hash] = raw.split('#');
    if (!target) {
      if (hash && !ids.has(hash)) errors.push(`${page}: âncora #${hash} não existe na página`);
      continue;
    }
    const base = target.startsWith('/') ? ROOT : path.join(ROOT, path.dirname(page));
    let file = path.join(base, target);
    if (target.endsWith('/')) file = path.join(file, 'index.html');
    const relative = path.relative(ROOT, file).replace(/\\/g, '/');
    if (!fs.existsSync(file)) {
      (OPTIONAL.some((re) => re.test(relative)) ? warnings : errors).push(`${page}: ${attr}="${raw}" não encontrado`);
      continue;
    }
    if (hash && file.endsWith('.html') && !idsOf(fs.readFileSync(file, 'utf8')).has(hash)) errors.push(`${page}: âncora ${raw} não existe`);
  }
}

for (const w of warnings) console.warn(`aviso: ${w}`);
if (errors.length) {
  console.error(errors.map((e) => `erro: ${e}`).join('\n'));
  process.exit(1);
}
console.log(`Links conferidos em ${pages.length} páginas${warnings.length ? ` (${warnings.length} aviso(s))` : ''}.`);
