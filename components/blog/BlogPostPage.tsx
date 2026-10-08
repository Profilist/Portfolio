import { Link } from "@tanstack/react-router";
import { Byline, Cover, ResourceLinks, TableOfContents } from "@/components/blog/BlogParts";
import { ThemeToggle } from "@/components/larris/theme-toggle";
import type { Post } from "@/lib/blog";
import { formatLongDate } from "@/lib/blog";
import { cn } from "@/lib/utils";

interface BlogPostPageProps {
  post: Post;
  newer?: Post;
  older?: Post;
}

export default function BlogPostPage({ post, newer, older }: BlogPostPageProps) {
  const hasToc = post.toc.length > 1;

  return (
    <main className="relative px-4 pt-14 pb-40 sm:pt-24">
      <ThemeToggle className="absolute top-4 right-2.5 sm:right-4.5" />
      <article>
        <div className="mx-auto max-w-[42rem]">
          <header className="text-center sm:pt-6">
            <h1 className="font-serif text-4xl font-medium tracking-tighter sm:text-5xl">{post.title}</h1>
            {post.caption && <p className="mx-auto mt-4 max-w-[32rem] text-md text-ink-2">{post.caption}</p>}
            <Byline date={post.date} className="mt-6">
              {formatLongDate(post.date)}
            </Byline>
            <ResourceLinks links={post.links} className="mt-6" />
          </header>

          {post.cover && (
            <div className="mt-12">
              <Cover src={post.cover} alt={post.coverAlt} />
            </div>
          )}
        </div>

        <div className="mx-auto mt-12 max-w-[42rem] xl:grid xl:max-w-[72rem] xl:grid-cols-[15rem_42rem_15rem]">
          {hasToc && (
            <aside className="hidden xl:block">
              <div className="sticky top-28 flex justify-end pr-12">
                <TableOfContents entries={post.toc} />
              </div>
            </aside>
          )}
          <div id="introduction" className="larris-prose xl:col-start-2" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>

      {(older || newer) && (
        <nav aria-label="More posts" className="mx-auto mt-20 grid max-w-[42rem] gap-6 border-t border-line pt-6 sm:grid-cols-2">
          {older && <PostLink post={older} label="Older" />}
          {newer && <PostLink post={newer} label="Newer" className="sm:col-start-2 sm:text-right" />}
        </nav>
      )}
    </main>
  );
}

function PostLink({ post, label, className }: { post: Post; label: string; className?: string }) {
  return (
    <Link to="/studio/$slug" params={{ slug: post.slug }} className={cn("group block", className)}>
      <span className="text-sm font-semibold text-ink-3">{label}</span>
      <span className="mt-1 block text-md font-semibold tracking-tight text-ink underline-offset-4 decoration-blue group-hover:underline">
        {post.title}
      </span>
    </Link>
  );
}
