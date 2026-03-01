(function (window, document) {
  function log(level, message, detail) {
    if (!window || !window.console) return;

    const logger = typeof window.console[level] === 'function' ? window.console[level] : window.console.log;

    if (typeof detail === 'undefined') logger.call(window.console, '[HammerTheme]', message);
    else logger.call(window.console, '[HammerTheme]', message, detail);
  }

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
        log('error', 'failed to load script candidates', candidates);
        if (typeof callback === 'function') callback(false);
        return;
      }

      const script = document.createElement('script');
      script.src = nextPath;
      script.onload = function () {
        log('info', 'loaded script', nextPath);
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

    if (typeof api.enforceSingleHeaderWidget === 'function') {
      api.enforceSingleHeaderWidget();
    }

    log('info', 'booting header modules', {
      hasFH: typeof api.initHeaderFH === 'function',
      hasSH: typeof api.initHeaderSH === 'function',
    });

    if (typeof api.initHeaderFH === 'function') api.initHeaderFH();
    if (typeof api.initHeaderSH === 'function') api.initHeaderSH();

    log('info', 'header module boot sequence completed');
  }

  loadScriptFromCandidates(getScriptCandidates('core/on-ready.js'), function () {
    loadScriptFromCandidates(getScriptCandidates('modules/header-fh.js'), function () {
      loadScriptFromCandidates(getScriptCandidates('modules/header-sh.js'), function () {
        bootHeaders();
      });
    });
  });
})(window, document);
