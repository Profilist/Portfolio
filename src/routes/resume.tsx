import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume | Larris Xie" },
      {
        name: "description",
        content:
          "View Larris Xie's software engineering resume, including experience, education, research, and technical projects.",
      },
      { property: "og:title", content: "Resume | Larris Xie" },
      {
        property: "og:description",
        content:
          "View Larris Xie's software engineering resume, including experience, education, research, and technical projects.",
      },
      { name: "twitter:title", content: "Resume | Larris Xie" },
      {
        name: "twitter:description",
        content:
          "View Larris Xie's software engineering resume, including experience, education, research, and technical projects.",
      },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <iframe
        src="/resume.pdf"
        title="Larris Xie's Resume"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </main>
  );
}
