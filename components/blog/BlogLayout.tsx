import { Outlet } from "@tanstack/react-router";
import { ThemeScript } from "@/components/larris/theme-toggle";
import { useLarrisTheme } from "@/lib/larris-theme";

export default function BlogLayout() {
  useLarrisTheme();

  return (
    <div className="larris min-h-screen">
      <ThemeScript />
      <Outlet />
    </div>
  );
}
