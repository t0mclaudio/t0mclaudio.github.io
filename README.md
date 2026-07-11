# t0mclaudio.github.io

My professional website, built with [Astro](https://astro.build/).

## Local development

```sh
make install
make run
```

Visit `http://localhost:4321`.

## Structure

- `src/consts.ts` — site metadata, author profile, nav links
- `src/layouts/BaseLayout.astro` — HTML shell, SEO meta tags, nav
- `src/components/` — `Nav.astro`, `AuthorSidebar.astro`
- `src/pages/` — routes: `index.astro` (home), `blogs.astro`, `works.astro`
- `src/styles/global.css` — global styles
- `public/images/` — site images (avatar, etc.)

Content is authored directly in this repo — there is no CMS or runtime API
dependency.

## Deployment

Pushing to `master` triggers `.github/workflows/pages.yml`, which builds the
site with Astro and deploys it via GitHub Pages (Actions-based deployment,
configured in repo Settings → Pages → Source → "GitHub Actions").
