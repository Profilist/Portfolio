import { useEffect } from "react";

export const LARRIS_THEME_KEY = "larris-theme";
const KEY = LARRIS_THEME_KEY;

/** Light by default, like the rest of the portfolio; dark only once chosen. */
function storedIsDark() {
  try {
    return localStorage.getItem(KEY) === "dark";
  } catch {
    return false;
  }
}

/** Applies the saved theme on client-side entry, and clears it on the way out. */
export function useLarrisTheme() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", storedIsDark());
    return () => root.classList.remove("dark");
  }, []);
}

