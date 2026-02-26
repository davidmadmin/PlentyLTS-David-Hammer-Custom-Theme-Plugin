(function (window, document) {
  const ASSET_ROOT = (function resolveAssetRoot() {
    const currentScript = document.currentScript;

    if (currentScript && currentScript.src) {
      return currentScript.src.replace(/\/main\.js(?:\?.*)?$/, '');
    }

    return '';
  })();

  function resolveAssetPath(relativePath) {
    return ASSET_ROOT ? ASSET_ROOT + '/' + relativePath : relativePath;
  }

  function loadScript(relativePath, callback) {
    const script = document.createElement('script');
    script.src = resolveAssetPath(relativePath);
    script.defer = true;
    script.onload = function () {
      if (typeof callback === 'function') callback();
    };
    script.onerror = function () {
      if (typeof callback === 'function') callback();
    };
    document.head.appendChild(script);
  }

  function bootHeaders() {
    const api = window.HammerThemeHeader || {};

    if (typeof api.initHeaderFH === 'function') api.initHeaderFH();
    if (typeof api.initHeaderSH === 'function') api.initHeaderSH();
  }

  loadScript('core/on-ready.js', function () {
    loadScript('modules/header-fh.js', function () {
      loadScript('modules/header-sh.js', bootHeaders);
    });
  });
})(window, document);
