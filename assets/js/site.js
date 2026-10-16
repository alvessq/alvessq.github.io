// Home: abas Qualidade/Produto dos projetos, etapas clicáveis de "Como trabalho"
// e o botão de copiar e-mail. Sem JavaScript, os projetos continuam visíveis.
(function () {
  function $(id) {
    return document.getElementById(id);
  }

  var toastTimer;
  function toast(message) {
    var el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.hidden = true;
    }, 1800);
  }

  /* ---------- copiar e-mail ---------- */
  var copy = $('copy-email');
  if (copy) {
    copy.addEventListener('click', function () {
      var email = $('email').textContent.trim();
      function select() {
        var range = document.createRange();
        range.selectNodeContents($('email'));
        var sel = getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        toast('E-mail selecionado. Use Ctrl+C para copiar.');
      }
      if (navigator.clipboard) navigator.clipboard.writeText(email).then(function () { toast('E-mail copiado'); }, select);
      else select();
    });
  }

  /* ---------- abas dos projetos ---------- */
  var notes = {
    Qualidade: 'Trabalho real, descrito sem dados das empresas, e projetos públicos com código aberto.',
    Produto: 'Experiências reais decidindo o que construir e por quê.',
  };
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.seg [role="tab"]'));
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $(t.getAttribute('aria-controls')).hidden = !on;
    });
    $('seg-note').textContent = notes[tab.dataset.kind] || '';
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      selectTab(tab);
    });
    tab.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        selectTab(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length], true);
      }
    });
  });
  if (tabs.length) selectTab(tabs[0]);

  /* ---------- etapas de "Como trabalho" ---------- */
  var stages = [
    {
      title: 'Mapa do que não pode dar errado',
      out: 'Prioridades definidas',
      html:
        '<p>Antes de testar, levanto com negócio e produto o que causa mais prejuízo se falhar. Foi assim que escolhi o que automatizar primeiro no app de crédito:</p>' +
        '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Parte do app</th><th>Prejuízo se falhar</th><th>Prioridade</th></tr></thead><tbody>' +
        '<tr><td>Entrar no app (senha ou código por SMS)</td><td>Alto: ninguém usa nada</td><td class="lvl hi">● Alta</td></tr>' +
        '<tr><td>Simular e ver as ofertas</td><td>Alto: o cliente não chega à contratação</td><td class="lvl hi">● Alta</td></tr>' +
        '<tr><td>Contratar</td><td>Alto: é onde o produto gera valor</td><td class="lvl hi">● Alta</td></tr>' +
        '<tr><td>Tutorial de boas-vindas</td><td>Médio: atrapalha, mas tem como seguir</td><td class="lvl md">● Média</td></tr></tbody></table></div>',
    },
    {
      title: 'Regra combinada com o time',
      out: 'Todos entendem o que é "pronto"',
      html:
        '<p>Escrevo as regras em frases simples, para que negócio, produto e tecnologia entendam a mesma coisa. Exemplo no formato que uso:</p>' +
        '<div class="rule"><span><b>Dado</b> que o cliente entrou no app com CPF e senha</span><span><b>Quando</b> ele abre a simulação e escolhe uma oferta</span><span><b>Então</b> consegue alterar o valor que quer receber</span><span><b>E</b> o valor novo aparece na oferta antes de seguir</span></div>',
    },
    {
      title: 'Plano de testes',
      out: 'Cada regra testada do jeito certo',
      html:
        '<p>Nem tudo precisa do mesmo tipo de teste. Distribuo o esforço onde ele pega mais problemas:</p>' +
        '<div class="bars"><div class="bar-row"><span>Conferência dos serviços</span><div class="bar" style="width:100%">rápida, roda antes de tudo</div></div>' +
        '<div class="bar-row"><span>Teste rápido do app</span><div class="bar" style="width:70%">o essencial: entrar no app</div></div>' +
        '<div class="bar-row"><span>Teste completo do app</span><div class="bar" style="width:50%">simulação e ofertas</div></div>' +
        '<div class="bar-row"><span>Só com confirmação</span><div class="bar" style="width:28%">contratação</div></div></div>',
    },
    {
      title: 'Testes que rodam sozinhos',
      out: 'Problemas encontrados antes do cliente',
      html:
        '<p>Os testes rodam sozinhos num emulador Android (um celular simulado) na nuvem, em horários agendados:</p>' +
        '<ol class="flow"><li>A versão mais nova do app é baixada sozinha</li><li>Um emulador liga na nuvem e roda os testes</li><li>Cada execução guarda vídeo, prints e registros</li><li>O resultado aparece no painel do time</li></ol>',
    },
    {
      title: 'Sinais de qualidade',
      out: 'Melhoria contínua',
      html:
        '<p>Depois da entrega, acompanho o que os testes estão dizendo e separo o que é problema real:</p>' +
        '<div class="kpis"><div class="kpi"><b>Bug confirmado</b><span>falhou nas 3 repetições: abre chamado com evidências</span></div>' +
        '<div class="kpi"><b>Falha passageira</b><span>passou em alguma repetição: só um aviso curto</span></div>' +
        '<div class="kpi"><b>Problema de ambiente</b><span>o emulador caiu: não é culpa do app</span></div>' +
        '<div class="kpi"><b>Serviços fora do ar</b><span>a conferência avisa antes de qualquer teste no app</span></div></div>',
    },
  ];
  var steps = Array.prototype.slice.call(document.querySelectorAll('.step'));
  function showStage(i, focus) {
    steps.forEach(function (s, k) {
      s.setAttribute('aria-selected', String(i === k));
      s.tabIndex = i === k ? 0 : -1;
    });
    var s = stages[i];
    $('panel').innerHTML = '<div class="panel-head"><b>' + s.title + '</b><span>Resultado: ' + s.out + '</span></div><div class="panel-body">' + s.html + '</div>';
    if (focus) steps[i].focus();
  }
  steps.forEach(function (s, i) {
    s.addEventListener('click', function () {
      showStage(i);
    });
    s.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        showStage((i + 1) % steps.length, true);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        showStage((i + steps.length - 1) % steps.length, true);
      }
    });
  });
  if (steps.length) showStage(0);
})();
