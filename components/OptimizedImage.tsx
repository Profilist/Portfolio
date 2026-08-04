import type { CSSProperties, ImgHTMLAttributes } from "react";
import { getResponsiveImage } from "@/src/imageAssets";

type OptimizedImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height"
> & {
  src: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
};

export default function OptimizedImage({
  src,
  width,
  height,
  fill = false,
  priority = false,
  loading,
  sizes,
  style,
  ...props
}: OptimizedImageProps) {
  const responsiveImage = getResponsiveImage(src);
  const fillStyle: CSSProperties | undefined = fill
    ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        inset: 0,
        ...style,
      }
    : style;

  return (
    <img
      {...props}
      src={responsiveImage?.src ?? src}
      srcSet={responsiveImage?.srcSet}
      sizes={responsiveImage ? (sizes ?? (fill ? "100vw" : `${width}px`)) : sizes}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : (loading ?? "lazy")}
      fetchPriority={priority ? "high" : props.fetchPriority}
      decoding="async"
      style={fillStyle}
    />
  );
}
