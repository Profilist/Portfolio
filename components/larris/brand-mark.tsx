import { cn } from "@/lib/utils";
import { MARKS, MARK_ALIASES } from "./brand-marks.data";

/**
 * BrandMark — the logo of a third-party product, drawn in currentColor.
 * Unknown names render nothing (never a generic icon or a first-letter placeholder).
 * Adapted from ~/Projects/design/larris/src/components/larris/brand-mark.tsx.
 */
function findMark(name: string) {
  const key = MARK_ALIASES[name.toLowerCase().replace(/[^a-z0-9]/g, "")];
  return key ? MARKS[key] : undefined;
}

export function BrandMark({ name, className }: { name: string; className?: string }) {
  const mark = findMark(name);
  if (!mark) return null;
  return (
    <svg
      viewBox={mark.viewBox}
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden
      className={cn("size-3 shrink-0", className)}
      dangerouslySetInnerHTML={{ __html: mark.body }}
    />
  );
}
