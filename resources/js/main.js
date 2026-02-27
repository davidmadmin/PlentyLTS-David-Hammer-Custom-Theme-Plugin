import './core/on-ready.js';
import './modules/header-fh.js';
import './modules/header-sh.js';

(function bootstrapHeaders(window) {
  const api = window.HammerThemeHeader || {};

  if (typeof api.initHeaderFH === 'function') api.initHeaderFH();
  if (typeof api.initHeaderSH === 'function') api.initHeaderSH();
})(window);
