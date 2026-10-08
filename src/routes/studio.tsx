import { createFileRoute } from "@tanstack/react-router";
import BlogLayout from "@/components/blog/BlogLayout";

export const Route = createFileRoute("/studio")({
  component: BlogLayout,
});
