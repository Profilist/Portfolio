import { createFileRoute } from "@tanstack/react-router";
import ProjectsPage from "@/components/ProjectsPage";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Software Projects | Larris Xie" },
      {
        name: "description",
        content:
          "Explore software projects by Larris Xie across AI agents, developer tools, games, infrastructure, and full-stack applications.",
      },
      { property: "og:title", content: "Software Projects | Larris Xie" },
      {
        property: "og:description",
        content:
          "Explore software projects by Larris Xie across AI agents, developer tools, games, infrastructure, and full-stack applications.",
      },
      { name: "twitter:title", content: "Software Projects | Larris Xie" },
      {
        name: "twitter:description",
        content:
          "Explore software projects by Larris Xie across AI agents, developer tools, games, infrastructure, and full-stack applications.",
      },
    ],
  }),
  component: ProjectsPage,
});
