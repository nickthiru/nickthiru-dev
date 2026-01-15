import { writable } from "svelte/store";
import { browser } from "$app/environment";

export type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (!browser) return "light";

  // Check localStorage first
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  // Fall back to system preference
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

function createThemeStore() {
  const { subscribe, set } = writable<Theme>(getInitialTheme());

  return {
    subscribe,
    set: (theme: Theme) => {
      if (browser) {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
      }
      set(theme);
    },
    toggle: () => {
      const current = getInitialTheme();
      const next = current === "light" ? "dark" : "light";
      if (browser) {
        localStorage.setItem("theme", next);
        document.documentElement.setAttribute("data-theme", next);
      }
      set(next);
    },
    init: () => {
      if (browser) {
        const theme = getInitialTheme();
        document.documentElement.setAttribute("data-theme", theme);
        set(theme);
      }
    },
  };
}

export const theme = createThemeStore();
