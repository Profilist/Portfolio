import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/studio")({
  component: StudioPage,
});

function StudioPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-6xl font-handwriting">Coming Soon...</h1>
    </div>
  );
}
