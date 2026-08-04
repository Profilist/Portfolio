import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Larris's Resume" },
      { name: "description", content: "Larris Xie's Resume" },
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
