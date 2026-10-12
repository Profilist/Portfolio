import { Marked, type Tokens } from "marked";

/**
 * Studio posts are Markdown files in `content/blog/<slug>.md` with a small
 * frontmatter block:
 *
 *   ---
 *   title: Can a tiny model learn when to talk?
 *   caption: Post-training a small model for real-time interaction
 *   date: 2026-10-08
 *   cover: figures/cover.png                   (or placeholder:16/9)
 *   coverAlt: What the cover image shows
 *   coverCaption: Optional caption under the cover, when it's a figure that needs one
 *   preview: figures/4_method.svg              (optional: what the studio list shows on hover; defaults to the cover)
 *   links: [GitHub | https://github.com/…, Model | https://huggingface.co/…]
 *   draft: true
 *   ---
 *
 * In the body, an image on its own line becomes a figure, and its title
 * becomes the caption. A `placeholder:<w>/<h>` source draws an empty
 * slot describing the visual that will go there:
 *
 *   ![Loss curve for each run](placeholder:16/9 "Validation loss falls fastest with…")
 *
 * Images go beside the post in `content/blog/<slug>/` and are referenced
 * relative to it (`figures/2_test.png`), in the body and in `cover`.
 *
 * Drafts render in `vite dev` and are left out of production builds entirely:
 * their text never reaches the bundle.
 */

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface PostLink {
  label: string;
  href: string;
}

export interface Post {
  slug: string;
  title: string;
  caption: string;
  date: string;
  cover?: string;
  coverAlt: string;
  coverCaption: string;
  /** Shown in the studio list's hover preview; falls back to the cover. */
  preview?: string;
  links: PostLink[];
  draft: boolean;
  html: string;
  toc: TocEntry[];
}

// Drafts come through as "" in production builds (see stripDraftPosts in vite.config.ts).
const files = import.meta.glob("/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// Images live beside their post (content/blog/<slug>/…) and get hashed URLs.
const assets = import.meta.glob("/content/blog/*/**/*.{png,jpg,jpeg,webp,gif,svg}", {
  query: "?url",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** `figures/2_test.png` in post <slug> → its built URL. Absolute URLs and placeholders pass through. */
function resolveAsset(slug: string, src: string) {
  if (/^([a-z]+:|\/)/i.test(src)) return src;
  return assets[`/content/blog/${slug}/${src.replace(/^\.\//, "")}`] ?? src;
}

function parseFrontmatter(raw: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  const data: Record<string, string | string[]> = {};
  if (!match) return { data, body: raw };

  for (const line of match[1].split(/\r?\n/)) {
    const field = /^(\w+):\s*(.*)$/.exec(line);
    if (!field) continue;
    const [, key, value] = field;
    const list = /^\[(.*)\]$/.exec(value);
    data[key] = list
      ? list[1].split(",").map((item) => unquote(item.trim())).filter(Boolean)
      : unquote(value.trim());
  }
  return { data, body: raw.slice(match[0].length) };
}

function unquote(value: string) {
  return value.replace(/^(["'])(.*)\1$/, "$2");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Heading HTML → the text React should render (tags dropped, entities decoded). */
function plainText(html: string) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .replace(/<[^>]+>/g, "")
      .replace(/&[a-z]+;/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "section"
  );
}

/** `placeholder:16/9` → "16 / 9"; anything else → undefined. */
export function placeholderRatio(src: string) {
  const match = /^placeholder:(\d+)\/(\d+)$/.exec(src);
  return match ? { css: `${match[1]} / ${match[2]}`, label: `${match[1]}:${match[2]}` } : undefined;
}

/** The visual itself: an image, or an empty slot saying what will go there. */
export function figureMediaHtml(src: string, alt: string) {
  const ratio = placeholderRatio(src);
  if (!ratio) return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" />`;
  return (
    `<div class="larris-figure-slot" style="aspect-ratio: ${ratio.css}" role="img" aria-label="${escapeHtml(alt)}">` +
    `<span class="larris-figure-slot-meta">Visual, ${ratio.label}</span>` +
    `<span class="larris-figure-slot-label">${escapeHtml(alt)}</span>` +
    `</div>`
  );
}

function render(slug: string, body: string) {
  const toc: TocEntry[] = [];
  const used = new Map<string, number>();

  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth, text }) {
        const html = this.parser.parseInline(tokens);
        const base = slugify(text);
        const count = used.get(base) ?? 0;
        used.set(base, count + 1);
        const id = count ? `${base}-${count}` : base;
        if (depth === 2 || depth === 3) toc.push({ id, text: plainText(html), depth });
        return `<h${depth} id="${id}">${html}</h${depth}>\n`;
      },
      paragraph({ tokens }) {
        const only = tokens.filter((token) => !(token.type === "text" && !token.raw.trim()));
        if (only.length !== 1 || only[0].type !== "image") return false;

        const image = only[0] as Tokens.Image;
        const caption = image.title ? `<figcaption>${escapeHtml(image.title)}</figcaption>` : "";
        return `<figure>${figureMediaHtml(resolveAsset(slug, image.href), image.text)}${caption}</figure>\n`;
      },
    },
  });

  const tokens = marked.lexer(body);
  const html = marked.parser(tokens);
  const firstBlock = tokens.find((token) => token.type !== "space");
  if (firstBlock && firstBlock.type !== "heading") {
    toc.unshift({ id: "introduction", text: "Introduction", depth: 2 });
  }
  return { html, toc };
}

function toPost(path: string, raw: string): Post {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const { data, body } = parseFrontmatter(raw);
  const links = Array.isArray(data.links) ? data.links : [];

  return {
    slug,
    title: String(data.title ?? slug),
    caption: String(data.caption ?? ""),
    date: String(data.date ?? ""),
    cover: data.cover ? resolveAsset(slug, String(data.cover)) : undefined,
    coverAlt: String(data.coverAlt ?? ""),
    coverCaption: String(data.coverCaption ?? ""),
    preview: data.preview ? resolveAsset(slug, String(data.preview)) : undefined,
    links: links.flatMap((item) => {
      const [label, href] = item.split("|").map((part) => part.trim());
      return label && href ? [{ label, href }] : [];
    }),
    draft: data.draft === "true",
    ...render(slug, body),
  };
}

const posts: Post[] = Object.entries(files)
  .filter(([, raw]) => raw.trim())
  .map(([path, raw]) => toPost(path, raw))
  .filter((post) => import.meta.env.DEV || !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPosts() {
  return posts;
}

export function getPost(slug: string) {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return undefined;
  return {
    post: posts[index],
    newer: posts[index - 1],
    older: posts[index + 1],
  };
}

/** Posts grouped by year, newest first. */
export function getPostsByYear() {
  const years = new Map<string, Post[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    years.set(year, [...(years.get(year) ?? []), post]);
  }
  return [...years.entries()];
}

/** The product a link points at, for its brand mark. */
export function linkBrand(href: string) {
  try {
    const host = new URL(href).hostname.replace(/^www\./, "");
    if (host === "github.com") return "GitHub";
    if (host === "huggingface.co" || host === "hf.co") return "Hugging Face";
  } catch {
    // Relative or malformed link: no mark.
  }
  return undefined;
}

function parseDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

/** "Oct 8, 2026" */
export function formatLongDate(date: string) {
  return parseDate(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "Oct 08", for the index where the year is already the group label. */
export function formatShortDate(date: string) {
  return parseDate(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });
}
