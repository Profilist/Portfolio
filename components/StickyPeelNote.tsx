import React, { useRef, useEffect } from "react";

/**
 * StickyPeelNote - A square sticky note with a CSS peel animation from the bottom-right corner.
 * Accent yellow, border, and shadow are themeable via CSS vars.
 * Peel triggers on hover and when in view (IntersectionObserver).
 */
export default function StickyPeelNote({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new window.IntersectionObserver(
      ([e]) => node.classList.toggle("peeled", e.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="sticky-note-wrapper group"
      tabIndex={0}
      aria-label="Sticky note"
    >
      {/* Back layer (revealed as front peels) */}
      <div className="sticky-back">
        {children}
      </div>
      {/* Front layer (peels away) */}
      <div className="sticky-front">
        {children}
        {/* Peel curl at bottom-right */}
        <div className="sticky-corner-peel" aria-hidden="true" />
      </div>
    </div>
  );
}
