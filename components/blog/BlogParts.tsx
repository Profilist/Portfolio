import { useEffect, useState, type ReactNode } from "react";
import { BrandMark } from "@/components/larris/brand-mark";
import { bevelButton } from "@/components/larris/bevel";
import { figureMediaHtml, linkBrand, type PostLink, type TocEntry } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** The cover under the title: an image, or a slot describing the one to come. */
export function Cover({ src, alt }: { src: string; alt: string }) {
  return <div className="larris-cover" dangerouslySetInnerHTML={{ __html: figureMediaHtml(src, alt) }} />;
}

/** Who wrote it and when, as one muted phrase: "Larris Xie, Oct 8, 2026". */
export function Byline({ date, children, className }: { date: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm text-ink-3", className)}>
      Larris Xie,{" "}
      <time dateTime={date} className="tabular-nums">
        {children}
      </time>
    </p>
  );
}

/** Where the code, weights or data live (GitHub, Model…), as paper-bevel buttons. */
export function ResourceLinks({ links, className }: { links: PostLink[]; className?: string }) {
  if (links.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap justify-center gap-2", className)}>
      {links.map((link) => {
        const brand = linkBrand(link.href);
        return (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noreferrer" className={bevelButton}>
              {brand && <BrandMark name={brand} />}
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** The section currently being read: the last heading above the top fifth of the screen. */
function useActiveSection(entries: TocEntry[]) {
  const [active, setActive] = useState(entries[0]?.id);

  useEffect(() => {
    const elements = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const { scrollHeight } = document.documentElement;
      if (window.innerHeight + window.scrollY >= scrollHeight - 4) {
        setActive(elements.at(-1)!.id);
        return;
      }
      const line = window.innerHeight * 0.2;
      let current = elements[0].id;
      for (const element of elements) {
        if (element.getBoundingClientRect().top > line) break;
        current = element.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [entries]);

  return active;
}

/**
 * Desktop contents as a tick rail: one hairline per section (shorter for
 * subsections), the current one longer and blue, packed 10px apart. Hovering
 * the rail, or tabbing into it, opens the section names in the margin beside it.
 */
export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const active = useActiveSection(entries);

  return (
    <nav aria-label="Contents" className="group/toc relative w-6">
      <ol aria-hidden className="flex flex-col">
        {entries.map((entry) => {
          const current = entry.id === active;
          return (
            <li key={entry.id} className="flex h-2.5 items-center">
              <a
                href={`#${entry.id}`}
                tabIndex={-1}
                className="flex h-full w-full items-center"
              >
                <span
                  className={cn(
                    "block transition-colors duration-fast ease-out",
                    current ? "h-[1.5px] w-5 bg-blue" : "h-px bg-line-strong group-hover/toc:bg-ink-4",
                    !current && (entry.depth === 3 ? "w-2" : "w-3"),
                  )}
                />
              </a>
            </li>
          );
        })}
      </ol>

      {/* Names open to the left, in the empty margin, never over the text. pr-3 bridges the gap so the hover holds. */}
      <div
        className={cn(
          "absolute top-0 right-full pr-3",
          "pointer-events-none opacity-0 scale-95 origin-top-right transition-[opacity,scale] duration-base ease-out",
          "group-hover/toc:pointer-events-auto group-hover/toc:opacity-100 group-hover/toc:scale-100",
          "group-focus-within/toc:pointer-events-auto group-focus-within/toc:opacity-100 group-focus-within/toc:scale-100",
        )}
      >
        <ol className="-mt-3 w-44 rounded-lg bg-surface px-3 py-2 shadow-[var(--v-shadow-lg)]">
          {entries.map((entry) => {
            const current = entry.id === active;
            return (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  aria-current={current ? "location" : undefined}
                  className={cn(
                    "block truncate py-0.5 text-[13px] leading-5 transition-colors duration-fast ease-out",
                    entry.depth === 3 && "pl-3",
                    current ? "font-medium text-ink" : "text-ink-3 hover:text-ink",
                  )}
                >
                  {entry.text}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
