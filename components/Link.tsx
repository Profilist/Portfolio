import { Link as RouterLink } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  preload?: "intent" | "viewport" | "render" | false;
};

export default function Link({ href, children, preload, ...props }: LinkProps) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");

  if (isInternal) {
    return (
      <RouterLink to={href} preload={preload ?? "intent"} {...props}>
        {children}
      </RouterLink>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
