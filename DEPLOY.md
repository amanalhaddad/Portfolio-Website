# Publish the portfolio

The redesign is ready for local review. Commit the updated source and assets, then push to the existing GitHub repository.

## Prepare the existing Vercel project

1. Open the Vercel project associated with `portfolio-website-4q5h55br0-aman-3727.vercel.app`.
2. In **Settings → Git**, confirm that it is connected to `amanalhaddad/Portfolio-Website`.
3. In **Settings → Environments → Production → Branch Tracking**, use `main`.
4. Keep the Root Directory at the repository root.

The checked-in `vercel.json` specifies:

| Setting | Value |
| --- | --- |
| Framework | Other / no framework |
| Build Command | `node scripts/build.mjs` |
| Install Command | Skipped (empty string) |
| Output Directory | `dist` |

Vercel reads these settings from the repository. The build has no external package requirements.

## Push from Windows PowerShell

```powershell
Set-Location 'D:\VibeC0DE\Portfolio Website'
git status
git add .
git commit -m "Redesign portfolio with interactive lanyard and refreshed content"
git push origin main
```

Complete GitHub sign-in if Git prompts. Once the repository is connected, pushing to the production branch triggers a production deployment. Wait for the new deployment to show **Ready**, then open the production URL shown in Vercel. Use that current production URL when sharing the site.

## Local verification, if needed

```powershell
npm ci
node node_modules/playwright/cli.js install chromium
npm run build
npm run test:visual -- --production
```

The current browser suite covers five viewport sizes, the lanyard and logo-rail interactions, native reading behavior, keyboard access, and larger-text reflow. The latest supplied CV is the résumé download and confirms five Dean’s List semesters. Check `output/playwright/report.json` for the latest local run.

References: [Vercel Git deployments](https://vercel.com/docs/git), [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json).
