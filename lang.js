// Переключатель языка. Выбор запоминается: человек, пришедший по ссылке из
// англоязычного интерфейса приложения, не должен каждый раз жать «EN».
(function () {
  var KEY = 'relokit-lang';
  var supported = ['ru', 'en'];

  function pick() {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) { /* приватный режим */ }
    if (supported.indexOf(saved) >= 0) return saved;
    var url = new URLSearchParams(location.search).get('lang');
    if (supported.indexOf(url) >= 0) return url;
    return (navigator.language || 'ru').toLowerCase().indexOf('ru') === 0
      ? 'ru'
      : 'en';
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('section[data-lang]').forEach(function (node) {
      node.classList.toggle('active', node.getAttribute('data-lang') === lang);
    });
    document.querySelectorAll('.langs button').forEach(function (button) {
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.lang === lang)
      );
    });
    try { localStorage.setItem(KEY, lang); } catch (e) { /* не критично */ }
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(pick());
    document.querySelectorAll('.langs button').forEach(function (button) {
      button.addEventListener('click', function () { apply(button.dataset.lang); });
    });
  });
})();
