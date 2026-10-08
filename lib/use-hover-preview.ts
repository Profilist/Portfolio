import { useCallback, useRef, useState, type PointerEvent } from "react";

/**
 * A cover that follows the cursor over the post list and slides to the hovered
 * post's image. After obsidianui.dev/docs/hover-img, without GSAP: CSS
 * transitions retarget on every move, so the card trails the pointer.
 * Mouse only; touch and pen never see it.
 */
export const PREVIEW_WIDTH = 280;
export const PREVIEW_HEIGHT = 175;
const OFFSET_X = 28; // sits to the right of the cursor so the title stays readable

export function useHoverPreview() {
  const follower = useRef<HTMLDivElement>(null);
  const placed = useRef(false);
  const [active, setActive] = useState<number | null>(null);

  const move = useCallback((event: PointerEvent) => {
    const el = follower.current;
    if (!el || event.pointerType !== "mouse") return;
    const x = Math.min(event.clientX + OFFSET_X, window.innerWidth - PREVIEW_WIDTH - 16);
    const y = event.clientY - PREVIEW_HEIGHT / 2;
    if (!placed.current) {
      // First contact: jump to the cursor instead of flying in from the corner.
      el.style.transition = "none";
      el.style.translate = `${x}px ${y}px`;
      void el.offsetWidth;
      el.style.transition = "";
      placed.current = true;
      return;
    }
    el.style.translate = `${x}px ${y}px`;
  }, []);

  const listProps = {
    onPointerMove: move,
    onPointerLeave: () => {
      placed.current = false;
      setActive(null);
    },
  };

  const itemProps = (index: number) => ({
    onPointerEnter: (event: PointerEvent) => {
      if (event.pointerType === "mouse") setActive(index);
    },
  });

  return { follower, active, listProps, itemProps };
}
