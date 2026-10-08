import type { MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { LARRIS_THEME_KEY as KEY } from "@/lib/larris-theme";
import { cn } from "@/lib/utils";

/**
 * Dark mode for Larris pages. `.dark` lives on <html> only while a Larris page
 * is mounted; the rest of the portfolio is light-only and ignores it.
 * Adapted from ~/Projects/design/larris/src/components/larris/theme-toggle.tsx.
 */

/** Runs before first paint (inlined by <ThemeScript />) so there is no flash. Light unless dark was chosen. */
const themeScript = `(function(){try{var t=localStorage.getItem("${KEY}");var d=t==="dark";document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem(KEY, dark ? "dark" : "light");
  } catch {
    // Storage blocked: the choice lasts for this page view.
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const dark = !document.documentElement.classList.contains("dark");
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void> };
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduced) {
      applyTheme(dark);
      return;
    }

    const { clientX: x, clientY: y } = event;
    const transition = doc.startViewTransition(() => applyTheme(dark));
    transition.ready
      .then(() => {
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 420, easing: "cubic-bezier(0.23, 1, 0.32, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  };

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={toggle}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md text-ink-2 transition-colors duration-fast ease-out",
        "hover:bg-surface-2 hover:text-ink active:bg-surface-3 pointer-coarse:size-11",
        "[&_svg]:size-3.5",
        className,
      )}
    >
      <Moon className="dark:hidden" aria-hidden />
      <Sun className="hidden dark:block" aria-hidden />
    </button>
  );
}
