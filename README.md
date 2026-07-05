# xin-xin.info

Personal website for Xin Xin, built with [Astro](https://astro.build).
All editable content lives in markdown files — no code changes needed for
day-to-day updates.

## Editing content

### Works (`src/content/works/`)

One markdown file per project. The file name becomes the URL
(`sample-work-one.md` → `/works/sample-work-one/`). The markdown body is the
project description; everything else is set in the frontmatter:

| Field | Purpose |
| --- | --- |
| `title` | Project name |
| `label` | Object label, e.g. "Interactive installation" |
| `year` | Year of the work |
| `order` | Position in the Works list (lower = first) |
| `featured` | `true` shows the hero image on the homepage |
| `heroImage` / `heroImageAlt` | Main installation photo |
| `heroVideo` | Optional video embed URL, shown instead of the hero image |
| `awards` | List of `name` (+ optional laurel `image`, `url`) |
| `press` | List of `title` + `url` links |
| `gallery` | More photos, each `image` + optional `caption` |
| `credits` | Credits paragraph |

Optional sections (awards, press, gallery, credits) disappear from the page
when left out.

### News (`src/content/news/`)

One markdown file per item, frontmatter only:

- `category`: `show`, `talk`, or `residency` — controls which section of the
  News page it appears in
- `year`, `title`, `venue`, and optional display `date` and `url`
- `current: true` also shows the item in the homepage news column

### Bio (`src/content/bio.md`)

The markdown body is the bio text. Frontmatter holds `email`, `headshot`,
and the list of `links`.

### Images

Put images in `public/images/` and reference them as `/images/file-name.jpg`.
The placeholder SVGs there can be deleted once real images are in.

## Developing

```sh
npm install     # first time only
npm run dev     # local dev server at http://localhost:4321
npm run build   # production build into dist/
```

## Deploying

Pushing to `main` triggers the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which builds the site and publishes it to
GitHub Pages. In the repo settings, set **Pages → Source** to
**GitHub Actions** (one-time setup).
