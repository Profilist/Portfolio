import type { RefObject } from "react";
import { figureMediaHtml, type Post } from "@/lib/blog";
import { PREVIEW_HEIGHT as HEIGHT, PREVIEW_WIDTH as WIDTH } from "@/lib/use-hover-preview";

interface HoverPreviewProps {
  posts: Post[];
  active: number | null;
  follower: RefObject<HTMLDivElement | null>;
}

/** The floating cover for the studio index; positioned by `useHoverPreview`. */
export function HoverPreview({ posts, active, follower }: HoverPreviewProps) {
  const shown = active !== null;
  const index = active ?? 0;

  return (
    <div
      ref={follower}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-40 hidden transition-[translate] duration-[450ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:block"
    >
      <div
        className="larris-thumb overflow-hidden rounded-lg bg-surface shadow-[var(--v-shadow-lg)] transition-[scale,opacity] duration-base ease-out"
        style={{ width: WIDTH, height: HEIGHT, scale: shown ? 1 : 0.92, opacity: shown ? 1 : 0 }}
      >
        <div
          className="transition-transform duration-[400ms] ease-in-out"
          style={{ transform: `translateY(${-index * HEIGHT}px)` }}
        >
          {posts.map((post) => (
            <div
              key={post.slug}
              style={{ height: HEIGHT }}
              dangerouslySetInnerHTML={{
                __html: figureMediaHtml(post.cover ?? "placeholder:16/10", post.cover ? post.coverAlt : post.title),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
