// Gera, a partir de scripts/cases-data.mjs:
//   - cases/<id>.html, uma página por case de trabalho;
//   - os cartões de projetos da home (entre os marcadores do index.html);
//   - o sitemap.xml.
// Uso: npm run cases. Com --check, só confere se os arquivos estão atualizados (CI).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cases from './cases-data.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://alvessq.github.io';
const REPO = 'https://github.com/alvessq/qa-automation-portfolio/tree/main/apps';
const check = process.argv.includes('--check');

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** Projetos públicos: cartão na home que leva direto ao código. */
const PUBLIC = [
  {
    kind: 'Qualidade',
    title: 'Projeto público: app de compras',
    sum: 'Recriei do zero, num app público de demonstração, a abordagem que uso no trabalho.',
    card: [['18', 'testes automáticos'], ['2', 'falhas encontradas no app']],
    tools: ['Appium', 'WebdriverIO', 'TypeScript'],
    repo: `${REPO}/mobile-e2e`,
  },
  {
    kind: 'Qualidade',
    title: 'Projeto público: loja on-line',
    sum: 'Testes que fazem uma compra completa num site de demonstração e checam várias vezes por dia se ele continua no ar.',
    card: [['19', 'testes automáticos'], ['3x', 'verificações por dia']],
    tools: ['Playwright', 'TypeScript', 'GitHub Actions'],
    repo: `${REPO}/web-e2e`,
  },
  {
    kind: 'Qualidade',
    title: 'Projeto público: painel de testes',
    sum: 'O painel que agenda, roda e acompanha os testes do app e do site, refeito do zero com o mesmo desenho do que uso no trabalho.',
    card: [['3', 'abas: no computador, na nuvem e chamados'], ['1', 'fila única para todos os testes']],
    tools: ['React', 'Node.js', 'GitHub Actions'],
    repo: `${REPO}/test-scheduler`,
  },
];

function flowHtml(flow) {
  return flow
    .map((level) => {
      const nodes = level
        .map(([title, sub = '', tone = '']) => `<div class="fnode${tone ? ' t-' + tone : ''}"><b>${esc(title)}</b>${sub ? `<span>${esc(sub)}</span>` : ''}</div>`)
        .join('');
      return `<div class="level${level.length > 1 ? ' multi' : ''}">${nodes}</div>`;
    })
    .join('\n        ');
}

function casePage(c, i) {
  const prev = cases[(i + cases.length - 1) % cases.length];
  const next = cases[(i + 1) % cases.length];
  const kicker = c.kind === 'Produto' ? 'Projeto de Produto · Trabalho' : 'Projeto de Qualidade · Trabalho';
  const url = `${SITE}/cases/${c.id}.html`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(c.title)} · Kevin Quirino</title>
<meta name="description" content="${esc(c.sum)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:locale" content="pt_BR">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(c.title)}">
<meta property="og:description" content="${esc(c.sum)}">
<meta property="og:image" content="${SITE}/assets/img/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0A0D12">
<link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="../assets/css/case.css">
<script>try { if (localStorage.getItem('tema') === 'light') document.documentElement.dataset.theme = 'light'; } catch (e) {}</script>
</head>
<body>
<header class="top">
  <div class="wrap">
    <a class="back" href="../#cases">← Voltar para os projetos</a>
    <a class="brand" href="../">Kevin Quirino</a>
    <button class="small-btn" id="theme-btn" type="button" aria-pressed="false">Tema claro</button>
  </div>
</header>

<main class="wrap">
  <div class="intro">
    <p class="kicker">${kicker}</p>
    <h1>${esc(c.title)}</h1>
    <p class="lede">${esc(c.sum)}</p>
    <dl class="facts">
      <div><dt>Onde</dt><dd>Teddy Open Finance</dd></div>
      <div><dt>Meu papel</dt><dd>${esc(c.role)}</dd></div>
      <div><dt>Quando</dt><dd>${esc(c.when)}</dd></div>
      <div><dt>Ferramentas</dt><dd>${esc(c.tools.join(', '))}</dd></div>
    </dl>
    <ul class="toc" aria-label="Nesta página">
      <li><a href="#numeros">Números</a></li>
      <li><a href="#contexto">Contexto</a></li>
      <li><a href="#como-funciona">Como funciona</a></li>
      <li><a href="#o-que-fiz">O que eu fiz</a></li>
      <li><a href="#antes-depois">Antes e depois</a></li>
      <li><a href="#aprendi">O que aprendi</a></li>
    </ul>
  </div>

  <article>
    <section id="numeros">
      <h2>Em números</h2>
      <ul class="stats">
        ${c.stats.map(([n, l]) => `<li><b>${esc(n)}</b><span>${esc(l)}</span></li>`).join('\n        ')}
      </ul>
      <p class="fine">Números tirados da configuração e do código do projeto. Nenhum dado de cliente ou de negócio.</p>
    </section>

    <section id="contexto">
      <h2>Contexto</h2>
      ${c.context.map((p) => `<p>${esc(p)}</p>`).join('\n      ')}
      <h3 class="sub">O desafio</h3>
      <p>${esc(c.challenge)}</p>
    </section>

    <section id="como-funciona">
      <h2>Como funciona</h2>
      <p>${esc(c.flowIntro)}</p>
      <div class="flow" role="img" aria-label="${esc('Diagrama: ' + c.flow.map((l) => l.map((n) => n[0]).join(' e ')).join(', depois '))}">
        ${flowHtml(c.flow)}
      </div>
    </section>

    <section id="o-que-fiz">
      <h2>O que eu fiz</h2>
      <ul class="did">
        ${c.did.map(([b, s]) => `<li><b>${esc(b)}</b><span>${esc(s)}</span></li>`).join('\n        ')}
      </ul>
    </section>

    <section id="antes-depois">
      <h2>Antes e depois</h2>
      <div class="compare">
        <div class="col"><h3>Antes</h3><ul>${c.before.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="col after"><h3>Depois</h3><ul>${c.after.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
      </div>
    </section>

    <section id="aprendi">
      <h2>O que aprendi</h2>
      <p class="lesson">${esc(c.learn)}</p>
      <div class="evidence">
        <p>O código e os dados são da empresa e não podem ser publicados.${c.evidence ? ' ' + esc(c.evidence[0]) : ''}</p>
        ${c.evidence ? `<a class="btn" href="${esc(c.evidence[1])}">Ver projeto público</a>` : '<a class="btn" href="../#contato">Conversar sobre este case</a>'}
      </div>
    </section>
  </article>

  <nav class="pager" aria-label="Outros cases">
    <a href="${prev.id}.html"><span>← Case anterior</span>${esc(prev.title)}</a>
    <a class="next" href="${next.id}.html"><span>Próximo case →</span>${esc(next.title)}</a>
  </nav>
</main>

<footer>
  <div class="wrap"><span>© 2026 Kevin Alves Quirino</span><span>Case descrito sem dados, nomes ou regras internas da empresa.</span></div>
</footer>

<script src="../assets/js/tema.js" defer></script>
</body>
</html>
`;
}

function card(c) {
  const external = Boolean(c.repo);
  const nums = c.card.map(([n, l]) => `<span><b>${esc(n)}</b>${esc(l)}</span>`).join('');
  const tags = c.tools.map((t) => `<li>${esc(t)}</li>`).join('');
  return `        <a class="case" href="${esc(external ? c.repo : `cases/${c.id}.html`)}">
          <span class="case-top"><h3>${esc(c.title)}</h3><span class="st ${external ? 'wip' : 'pass'}">${external ? 'Código aberto' : esc(c.stText)}</span></span>
          <p>${esc(c.sum)}</p>
          <span class="nums">${nums}</span>
          <ul class="tags" aria-label="Ferramentas">${tags}</ul>
          <span class="go">${external ? 'Ver no GitHub →' : 'Ler o case →'}</span>
        </a>`;
}

/** Trabalho primeiro, depois os públicos; em Produto, só trabalho. */
function cardsHtml() {
  const grid = (kind, id, label) => {
    const items = [...cases.filter((c) => c.kind === kind), ...PUBLIC.filter((c) => c.kind === kind)];
    return `      <div class="cases" id="${id}" role="tabpanel" aria-labelledby="${label}"${kind === 'Produto' ? ' hidden' : ''}>\n${items.map(card).join('\n')}\n      </div>`;
  };
  return `<!-- cases:inicio -->\n${grid('Qualidade', 'cases-qualidade', 'seg-q')}\n${grid('Produto', 'cases-produto', 'seg-p')}\n<!-- cases:fim -->`;
}

function sitemap() {
  const urls = ['/', ...cases.map((c) => `/cases/${c.id}.html`)];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}\n</urlset>\n`;
}

const outputs = new Map();
for (const [i, c] of cases.entries()) outputs.set(path.join(ROOT, 'cases', `${c.id}.html`), casePage(c, i));
const indexFile = path.join(ROOT, 'index.html');
const index = fs.readFileSync(indexFile, 'utf8');
const markers = /<!-- cases:inicio -->[\s\S]*<!-- cases:fim -->/;
if (!markers.test(index)) throw new Error('index.html sem os marcadores <!-- cases:inicio --> e <!-- cases:fim -->');
outputs.set(indexFile, index.replace(markers, cardsHtml()));
outputs.set(path.join(ROOT, 'sitemap.xml'), sitemap());

const known = new Set(cases.map((c) => `${c.id}.html`));
const stale = fs.existsSync(path.join(ROOT, 'cases')) ? fs.readdirSync(path.join(ROOT, 'cases')).filter((f) => !known.has(f)) : [];

if (check) {
  const outdated = [...outputs].filter(([file, text]) => !fs.existsSync(file) || fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') !== text).map(([file]) => path.relative(ROOT, file));
  outdated.push(...stale.map((f) => `cases/${f} (sobrando)`));
  if (outdated.length) {
    console.error(`Arquivos desatualizados, rode npm run cases:\n  ${outdated.join('\n  ')}`);
    process.exit(1);
  }
  console.log(`Cases em dia: ${cases.length} páginas, ${cases.length + PUBLIC.length} cartões.`);
} else {
  fs.mkdirSync(path.join(ROOT, 'cases'), { recursive: true });
  for (const f of stale) fs.rmSync(path.join(ROOT, 'cases', f));
  for (const [file, text] of outputs) fs.writeFileSync(file, text);
  console.log(`Gerado: ${cases.length} páginas de case, ${cases.length + PUBLIC.length} cartões e o sitemap.`);
}
