// Tema escuro por padrão, com opção de claro lembrada no navegador. O <head> de
// cada página já aplica o tema salvo antes de desenhar, para não piscar.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-btn');
  if (!btn) return;
  function apply(light) {
    if (light) root.dataset.theme = 'light';
    else delete root.dataset.theme;
    btn.textContent = light ? 'Tema escuro' : 'Tema claro';
    btn.setAttribute('aria-pressed', String(light));
  }
  apply(root.dataset.theme === 'light');
  btn.addEventListener('click', function () {
    var light = root.dataset.theme !== 'light';
    apply(light);
    try {
      localStorage.setItem('tema', light ? 'light' : 'dark');
    } catch (e) {
      // Sem localStorage (janela anônima): o tema só não é lembrado.
    }
  });
})();
