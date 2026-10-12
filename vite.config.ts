import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { existsSync, readFileSync } from "node:fs";
import { defineConfig, type Plugin } from "vite";
import { imagetools } from "vite-imagetools";

/**
 * Studio posts marked `draft: true` are left out of production builds
 * entirely: the post loads as an empty string (lib/blog.ts skips it) and its
 * images in content/blog/<slug>/ are never emitted. Nothing unpublished ships.
 */
function isDraft(markdownPath: string) {
  if (!existsSync(markdownPath)) return false;
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(readFileSync(markdownPath, "utf8"))?.[1] ?? "";
  return /^draft:\s*true\s*$/m.test(frontmatter);
}

function stripDraftPosts(): Plugin {
  return {
    name: "strip-draft-posts",
    apply: "build",
    enforce: "pre",
    load(id) {
      const [path, query] = id.split("?");
      const post = /^(.*\/content\/blog)\/([^/]+)\.md$/.exec(path);
      if (query === "raw" && post && isDraft(path)) return 'export default ""';
      const asset = /^(.*\/content\/blog)\/([^/]+)\/.+$/.exec(path);
      if (query === "url" && asset && isDraft(`${asset[1]}/${asset[2]}.md`)) return 'export default ""';
    },
  };
}

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    stripDraftPosts(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    // Studio post images are served as-is; imagetools caches by path, so re-rendered figures would go stale in dev.
    imagetools({ exclude: ["public/**/*", "content/**/*"] }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    react(),
  ],
});
