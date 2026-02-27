import './core/on-ready'
import './modules/header-fh'
import './modules/header-sh'

(function (window) {
  function ensureHeaderInitializer(api, initializerName) {
    if (typeof api[initializerName] === 'function') return

    const message = '[HammerTheme] Required header initializer is unavailable: ' + initializerName

    if (typeof console !== 'undefined') {
      if (typeof console.warn === 'function') console.warn(message)
      if (typeof console.error === 'function') console.error(message)
    }

    throw new Error(message)
  }

  function bootHeaders() {
    const api = window.HammerThemeHeader || {}

    ensureHeaderInitializer(api, 'initHeaderFH')
    ensureHeaderInitializer(api, 'initHeaderSH')

    api.initHeaderFH()
    api.initHeaderSH()
  }

  bootHeaders()
})(window)
