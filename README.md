# Syed Abdul Rahman Al-Haddad — Portfolio

A static portfolio for AI and data engineering work. Built with HTML, CSS, and JavaScript, with locally hosted Archivo fonts and no runtime dependencies.

## Preview

Open `index.html` directly, or run `npm run dev` and visit `http://127.0.0.1:4173`.

## Build and verify

```sh
npm ci
node node_modules/playwright/cli.js install chromium
npm run build
npm run test:visual -- --production
```

The build copies public assets into `dist/`. The browser check exercises 1440, 768, 390, and 320px layouts, category filtering, project disclosures, keyboard navigation, the mobile menu, reduced motion, no-JavaScript behavior, direct local-file use, and the résumé PDF. Screenshots and results are saved under `output/playwright/` and excluded from Git.

`CHROME_PATH` can select an existing Chromium executable. The checked-in `.npmrc` disables executable symlinks for compatibility with Windows-mounted workspaces.

## Content

The supplied `SAR_Resume_V6.pdf` informs the project, experience, skills, and education content. The portfolio uses the owner’s later correction of **five Dean’s List semesters**; the downloadable PDF is the original supplied V6 document.

The three architecture graphics illustrate documented project flows. The portrait is the original project asset. Font licensing is included under `assets/fonts/`.

## Deployment

`vercel.json` uses the native Node build script and serves only `dist/`, with no dependency installation required. The intended GitHub repository is `amanalhaddad/Portfolio-Website`. Link the existing Vercel project before deploying so a duplicate project is not created.

Use the authenticated Vercel CLI or the repository’s existing Vercel integration. Account credentials and local Vercel project metadata are excluded from Git.

The complete Windows PowerShell and existing-project publishing flow is in [DEPLOY.md](DEPLOY.md).
