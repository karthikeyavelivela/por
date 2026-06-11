"use client";

/**
 * Coordination between the preloader and entrance animations:
 * the hero timeline must not start until the preloader curtain lifts.
 * A hard 2.5s timeout guarantees content can never stay hidden if the
 * preloader fails for any reason.
 */

const SAFETY_MS = 2500;

export function markAppReady() {
  document.documentElement.dataset.appReady = "1";
  window.dispatchEvent(new Event("kv:ready"));
}

export function whenAppReady(cb: () => void): () => void {
  if (document.documentElement.dataset.appReady) {
    cb();
    return () => {};
  }
  let called = false;
  const once = () => {
    if (called) return;
    called = true;
    window.removeEventListener("kv:ready", once);
    clearTimeout(timer);
    cb();
  };
  window.addEventListener("kv:ready", once);
  const timer = setTimeout(once, SAFETY_MS);
  return () => {
    called = true;
    window.removeEventListener("kv:ready", once);
    clearTimeout(timer);
  };
}
