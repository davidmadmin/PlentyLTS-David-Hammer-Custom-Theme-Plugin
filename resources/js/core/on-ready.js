(function (window) {
  const executedKeys = new Set();

  function onReady(callback) {
    if (typeof callback !== 'function') return;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }

    callback();
  }

  function runOnce(key, initializer) {
    if (!key || typeof initializer !== 'function' || executedKeys.has(key)) return;

    executedKeys.add(key);
    initializer();
  }


  function enforceSingleHeaderWidget() {
    const widgets = Array.prototype.slice.call(document.querySelectorAll('[data-hammer-header-widget="true"]'));

    if (widgets.length <= 1) return;

    widgets.slice(1).forEach(function (widget, index) {
      widget.setAttribute('data-hammer-header-duplicate', 'true');
      widget.setAttribute('hidden', 'hidden');
      widget.style.display = 'none';
      widget.setAttribute('aria-hidden', 'true');

      if (index === 0) {
        window.console && window.console.warn && window.console.warn('[HammerTheme] Mehr als ein Header-Widget gefunden. Nur die erste Instanz wird ausgegeben.');
      }
    });
  }

  window.HammerThemeHeader = window.HammerThemeHeader || {};
  window.HammerThemeHeader.onReady = onReady;
  window.HammerThemeHeader.runOnce = runOnce;
  window.HammerThemeHeader.enforceSingleHeaderWidget = enforceSingleHeaderWidget;
})(window);
