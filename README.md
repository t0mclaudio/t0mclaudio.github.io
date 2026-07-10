# t0mclaudio.github.io

My professional website, built with [Jekyll](https://jekyllrb.com/) using the
[Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme
(loaded as a `remote_theme`, not forked).

## Local development

```sh
make install
make run
```

Visit `http://localhost:4000`.

## Structure

- `_config.yml` — site settings, theme config, author/sidebar profile
- `index.md` — home page content
- `_data/navigation.yml` — top nav links
- `_data/career_trajectory.yml` — career timeline entries shown on the home page
- `_pages/` — additional pages (Blogs, Works)
- `assets/images/` — site images (avatar, etc.)

Content is authored directly in this repo (Markdown + YAML data files) —
there is no CMS or runtime API dependency.

## Deployment

Pushing to `master` triggers `.github/workflows/pages.yml`, which builds the
site with Jekyll and deploys it via GitHub Pages (Actions-based deployment,
configured in repo Settings → Pages → Source → "GitHub Actions").
