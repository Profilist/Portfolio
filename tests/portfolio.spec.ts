import { expect, test } from "@playwright/test";
import { canonicalRedirect } from "../src/canonicalRedirect";

test("preserves the canonical domain redirects, paths, and queries", () => {
  const cases = [
    { host: "larrisx.com", status: 307 },
    { host: "larris.me", status: 308 },
    { host: "www.larris.me", status: 308 },
  ];

  for (const redirect of cases) {
    const response = canonicalRedirect(new Request(`http://${redirect.host}/projects?source=legacy`));

    expect(response?.status).toBe(redirect.status);
    expect(response?.headers.get("location")).toBe("https://www.larrisx.com/projects?source=legacy");
  }
});

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Larris's Portfolio");
  await expect(page.locator("h1")).toHaveText("Hi, I'm Larris.");
});

test("loads every route without browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  for (const route of ["/projects", "/resume", "/studio", "/"]) {
    await page.goto(route);
  }

  expect(errors).toEqual([]);
});

test("serves responsive images and preloads every homepage preview video", async ({ page }) => {
  const headshot = page.getByAltText("Larris profile photo");
  await expect(headshot).toHaveAttribute("srcset", /\.webp 100w/);
  await expect.poll(() => headshot.evaluate((image) => (image as HTMLImageElement).currentSrc)).toMatch(/\.webp$/);

  const videos = page.locator("section video");
  await expect(videos).toHaveCount(3);
  await expect.poll(() => videos.evaluateAll((items) => items.map((video) => (video as HTMLVideoElement).readyState))).toEqual([4, 4, 4]);
  await expect.poll(() => videos.evaluateAll((items) => items.map((video) => video.getAttribute("preload")))).toEqual(["auto", "auto", "auto"]);
});

test("starts a project video immediately on hover and resets it on leave", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Hover behavior is desktop-only.");

  const card = page.locator(".group.relative").first();
  const panel = card.locator(".absolute.z-20");
  const video = card.locator("video");

  await card.hover();
  await expect(panel).toBeVisible();
  await expect.poll(() => video.evaluate((element) => (element as HTMLVideoElement).paused)).toBe(false);
  await expect.poll(() => video.evaluate((element) => (element as HTMLVideoElement).currentTime)).toBeGreaterThan(0);

  await page.mouse.move(1200, 100);
  await expect.poll(() => video.evaluate((element) => (element as HTMLVideoElement).paused)).toBe(true);
  await expect.poll(() => video.evaluate((element) => (element as HTMLVideoElement).currentTime)).toBeLessThan(0.05);
});

test("navigates every internal route without a document reload", async ({ page }) => {
  await page.locator('a[href="/projects"]').first().click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();

  await page.goto("/resume");
  await expect(page.locator('iframe[src="/resume.pdf"]')).toBeVisible();

  await page.goto("/studio");
  await expect(page.getByText("Coming Soon...")).toBeVisible();
});

test("keeps the projects page media lazy outside the near viewport", async ({ page }) => {
  await page.goto("/projects");
  const videos = page.locator("video");
  await expect(videos).toHaveCount(7);

  await expect.poll(() => videos.first().getAttribute("preload")).toBe("auto");
  await expect.poll(() => videos.last().getAttribute("preload")).toBe("none");
});
