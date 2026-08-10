// Переключатель языка. Выбор запоминается: человек, пришедший по ссылке из
// англоязычного интерфейса приложения, не должен каждый раз жать «EN».
(function () {
  var KEY = 'relokit-lang';
  var supported = ['ru', 'en'];

  function pick() {
    // Порядок важен: явная ссылка сильнее прошлого выбора. Иначе человек,
    // которому дали `?lang=en`, видел русскую страницу только потому, что
    // когда-то нажимал «RU» — и никакая ссылка это не переубеждала.
    var url = new URLSearchParams(location.search).get('lang');
    if (supported.indexOf(url) >= 0) return url;

    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) { /* приватный режим */ }
    if (supported.indexOf(saved) >= 0) return saved;

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
