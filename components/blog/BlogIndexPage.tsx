import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HoverPreview } from "@/components/blog/HoverPreview";
import { formatShortDate, getPosts, getPostsByYear } from "@/lib/blog";
import { useHoverPreview } from "@/lib/use-hover-preview";

export default function BlogIndexPage() {
  const years = getPostsByYear();
  const posts = getPosts();
  const preview = useHoverPreview();

  return (
    <main className="mx-auto w-full max-w-[42rem] px-4 pt-12 pb-40 sm:px-6">
      {/* Same heading as the Projects page, so the two tabs read as one site. */}
      <motion.h1
        className="mb-8 text-center font-handwriting text-6xl leading-none font-medium tracking-[-0.06em] text-ink"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      >
        My Studio
      </motion.h1>

      {years.length === 0 ? (
        <div className="flex flex-col gap-2 border-t border-line pt-6">
          <h2 className="text-xl">Looking for something to read?</h2>
          <p className="text-[13px] text-ink-2">The first post is on its way.</p>
          <Link
            to="/projects"
            className="mt-2 self-start text-sm font-semibold text-ink underline decoration-blue underline-offset-4"
          >
            See my projects
          </Link>
        </div>
      ) : (
        <div className="group/list" {...preview.listProps}>
          {years.map(([year, yearPosts]) => (
            <section
              key={year}
              aria-labelledby={`studio-year-${year}`}
              className="grid gap-x-8 border-t border-line pt-3 pb-6 sm:grid-cols-[3.5rem_1fr]"
            >
              <h2
                id={`studio-year-${year}`}
                className="py-3 font-mono text-sm font-medium tracking-normal text-ink-3 tabular-nums"
              >
                {year}
              </h2>
              <ol>
                {yearPosts.map((post) => (
                  <li
                    key={post.slug}
                    {...preview.itemProps(posts.indexOf(post))}
                    className="transition-opacity duration-base ease-out pointer-fine:group-has-[li:hover]/list:opacity-45 hover:opacity-100!"
                  >
                    <Link to="/studio/$slug" params={{ slug: post.slug }} className="group block py-3">
                      <div className="flex items-baseline justify-between gap-6">
                        <h3 className="min-w-0 text-md tracking-tight text-ink underline-offset-4 decoration-blue group-hover:underline">
                          {post.title}
                        </h3>
                        <time
                          dateTime={post.date}
                          className="shrink-0 font-mono text-sm text-ink-3 tabular-nums"
                        >
                          {formatShortDate(post.date)}
                        </time>
                      </div>
                      {post.caption && (
                        <p className="mt-1 line-clamp-2 max-w-[34rem] text-base text-ink-2">{post.caption}</p>
                      )}
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
          <HoverPreview posts={posts} active={preview.active} follower={preview.follower} />
        </div>
      )}
    </main>
  );
}
