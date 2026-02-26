const executedKeys = new Set();

export function onReady(callback) {
  if (typeof callback !== "function") return;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }

  callback();
}

export function runOnce(key, initializer) {
  if (!key || typeof initializer !== "function" || executedKeys.has(key)) return;

  executedKeys.add(key);
  initializer();
}
