type ResponsiveImage = {
  src: string;
  srcSet: string;
};

const generatedSrcSets = import.meta.glob<string>(
  "./assets/images/**/*.{avif,jpeg,jpg,png}",
  {
    eager: true,
    import: "default",
    query: "?w=100;200;400;800;1200;1600&format=webp&quality=85&as=srcset",
  },
);

const responsiveImages = Object.fromEntries(
  Object.entries(generatedSrcSets).map(([assetPath, srcSet]) => {
    const publicPath = assetPath
      .replace("./assets/images", "")
      .replace(/\\.(avif|jpeg|jpg|png)$/, (extension) => extension.toLowerCase());
    const src = srcSet.split(", ").at(-1)?.split(" ")[0] ?? publicPath;

    return [publicPath, { src, srcSet } satisfies ResponsiveImage];
  }),
) as Record<string, ResponsiveImage>;

export function getResponsiveImage(src: string) {
  return responsiveImages[src];
}
