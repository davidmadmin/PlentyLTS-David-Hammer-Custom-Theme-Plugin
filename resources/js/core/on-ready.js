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

  window.HammerThemeHeader = window.HammerThemeHeader || {};
  window.HammerThemeHeader.onReady = onReady;
  window.HammerThemeHeader.runOnce = runOnce;
})(window);
