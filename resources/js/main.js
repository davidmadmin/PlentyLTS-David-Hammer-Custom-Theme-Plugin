(function (window, document) {
  function trimTrailingSlash(value) {
    return (value || '').replace(/\/+$/, '');
  }

  function resolveAssetRoot() {
    const currentScript = document.currentScript;

    if (currentScript && currentScript.dataset && currentScript.dataset.assetRoot) {
      return trimTrailingSlash(currentScript.dataset.assetRoot);
    }

    if (currentScript && currentScript.src) {
      return trimTrailingSlash(currentScript.src.replace(/\/main\.js(?:\?.*)?$/, ''));
    }

    const scripts = document.getElementsByTagName('script');

    for (let index = scripts.length - 1; index >= 0; index -= 1) {
      const script = scripts[index];
      const src = script && script.getAttribute('src');

      if (!src) continue;
      if (!/\/resources\/js\/main\.js(?:\?.*)?$/.test(src) && !/\/js\/main\.js(?:\?.*)?$/.test(src)) continue;

      return trimTrailingSlash(src.replace(/\/main\.js(?:\?.*)?$/, ''));
    }

    return '';
  }

  const ASSET_ROOT = resolveAssetRoot();

  function loadScriptFromCandidates(candidates, callback) {
    const paths = Array.isArray(candidates) ? candidates.slice() : [candidates];

    function tryNext() {
      const nextPath = paths.shift();

      if (!nextPath) {
        if (typeof callback === 'function') callback(false);
        return;
      }

      const script = document.createElement('script');
      script.src = nextPath;
      script.onload = function () {
        if (typeof callback === 'function') callback(true);
      };
      script.onerror = tryNext;
      document.head.appendChild(script);
    }

    tryNext();
  }

  function getScriptCandidates(relativePath) {
    const rootCandidates = [];

    if (ASSET_ROOT) {
      rootCandidates.push(ASSET_ROOT + '/' + relativePath);
    }

    if (ASSET_ROOT && ASSET_ROOT.indexOf('/resources/js') === -1) {
      rootCandidates.push(ASSET_ROOT + '/resources/js/' + relativePath);
    }

    rootCandidates.push('/resources/js/' + relativePath);

    return rootCandidates;
  }

  function bootHeaders() {
    const api = window.HammerThemeHeader || {};

    if (typeof api.initHeaderFH === 'function') api.initHeaderFH();
    if (typeof api.initHeaderSH === 'function') api.initHeaderSH();
  }

  function loadHeaderModules() {
    loadScriptFromCandidates(getScriptCandidates('core/on-ready.js'), function () {
      loadScriptFromCandidates(getScriptCandidates('modules/header-fh.js'), function () {
        loadScriptFromCandidates(getScriptCandidates('modules/header-sh.js'), function () {
          bootHeaders();
        });
      });
    });
  }

  loadHeaderModules();
})(window, document);
