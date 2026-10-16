// Fonte única dos cases: gera os cartões da home e uma página por case (npm run cases).
// Números vêm do código e da configuração do projeto real, nunca de dados de clientes.
export default [
  {
    id: 'app-credito', kind: 'Qualidade', title: 'Testes automáticos de um app de crédito', stText: 'Trabalho · dados protegidos',
    sum: 'Criei os testes automáticos do aplicativo de crédito para pessoas, cobrindo as jornadas que o cliente mais usa.',
    card: [['5', 'jornadas automatizadas'], ['9', 'telas mapeadas']],
    role: 'Propus e construí', when: '2025–2026', tools: ['Appium', 'WebdriverIO', 'TypeScript'],
    stats: [['5', 'jornadas do cliente automatizadas'], ['9', 'telas do app mapeadas para os testes'], ['100%', 'dos elementos com id encontrados pelo id, não pelo texto'], ['5 min', 'entre cada conferência dos 5 serviços por trás do app']],
    context: ['Um aplicativo de crédito para pessoas, em que os testes no celular eram feitos à mão antes de cada versão.', 'Cada nova versão exigia alguém repetindo os mesmos passos: entrar no app, simular, escolher uma oferta e seguir até a contratação.'],
    challenge: 'Testar login, simulação e contratação sem depender de alguém repetindo os mesmos passos a cada entrega, e sem gerar contratos sem querer.',
    flowIntro: 'Primeiro os serviços por trás do app são conferidos um a um. Depois o teste segue a ordem em que o cliente usa o app:',
    flow: [
      [['Login com senha', 'serviço ok?', 'accent'], ['Login com código', 'serviço ok?', 'accent'], ['Propostas', 'serviço ok?', 'accent'], ['Ofertas', 'serviço ok?', 'accent'], ['Envio de SMS', 'serviço ok?', 'accent']],
      [['Login com senha'], ['Login com código por SMS']],
      [['Simulação com ofertas'], ['Escolher e editar a oferta']],
      [['Contratação', 'só roda com confirmação manual', 'wip']],
      [['Vídeo e registros', 'de cada execução', 'pass']]
    ],
    did: [
      ['Automatizei as jornadas principais', 'Login com senha e com código por SMS, simulação, escolha e edição de ofertas e contratação.'],
      ['Achei os elementos pelo id', 'O teste encontra botões e campos pelo identificador do elemento, que não muda quando o texto da tela muda. Texto só em avisos que não tinham id e nos diálogos do próprio Android.'],
      ['Separei em dois níveis', 'Um teste rápido confere o essencial. O completo passa pela simulação e pelas ofertas.'],
      ['Protegi a contratação', 'O teste que contrata só roda com confirmação de uma pessoa, para não gerar contratos sem querer.'],
      ['Conferi os serviços primeiro', '5 serviços são conferidos separadamente durante o expediente: login com senha, login com código, propostas e ofertas a cada 5 minutos, e envio de SMS a cada 30. Cada um dá o seu resultado, então, se um cai, o time sabe em até 5 minutos qual foi.'],
      ['Guardei evidências', 'Cada execução grava vídeo e registros, para qualquer pessoa ver o que aconteceu.']
    ],
    before: ['Testes do app feitos à mão a cada versão', 'Mesmos passos repetidos por uma pessoa', 'Pouca evidência quando algo dava errado'],
    after: ['Jornadas principais conferidas sozinhas', 'Teste rápido e completo, para cada momento', 'Vídeo e registros de cada execução'],
    learn: 'Conferir os serviços antes de abrir o app evita culpar a tela por um problema que está nos bastidores. E achar os elementos pelo id, e não pelo texto, fez os testes sobreviverem a mudanças de texto nas telas.',
    evidence: ['A mesma abordagem, com localizadores por id, está no meu projeto público de testes de um app de compras.', 'https://github.com/alvessq/qa-automation-portfolio/tree/main/apps/mobile-e2e']
  },
  {
    id: 'nuvem', kind: 'Qualidade', title: 'Testes de celular rodando sozinhos na nuvem', stText: 'Trabalho · dados protegidos',
    sum: 'Fiz os testes do app rodarem num celular virtual na nuvem, em horários agendados, sem ninguém precisar apertar um botão.',
    card: [['4x', 'por dia, o teste rápido'], ['14 dias', 'de vídeos guardados']],
    role: 'Construí', when: '2025–2026', tools: ['GitHub Actions', 'Emulador Android', 'Appium'],
    stats: [['4x', 'por dia roda o teste rápido'], ['1x', 'por noite roda o teste completo'], ['14 dias', 'de vídeos, prints e registros guardados'], ['3', 'execuções entre cada reinício do emulador no computador']],
    context: ['Os testes funcionavam no meu computador, mas o celular virtual da nuvem travava ao abrir o app.', 'Sem a nuvem, os testes só rodavam quando alguém lembrava de rodar.'],
    challenge: 'Descobrir por que o mesmo teste passava na minha máquina e falhava na nuvem, sem gastar horas de execução tentando no escuro.',
    flowIntro: 'Do horário agendado até o resultado no painel:',
    flow: [
      [['Agenda', 'rápido a cada 6 horas · completo 1x por noite', 'accent']],
      [['Baixa a versão mais nova do app']],
      [['Celular virtual na nuvem', 'Android 14'], ['Modo local que imita a nuvem', 'para investigar sem custo']],
      [['Roda os testes', 'com vídeo gravado pelo próprio projeto']],
      [['Vídeo, prints e registros', 'guardados por 14 dias', 'pass'], ['Painel do time', 'mostra o resultado', 'pass']]
    ],
    did: [
      ['Reproduzi a nuvem no meu computador', 'Criei um modo que imita as condições da nuvem, sem placa de vídeo, para investigar sem gastar execuções.'],
      ['Estabilizei o celular virtual', 'Ajustei memória, versão do Android e configurações gráficas até ele parar de travar.'],
      ['Fiz falhar rápido', 'Se o celular virtual cai, a execução para na hora, em vez de esperar até o tempo acabar.'],
      ['Automatizei a versão do app', 'A versão mais nova é baixada sozinha antes de cada rodada.'],
      ['Preparei o computador sozinho', 'Ao abrir o painel, a versão mais nova do app é baixada e, se nenhum emulador estiver ligado, um é aberto em segundo plano, sem atrasar o painel.'],
      ['Reiniciei o emulador de tempos em tempos', 'No computador, o emulador é reiniciado a cada 3 execuções, sem apagar os dados, para não travar em sessões longas.'],
      ['Gravei o vídeo por conta própria', 'A gravação não depende do Appium. No computador ficam só os 3 vídeos mais recentes; na nuvem, cada execução guarda vídeo, prints e registros por 14 dias.']
    ],
    before: ['Testes rodavam só quando alguém lembrava', 'O celular virtual travava na nuvem', 'Investigar custava horas de execução', 'Preparar o computador era manual'],
    after: ['Rodam sozinhos em horários fixos', 'Celular virtual estável', 'Problema investigado no meu computador', 'App e emulador prontos ao abrir o painel'],
    learn: 'Reproduzir o problema perto de mim foi mais rápido do que tentar adivinhar o que acontecia lá longe.',
    evidence: ['Refiz do zero, no meu projeto público, o modo que imita a nuvem, a parada rápida quando o emulador cai, a reinicialização a cada 3 suítes e o preparo automático do app e do emulador.', 'https://github.com/alvessq/qa-automation-portfolio/tree/main/apps/mobile-e2e/scripts']
  },
  {
    id: 'triagem', kind: 'Qualidade', title: 'Separar bug de verdade de falha passageira', stText: 'Trabalho · dados protegidos',
    sum: 'Quando um teste falha, o sistema repete antes de avisar o time e só abre um chamado se o problema for real.',
    card: [['3 bugs', 'barrados em homologação'], ['4', 'alarmes falsos evitados']],
    role: 'Idealizei e construí', when: '2025–2026', tools: ['Node.js', 'Jira', 'Microsoft Teams'],
    stats: [['3 bugs', 'confirmados e abertos no Jira com vídeo, ainda em homologação: nenhum bug real foi ignorado'], ['4', 'alarmes falsos evitados: 2 falhas passageiras e 2 do emulador, conferidas de novo antes de chamar o time'], ['3', 'repetições antes de virar chamado'], ['12', 'sinais de problema de ambiente reconhecidos']],
    context: ['Os testes do aplicativo rodavam várias vezes por dia num celular virtual. Testes em celular às vezes falham por instabilidade, e não por erro no app.', 'Cada falha virava um alerta. Muitos eram alarmes falsos, e cada um tirava alguém do que estava fazendo.'],
    challenge: 'Avisar rápido quando existe um problema real, sem incomodar o time com falhas passageiras e sem deixar um bug de verdade passar.',
    flowIntro: 'Quando um teste falha, o sistema tenta de novo antes de avisar alguém:',
    flow: [
      [['Um teste falha', '', 'risk']],
      [['Repete o mesmo teste até 3 vezes', 'cada repetição grava vídeo e registros']],
      [['Bug confirmado', 'falhou nas 3: chamado no Jira e aviso no Teams', 'risk'], ['Falha passageira', 'passou em alguma: só um aviso curto', 'wip'], ['Problema de ambiente', 'o celular virtual caiu: sem chamado', 'accent']],
      [['Painel do time', 'mostra cada repetição e o vídeo', 'pass']]
    ],
    did: [
      ['Defini a regra das 3 repetições', 'Uma falha só vira bug quando se repete. Uma única falha não basta para chamar o time.'],
      ['Liguei os testes ao Jira', 'O chamado já nasce com vídeo, registros e o passo em que o teste parou.'],
      ['Evitei chamados duplicados', 'Antes de abrir um chamado, o sistema procura se já existe um aberto para o mesmo problema.'],
      ['Reconheci problemas de ambiente', '12 tipos de mensagem de celular virtual desligado ou travado são tratados como ambiente, não como bug.'],
      ['Mostrei tudo no painel', 'Cada repetição, com o resultado e o vídeo, aparece no painel do time.']
    ],
    before: ['Toda falha virava alerta', 'O time investigava alarmes falsos', 'Chamado aberto à mão, sem evidência'],
    after: ['Bugs barrados em homologação, antes do cliente', 'Só falha confirmada vira chamado', 'Falha passageira gera só um aviso curto', 'Chamado chega com vídeo e registros'],
    learn: 'Um alerta só ajuda quando as pessoas confiam nele. Avisar menos, e com mais certeza, fez mais diferença do que avisar tudo.',
    evidence: ['Refiz do zero, no meu projeto público, a triagem com 3 repetições, chamado sem duplicar e detecção de problema de ambiente. Lá o chamado é uma issue do GitHub, no lugar do Jira.', 'https://github.com/alvessq/qa-automation-portfolio/blob/main/apps/test-scheduler/src/triage.mjs']
  },
  {
    id: 'painel', kind: 'Qualidade', title: 'Painel único de acompanhamento dos testes', stText: 'Trabalho · dados protegidos',
    sum: 'Evoluí, junto com o time, um painel que mostra num lugar só os resultados, a agenda e os vídeos dos testes.',
    card: [['3', 'frentes num painel só'], ['22', 'passos explicados em português']],
    role: 'Evoluí junto com o time', when: '2025–2026', tools: ['React', 'Node.js', 'GitHub Actions'],
    stats: [['3', 'frentes num painel só: computador, nuvem e auditoria'], ['22', 'passos de teste explicados em português'], ['14', 'configurações conferidas ao abrir o painel'], ['0', 'testes de celular rodando sem alguém decidir']],
    context: ['Os resultados ficavam espalhados entre o computador de quem rodou, a nuvem e as mensagens do time.', 'Quem não era da área técnica não tinha como saber, sozinho, como os testes estavam.'],
    challenge: 'Dar a qualquer pessoa do time uma forma simples de ver como estão os testes, sem precisar entender as ferramentas por trás.',
    flowIntro: 'Tudo o que roda, em qualquer lugar, chega no mesmo painel:',
    flow: [
      [['Testes no computador'], ['Testes na nuvem'], ['Testes da auditoria']],
      [['Painel único', '', 'accent']],
      [['Resultados e vídeos', '', 'pass'], ['Agenda por teste', 'intervalo e horário próprios', 'pass'], ['Nuvem pelo painel', 'disparar e agendar execuções', 'pass'], ['Passo a passo', 'cada teste contado em português', 'pass']]
    ],
    did: [
      ['Reuni os resultados', 'Resultados, vídeos e registros de cada execução, do computador e da nuvem, num lugar só.'],
      ['Dei controle ao time', 'Dá para agendar, iniciar, parar, editar e reordenar os testes pelo próprio painel.'],
      ['Agenda própria para cada teste', 'Cada teste tem seu intervalo e seu horário de funcionamento. A edição é feita direto na lista, a exclusão pede confirmação e o painel conta as execuções.'],
      ['Liguei o painel à nuvem', 'Pelo painel dá para disparar as execuções da nuvem e mudar os horários em que elas rodam.'],
      ['Juntei a auditoria', 'Os testes do sistema de auditoria ganharam uma área própria dentro do mesmo painel.'],
      ['Traduzi os testes', 'Cada passo do teste aparece em português, para quem não lê código entender o que foi testado.'],
      ['Comecei seguro', 'Ao abrir, os testes de celular ficam pausados. Nada roda sem alguém decidir.'],
      ['Avisei o que falta', 'Na abertura, o painel lista 14 configurações e avisa quais estão faltando, sem mostrar nenhuma senha.']
    ],
    before: ['Resultados espalhados em vários lugares', 'Só quem rodou sabia o que aconteceu', 'Execuções da nuvem disparadas fora do painel', 'Configurações faltando só apareciam como erro'],
    after: ['Tudo num painel só', 'Passo a passo em português para o time todo', 'Nuvem disparada e agendada pelo painel', 'O painel avisa o que falta logo ao abrir'],
    learn: 'Uma ferramenta usada pelo time todo precisa ser segura por padrão. Começar pausado evitou execuções sem querer.',
    evidence: ['Refiz o painel do zero, no meu projeto público, com o mesmo desenho: visão geral, abas Local, GitHub e Issues, fila única que dá para reordenar, health por serviço, agenda da nuvem, vídeo das falhas, aviso de configuração faltando e início pausado.', 'https://github.com/alvessq/qa-automation-portfolio/tree/main/apps/test-scheduler']
  },
  {
    id: 'auditoria', kind: 'Qualidade', title: 'Monitoramento de um sistema de auditoria', stText: 'Trabalho · dados protegidos',
    sum: 'Testes que entram sozinhos num sistema web de auditoria de propostas de crédito e conferem, ao longo do dia, se ele continua funcionando.',
    card: [['5 min', 'entre cada conferência'], ['120', 'conferências por dia']],
    role: 'Construí', when: '2025–2026', tools: ['Playwright', 'TypeScript', 'Node.js'],
    stats: [['5 min', 'entre cada conferência do sistema'], ['120', 'conferências por dia útil'], ['10 h', 'por dia de monitoramento, das 8h às 18h'], ['1 h', 'entre cada teste de montagem das filas']],
    context: ['Um sistema web em que a equipe audita propostas de crédito, organizadas em filas de trabalho que o próprio sistema monta.', 'Se o sistema saísse do ar ou parasse de montar as filas, a equipe só descobria quando tentava trabalhar.'],
    challenge: 'Saber durante o expediente se o sistema está no ar e se as filas continuam sendo montadas, sem alguém precisar entrar para conferir.',
    flowIntro: 'Durante o expediente, duas verificações rodam em paralelo:',
    flow: [
      [['Agenda do horário comercial', 'das 8h às 18h', 'accent']],
      [['Conferência rápida', 'a cada 5 minutos: o sistema responde?'], ['Teste completo', 'a cada 1 hora: as filas são montadas?']],
      [['Histórico e vídeos', '', 'pass'], ['Painel do time', '', 'pass'], ['Jira', '', 'pass']]
    ],
    did: [
      ['Criei a conferência rápida', 'A cada 5 minutos, um teste checa se o sistema responde.'],
      ['Testei o que importa', 'Um teste entra no sistema, pede para montar as filas de propostas e confere a mensagem de confirmação.'],
      ['Respeitei o expediente', 'Os testes rodam das 8h às 18h, quando a equipe usa o sistema.'],
      ['Montei a agenda', 'Fila, histórico, vídeos e controles para rodar, parar e editar cada teste.'],
      ['Liguei ao resto', 'A agenda usa o mesmo painel e o mesmo Jira dos testes do aplicativo.']
    ],
    before: ['Problemas descobertos por quem tentava usar', 'Ninguém conferia o sistema ao longo do dia', 'Sem histórico do que aconteceu'],
    after: ['Conferência a cada 5 minutos', 'Montagem das filas testada a cada hora', 'Histórico e vídeos no painel'],
    learn: 'Rodar os testes só no horário em que as pessoas trabalham deixa os avisos úteis e evita alarmes de madrugada sem ninguém para agir.',
    evidence: ['No meu projeto público, uma loja de demonstração tem 5 conferências separadas a cada 5 minutos, das 8h às 18h, no mesmo formato.', 'https://github.com/alvessq/qa-automation-portfolio/blob/main/apps/web-e2e/scripts/health.mjs']
  },
  {
    id: 'po-auditoria', kind: 'Produto', title: 'Product Owner do sistema de auditoria', stText: 'Trabalho · dados protegidos',
    sum: 'Fui a referência de regra de negócio do sistema de auditoria e atuei por um período como Product Owner do produto.',
    card: [['PO', 'por um período'], ['Referência', 'em regra de negócio']],
    role: 'Product Owner por um período', when: '2025–2026', tools: ['Discovery', 'Refinamento', 'Critérios de aceite', 'Jira'],
    stats: [['PO', 'do produto por um período'], ['Referência', 'do time em regra de negócio'], ['Discovery', 'com quem usa o sistema'], ['Critérios', 'de aceite em cada história']],
    context: ['Um sistema web em que uma equipe interna audita propostas de crédito, com regras de negócio detalhadas e muitas exceções.'],
    challenge: 'Traduzir o que a equipe de auditoria precisava em entregas claras para o time de tecnologia.',
    flowIntro: 'O caminho de uma necessidade até virar entrega testada:',
    flow: [
      [['Necessidade da equipe de auditoria', '', 'accent']],
      [['Discovery', 'entender o problema com quem usa']],
      [['Refinamento', 'histórias com critérios de aceite']],
      [['Prioridade', 'decidida como PO']],
      [['Desenvolvimento'], ['Testes', 'baseados nas mesmas regras', 'pass']]
    ],
    did: [
      ['Virei referência em regra de negócio', 'Aprendi a fundo as regras da auditoria e passei a responder as dúvidas do time.'],
      ['Participei do discovery', 'Entendi com quem usa o sistema quais eram os problemas e as necessidades.'],
      ['Conduzi refinamentos', 'Transformei as demandas em histórias com critérios de aceite claros.'],
      ['Levei ideias', 'Propus melhorias para o produto a partir do que via no uso e nos testes.'],
      ['Atuei como PO', 'Por um período, cuidei das prioridades do time.']
    ],
    before: ['Dúvidas de regra sem uma referência clara', 'Demandas chegando abertas ao desenvolvimento'],
    after: ['Uma referência no time para regra de negócio', 'Histórias com critérios de aceite claros'],
    learn: 'Entender por que cada regra existe me deixou melhor nas duas funções: como PO, para priorizar, e como QA, para saber o que testar.',
    evidence: null
  },
  {
    id: 'proposta', kind: 'Produto', title: 'Como propus testes automáticos no celular', stText: 'Trabalho · dados protegidos',
    sum: 'Como mostrei o valor de automatizar os testes do aplicativo antes de pedir tempo ao time.',
    card: [['Do zero', 'até a primeira versão'], ['3', 'projetos que vieram depois']],
    role: 'Propus e construí', when: '2025–2026', tools: ['Visão de produto', 'Appium'],
    stats: [['0 → 1', 'da ideia à primeira suíte automatizada'], ['3', 'projetos construídos em cima dela: nuvem, triagem e painel'], ['1', 'escopo pequeno para começar'], ['App', 'financeiro para pessoas']],
    context: ['Um aplicativo financeiro em que todos os testes de celular eram feitos à mão.'],
    challenge: 'Convencer o time de que valia a pena investir em automação, sem pedir um projeto grande logo de cara.',
    flowIntro: 'Da ideia até virar a base de outros projetos:',
    flow: [
      [['Mapa dos fluxos críticos'], ['Tempo gasto no teste manual']],
      [['Proposta', 'começar pequeno e medir', 'accent']],
      [['Primeira versão automatizada']],
      [['Testes na nuvem', '', 'pass'], ['Triagem de falhas', '', 'pass'], ['Painel do time', '', 'pass']]
    ],
    did: [
      ['Mapeei o que importa', 'Levantei os caminhos mais importantes do app e quanto tempo os testes manuais levavam.'],
      ['Propus começar pequeno', 'Uma primeira versão com escopo reduzido e resultado fácil de medir.'],
      ['Construí a primeira versão', 'Os primeiros testes automáticos do app, com Appium.'],
      ['Usei como base', 'Em cima dela vieram os testes na nuvem, a triagem de falhas e o painel.']
    ],
    before: ['Todos os testes de celular feitos à mão', 'Automação vista como custo'],
    after: ['Fluxos críticos automatizados', 'Base para os projetos seguintes'],
    learn: 'Começar pequeno e mostrar resultado convence mais do que um plano grande.',
    evidence: null
  }
];
