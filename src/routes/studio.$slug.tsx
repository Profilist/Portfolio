import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogPostPage from "@/components/blog/BlogPostPage";
import { getPost } from "@/lib/blog";

const SITE_ORIGIN = "https://www.larrisx.com";

export const Route = createFileRoute("/studio/$slug")({
  loader: ({ params }) => {
    if (!getPost(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const entry = getPost(params.slug);
    if (!entry) return {};
    const { post } = entry;
    const title = `${post.title} | Larris Xie`;

    return {
      meta: [
        { title },
        { name: "description", content: post.caption },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: post.caption },
        { property: "article:published_time", content: post.date },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: post.caption },
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.caption,
            datePublished: post.date,
            url: `${SITE_ORIGIN}/studio/${post.slug}`,
            author: { "@id": `${SITE_ORIGIN}/#person` },
          },
        },
      ],
    };
  },
  component: StudioPostRoute,
});

function StudioPostRoute() {
  const { slug } = Route.useParams();
  const entry = getPost(slug)!;
  return <BlogPostPage {...entry} />;
}
