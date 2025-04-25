import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to track which timeline step is active based on scroll position.
 * Returns [currentIndex, stepRefs].
 */
export function useStickyTimeline(steps: number) {
  const [current, setCurrent] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      let found = 0;
      for (let i = 0; i < steps; i++) {
        const ref = stepRefs.current[i];
        if (!ref) continue;
        const rect = ref.getBoundingClientRect();
        // If top of step is above middle of viewport, mark as active
        if (rect.top < window.innerHeight * 0.4) {
          found = i;
        }
      }
      // If last step's bottom is visible, always select last
      const lastRef = stepRefs.current[steps - 1];
      if (lastRef) {
        const lastRect = lastRef.getBoundingClientRect();
        if (lastRect.bottom < window.innerHeight * 0.8) {
          found = steps - 1;
        }
      }
      setCurrent(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [steps]);

  return [current, stepRefs] as const;
}
