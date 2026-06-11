"use client";

import { useCallback, useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

function getLight() {
  return document.documentElement.dataset.theme === "light";
}

/** Dark/light toggle — persists to localStorage, default dark. */
export default function ThemeToggle({ className }: { className?: string }) {
  const light = useSyncExternalStore(subscribe, getLight, () => false);

  const toggle = useCallback(() => {
    const next = !getLight();
    if (next) {
      document.documentElement.dataset.theme = "light";
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem("kv-theme", next ? "light" : "dark");
    } catch {
      // private mode — theme just won't persist
    }
  }, []);

  return (
    <button
      onClick={toggle}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      className={
        className ??
        "glass flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 hover:text-(--orange)"
      }
      style={{ color: "var(--ink)" }}
    >
      {light ? (
        /* moon */
        <svg viewBox="0 0 24 24" fill="none" className="h-[17px] w-[17px]" aria-hidden>
          <path
            d="M20 12.5A8 8 0 1 1 11.5 4a6.5 6.5 0 0 0 8.5 8.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        /* sun */
        <svg viewBox="0 0 24 24" fill="none" className="h-[17px] w-[17px]" aria-hidden>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
