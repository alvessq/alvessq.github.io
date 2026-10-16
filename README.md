# alvessq.github.io

[![Verificar site](https://github.com/alvessq/alvessq.github.io/actions/workflows/verificar.yml/badge.svg)](https://github.com/alvessq/alvessq.github.io/actions/workflows/verificar.yml)

Meu portfólio: **https://alvessq.github.io**

Sou Kevin Alves Quirino, analista de qualidade (QA) com visão de produto. O site reúne os projetos do meu trabalho, contados sem dados das empresas, e os projetos públicos que você pode abrir e rodar.

## O que tem no site

- **Projetos**, em duas abas:
  - **Qualidade:** testes automáticos de um app de crédito, testes na nuvem, triagem de falhas, painel de acompanhamento e monitoramento de um sistema de auditoria.
  - **Produto:** atuação como Product Owner e a proposta de automação.

  Cada case de trabalho tem página própria, com números, diagrama, o que eu fiz, antes e depois, e o que aprendi.
- **Como trabalho:** as cinco etapas, da ideia ao cliente, com exemplos.
- **Ferramentas**, **trajetória** e **contato**.
- Tema escuro por padrão, com opção de tema claro, e layout que funciona no celular.

## Como é feito

HTML, CSS e JavaScript puros, sem framework e sem etapa de build para publicar. O GitHub Pages serve os arquivos como estão.

```text
.
├── index.html                 # página inicial
├── cases/                     # uma página por case (gerada)
├── 404.html
├── assets/
│   ├── css/                   # site.css (home) e case.css (cases)
│   ├── js/                    # tema.js e site.js
│   ├── img/                   # foto, favicon e imagem de compartilhamento
│   └── cv/                    # currículos em PDF
├── scripts/
│   ├── cases-data.mjs         # fonte única dos cases
│   ├── gerar-cases.mjs        # gera cases/, os cartões da home e o sitemap
│   └── verificar-links.mjs    # confere links, âncoras, alt e lang
└── .github/workflows/verificar.yml
```

Os cases ficam num arquivo só ([`scripts/cases-data.mjs`](scripts/cases-data.mjs)). O gerador monta as páginas e os cartões da home a partir dele, então o texto nunca fica diferente entre a home e a página do case.

## Rodar localmente

Precisa de Node.js 20 ou mais novo.

```bash
npm run cases       # gera as páginas dos cases depois de mudar os dados
npm run verificar   # confere se está tudo gerado e se nenhum link quebrou
npm run servir      # abre em http://localhost:8080
```

A CI roda `npm run verificar` a cada push.

## Projetos públicos

- [qa-automation-portfolio](https://github.com/alvessq/qa-automation-portfolio): testes mobile (Appium + WebdriverIO), testes web (Playwright) e o painel que agenda e acompanha tudo.

## Contato

- LinkedIn: [Kevin Alves Quirino](https://www.linkedin.com/in/kevin-alves-quirino-0942091b9/)
- E-mail: kevinalvessq@gmail.com
