<h1 align="center">larrisx.com</h1>
<p align="center">
  Larris Xie's personal portfolio, built for fast, smooth interactions without changing the original visual design.
</p>

## Stack

- TanStack Start and TanStack Router
- React 19 and TypeScript
- Tailwind CSS v4
- Framer Motion
- Cloudflare Workers and Static Assets
- Vite Imagetools for responsive WebP generation
- Playwright for desktop and mobile behavior checks

## Development

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:3000`.

## Validation

```bash
npm test
```

This runs linting, TypeScript checks, a production Cloudflare build, and the Playwright suite.

## Deployment

```bash
npm run deploy
```

Cloudflare's Git build should use `npm run build` as the build command and `npx wrangler deploy` as the deploy command.

## Project Structure

```text
/src/routes       TanStack Start file routes
/src/assets       Fonts, responsive image sources, posters, and videos
/components       Reusable UI components
/lib              Portfolio data and UI utilities
/public           Static icons, the resume, and Cloudflare headers
/tests            Browser-level parity and performance checks
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
