# Syed Abdul Rahman Al-Haddad — Portfolio

A portfolio for AI and data engineering work, built with static HTML, CSS, and JavaScript. Archivo, the Motion 14.7.1 browser bundle, all tool logos, and every image are served locally. The production build requires no dependency installation.

## Preview

Open `index.html` directly, or run `npm run dev` and visit `http://127.0.0.1:4173`.

## Build and verify

```sh
npm ci
node node_modules/playwright/cli.js install chromium
npm run build
npm run test:visual -- --production
```

The build copies public assets into `dist/`. Browser checks cover 1440, 1280, 768, 390, and 320px layouts; first-screen résumé access; project disclosures and filters; badge dragging, release, re-grabbing, and keyboard flipping; the logo rail's direction and hover-to-pause behavior; keyboard navigation; the mobile menu; reduced motion; 200% root text size; no-JavaScript reading; direct local-file use; and the résumé PDF. Screenshots and results are saved under `output/playwright/` and excluded from Git.

`CHROME_PATH` can select an existing Chromium executable. The checked-in `.npmrc` disables executable symlinks for compatibility with Windows-mounted workspaces.

## Content

The latest supplied `Syed_Abdul_Rahman_Alhaddad_CV.pdf` informs the experience, skills, and education content and is the current download. It confirms **five Dean’s List semesters**, ChromaDB, and 88% semantic retrieval accuracy for SmartShopper. The additional FYP poster informs the project description and screenshots. Accuracy and timing figures are explicitly scoped to the project evaluation.

The portrait is the original project asset. The owner supplied the Khazanah pass photograph and two certificate images. SmartShopper's real extension screens are rendered from the supplied poster, and Gaffaly's scent-advisor image is a capture of its live site. One authored lakehouse diagram remains. Sources and hashes are recorded under `assets/media/`; font, Motion, and Simple Icons licenses are included alongside their local files.

SmartShopper links to its owner-supplied backend repository. Gaffaly links to the owner-selected live storefront. Only SmartShopper is expanded on arrival; opening further projects and resizing preserve the reader's choices.

## Interactions

Drag the portrait pass and release it to let it settle. Tap it or use Enter/Space to reveal the reverse face; Escape returns to the front. On touch screens, the pass handles horizontal dragging while vertical gestures retain native page scrolling.

The tool rail moves from right to left and pauses while the pointer hovers over it, then resumes when the pointer leaves. There is no pause/resume button. Reduced motion shows a static wrapping collection and removes spring settling, scrolling travel, and reveal movement. Essential content, links, and native disclosures remain available without JavaScript.

## Deployment

`vercel.json` uses the native Node build script and serves only `dist/`, with no dependency installation required. The intended GitHub repository is `amanalhaddad/Portfolio-Website`. Link the existing Vercel project before deploying so a duplicate project is not created.

Use the authenticated Vercel CLI or the repository’s existing Vercel integration. Account credentials and local Vercel project metadata are excluded from Git.

The complete Windows PowerShell and existing-project publishing flow is in [DEPLOY.md](DEPLOY.md).
