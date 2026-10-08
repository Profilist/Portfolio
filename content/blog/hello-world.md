---
title: A specimen post for the studio.
caption: Every piece a post can use, laid out in the order a reader meets it
date: 2026-10-08
cover: placeholder:16/9
coverAlt: Cover image. A wide illustration that sets the mood for the post, roughly 1600 by 900.
links: [GitHub | https://github.com/Profilist, Model | https://huggingface.co/]
draft: true
---

This post exists to show how a studio post is put together. It's a draft, so it only appears in dev. The title, caption and date sit above a cover image, then buttons for the code and model, then the body. On a wide screen a rail of ticks in the left margin tracks where you are; hover it to see the section names.

Body text is Newsreader at 18px with a 30px line, held to about 70 characters so it reads like a page. Links stay in the text colour with [a blue underline](https://www.larrisx.com/projects) that firms up on hover.

## Figures

An image on a line of its own becomes a figure, with its title as the caption. Until the visual exists, a `placeholder:16/9` source draws a slot that says what will go there and its shape.

![Diagram. Turn-based chat on the left, a continuous stream of 650 ms snapshots on the right, with the model choosing an action at each one.](placeholder:16/9 "A turn-based model acts only after the user finishes a message. A streaming model sees each snapshot and decides what to do as the input arrives.")

Captions are small sans in muted ink, with no figure number. They should say what the reader is looking at and what to take from it, in a sentence or two.

![Chart. Validation loss against training steps for three model sizes.](placeholder:4/3 "Validation loss for each model size. The smallest model plateaus first.")

## Writing

### Lists

- Unordered lists use a muted disc.
- Items are spaced a little apart so long ones stay readable.
- **Bold** is semibold, *italic* is the real italic cut.

1. Ordered lists number in the muted ink.
2. Like this.

### Code

Inline code like `npm run dev` sits on a 2px chip. Blocks are Plex Mono on a flat panel with a hairline edge:

```ts
export function getPosts() {
  return posts.filter((post) => import.meta.env.DEV || !post.draft);
}
```

### Quotes and tables

> A quote is indented and set in italic secondary ink, with no coloured stripe down its edge.

| Element | Face | Size |
| --- | --- | --- |
| Body | Newsreader | 18px |
| Headings | Manrope | 15 to 20px |
| Captions | Manrope | 13px |
| Code | Plex Mono | 13px |

## Notes

Headings at the second and third level feed the contents. Anything before the first heading is listed as the introduction.
