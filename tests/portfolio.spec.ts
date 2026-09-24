import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { canonicalRedirect } from "../src/canonicalRedirect";

const experiencePostcards = [
  {
    id: "conway",
    href: "https://www.conway.ai/",
    caption: "check out Conway 👀",
    alt: "Conway homepage preview",
  },
  {
    id: "kp-fellows",
    href: "https://www.kleinerperkins.com/fellows/",
    caption: "join KP Fellows!",
    alt: "Kleiner Perkins Fellows page preview",
  },
  {
    id: "pphh-vfl",
    href: "https://arxiv.org/abs/2605.08343v1",
    caption: "read our paper!",
    alt: "First page of the PPHH-VFL research paper",
  },
  {
    id: "shopify-pos",
    href: "https://www.shopify.com/pos",
    caption: "take a look at Shopify POS!",
    alt: "Shopify POS page preview",
  },
  {
    id: "mlh-production-engineering",
    href: "https://fellowship.mlh.com/programs/production-engineering-sre",
    caption: "learn about the MLH Fellowship!",
    alt: "MLH Production Engineering Fellowship page preview",
  },
];

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

test("runs page documents through the Worker before Cloudflare assets", () => {
  const workerConfig = JSON.parse(readFileSync("dist/server/wrangler.json", "utf8"));

  expect(workerConfig.assets.run_worker_first).toEqual([
    "/",
    "/projects",
    "/projects/",
    "/resume",
    "/resume/",
    "/studio",
    "/studio/",
  ]);
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

test("renders locally optimized postcards for every experience", async ({ page }) => {
  await expect(page.getByText("Technologies used:", { exact: true })).toHaveCount(0);

  for (const postcard of experiencePostcards) {
    const card = page.getByTestId(`experience-postcard-mobile-${postcard.id}`);
    const image = card.getByAltText(postcard.alt);

    await expect(card).toHaveAttribute("href", postcard.href);
    await expect(card).toHaveAttribute("target", "_blank");
    await expect(card).toHaveAttribute("rel", "noreferrer");
    await expect(card).toContainText(postcard.caption);
    await expect(image).toHaveAttribute("srcset", /\.webp 100w/);
    await expect(image).toHaveAttribute("src", /\.webp$/);
  }
});

test("places the active desktop postcard directly below its matching note", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Desktop timeline behavior only.");
  await page.setViewportSize({ width: 1440, height: 900 });

  const sectionTop = await page.locator("[data-timeline-section]").evaluate((element) => (
    element.getBoundingClientRect().top + window.scrollY
  ));

  for (const [index, postcard] of experiencePostcards.entries()) {
    await page.evaluate(
      ({ top, offset }) => window.scrollTo(0, top + offset),
      { top: sectionTop, offset: index * 700 + 32 },
    );

    const stage = page.getByTestId("experience-stage-desktop");
    const note = page.getByTestId("experience-note-desktop");
    const card = page.getByTestId(`experience-postcard-desktop-${postcard.id}`);
    const image = card.getByAltText(postcard.alt);

    await expect(note).toHaveAttribute("data-experience-id", postcard.id);
    await expect(card).toBeVisible();
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth > 0)).toBe(true);
    await page.waitForTimeout(450);

    const [stageBox, noteBox, cardBox] = await Promise.all([
      stage.boundingBox(),
      note.boundingBox(),
      card.boundingBox(),
    ]);
    expect(stageBox).not.toBeNull();
    expect(noteBox).not.toBeNull();
    expect(cardBox).not.toBeNull();

    const noteBottom = (noteBox?.y ?? 0) + (noteBox?.height ?? 0);
    const gap = (cardBox?.y ?? 0) - noteBottom;
    const cardBottom = (cardBox?.y ?? 0) + (cardBox?.height ?? 0);
    const stageCenter = (stageBox?.x ?? 0) + (stageBox?.width ?? 0) / 2;
    const cardCenter = (cardBox?.x ?? 0) + (cardBox?.width ?? 0) / 2;
    expect(gap).toBeGreaterThanOrEqual(-2);
    expect(gap).toBeLessThan(24);
    expect(Math.abs(cardCenter - stageCenter)).toBeLessThan(3);
    expect(cardBottom).toBeLessThanOrEqual((stageBox?.y ?? 0) + (stageBox?.height ?? 0) + 2);
  }

  const activeCard = page.getByTestId("experience-postcard-desktop-mlh-production-engineering");
  await page.waitForTimeout(550);
  const restingBox = await activeCard.boundingBox();
  const restingCenter = {
    x: (restingBox?.x ?? 0) + (restingBox?.width ?? 0) / 2,
    y: (restingBox?.y ?? 0) + (restingBox?.height ?? 0) / 2,
  };
  const restingShadow = await activeCard.evaluate((element) => getComputedStyle(element).boxShadow);
  await activeCard.hover({
    position: {
      x: (restingBox?.width ?? 1) / 2,
      y: (restingBox?.height ?? 1) / 2,
    },
  });
  await page.waitForTimeout(250);
  const hoverBox = await activeCard.boundingBox();
  const hoverShadow = await activeCard.evaluate((element) => getComputedStyle(element).boxShadow);
  const hoverCenter = {
    x: (hoverBox?.x ?? 0) + (hoverBox?.width ?? 0) / 2,
    y: (hoverBox?.y ?? 0) + (hoverBox?.height ?? 0) / 2,
  };
  expect(Math.abs(hoverCenter.x - restingCenter.x)).toBeLessThan(3);
  expect(Math.abs(hoverCenter.y - restingCenter.y)).toBeLessThan(3);
  expect(hoverShadow).not.toBe(restingShadow);

  await page.mouse.move(0, 0);
  await activeCard.focus();
  await expect(activeCard).toBeFocused();
});

test("places every mobile postcard directly below its note without horizontal overflow", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Mobile static timeline behavior only.");

  for (const postcard of experiencePostcards) {
    const note = page.getByTestId(`experience-note-mobile-${postcard.id}`);
    const card = page.getByTestId(`experience-postcard-mobile-${postcard.id}`);
    const image = card.getByAltText(postcard.alt);
    const noteStyles = await note.locator("ul").evaluate((element) => {
      const styles = getComputedStyle(element);
      const noteBox = element.closest('[data-testid^="experience-note-mobile-"]')?.getBoundingClientRect();
      return {
        contentFits: noteBox ? element.getBoundingClientRect().bottom <= noteBox.bottom + 0.5 : false,
        fontSize: Number.parseFloat(styles.fontSize),
        marginTop: Number.parseFloat(styles.marginTop),
        paddingLeft: Number.parseFloat(styles.paddingLeft),
        paddingRight: Number.parseFloat(styles.paddingRight),
      };
    });

    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth > 0)).toBe(true);

    const [noteBox, cardBox] = await Promise.all([note.boundingBox(), card.boundingBox()]);
    expect(noteBox).not.toBeNull();
    expect(cardBox).not.toBeNull();

    const gap = (cardBox?.y ?? 0) - ((noteBox?.y ?? 0) + (noteBox?.height ?? 0));
    expect(gap).toBeGreaterThanOrEqual(0);
    expect(gap).toBeLessThan(24);
    expect(noteBox?.height).toBeCloseTo(250, 0);
    expect(noteBox?.width).toBeCloseTo(288, 0);
    expect(noteStyles.fontSize).toBeGreaterThanOrEqual(14);
    expect(noteStyles.fontSize).toBeLessThanOrEqual(16);
    expect(noteStyles.contentFits).toBe(true);
    expect(noteStyles.marginTop).toBe(48);
    expect(noteStyles.paddingLeft).toBe(48);
    expect(noteStyles.paddingRight).toBe(32);
    expect(cardBox?.x ?? -1).toBeGreaterThanOrEqual(0);
    expect((cardBox?.x ?? 0) + (cardBox?.width ?? 0)).toBeLessThanOrEqual(390);
  }

  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.setViewportSize({ width: 700, height: 844 });
  for (const postcard of experiencePostcards) {
    const [noteBox, cardBox] = await Promise.all([
      page.getByTestId(`experience-note-mobile-${postcard.id}`).boundingBox(),
      page.getByTestId(`experience-postcard-mobile-${postcard.id}`).boundingBox(),
    ]);
    expect(noteBox).not.toBeNull();
    expect(cardBox).not.toBeNull();
    expect(noteBox?.width).toBeCloseTo(288, 0);
    expect(noteBox?.height).toBeCloseTo(250, 0);
    expect(cardBox?.x ?? 0).toBeGreaterThan((noteBox?.x ?? 0) + (noteBox?.width ?? 0));
    expect(Math.abs((cardBox?.y ?? 0) - (noteBox?.y ?? 0))).toBeLessThan(8);
  }
});

test("crossfades postcards without transforms when reduced motion is enabled", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Desktop motion behavior only.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload();

  const sectionTop = await page.locator("[data-timeline-section]").evaluate((element) => (
    element.getBoundingClientRect().top + window.scrollY
  ));
  await page.evaluate((top) => window.scrollTo(0, top + 32), sectionTop);

  const card = page.getByTestId("experience-postcard-desktop-conway");
  await expect(card).toBeVisible();
  await expect(card).toHaveAttribute("data-reduced-motion", "true");
  await expect.poll(() => card.evaluate((element) => getComputedStyle(element).transform)).toBe("none");
});

test("keeps the projects page media lazy outside the near viewport", async ({ page }) => {
  await page.goto("/projects");
  const videos = page.locator("video");
  await expect(videos).toHaveCount(7);

  await expect.poll(() => videos.first().getAttribute("preload")).toBe("auto");
  await expect.poll(() => videos.last().getAttribute("preload")).toBe("none");
});
