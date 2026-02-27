(function (window, document) {
  const ASSET_ROOT = (function resolveAssetRoot() {
    const currentScript = document.currentScript;

    if (currentScript && currentScript.src) {
      return currentScript.src.replace(/\/main\.js(?:\?.*)?$/, '');
    }

    return '';
  })();

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
      rootCandidates.push(ASSET_ROOT + '/resources/js/' + relativePath);
    }

    rootCandidates.push('resources/js/' + relativePath);

    return rootCandidates;
  }

  function bootHeaders() {
    const api = window.HammerThemeHeader || {};

    if (typeof api.initHeaderFH === 'function') api.initHeaderFH();
    if (typeof api.initHeaderSH === 'function') api.initHeaderSH();
  }

  loadScriptFromCandidates(getScriptCandidates('core/on-ready.js'), function (hasReadyScript) {
    if (!hasReadyScript) {
      bootHeaders();
      return;
    }

    loadScriptFromCandidates(getScriptCandidates('modules/header-fh.js'), function () {
      loadScriptFromCandidates(getScriptCandidates('modules/header-sh.js'), function () {
        bootHeaders();
      });
    });
  });
})(window, document);
