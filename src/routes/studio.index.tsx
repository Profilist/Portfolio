import { createFileRoute } from "@tanstack/react-router";
import BlogIndexPage from "@/components/blog/BlogIndexPage";

const TITLE = "Studio | Larris Xie";
const DESCRIPTION = "Writing and experiments by Larris Xie on software engineering, AI, infrastructure, and the things I'm building.";

export const Route = createFileRoute("/studio/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: BlogIndexPage,
});
