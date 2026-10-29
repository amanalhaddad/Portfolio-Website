import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { createPreviewServer } from './serve.mjs';
import { spawn } from 'node:child_process';

const before = process.argv.includes('--before');
const production = process.argv.includes('--production');
const inspectorIndex = process.argv.indexOf('--taste-inspector');
const inspectorPath = inspectorIndex >= 0 ? process.argv[inspectorIndex + 1] : null;
const output = resolve(before ? '.taste-skill/before' : 'output/playwright');
await mkdir(output, { recursive: true });
const server = createPreviewServer(production ? { root: resolve('dist') } : undefined);
await new Promise(done => server.listen(0, '127.0.0.1', done));
const baseURL = `http://127.0.0.1:${server.address().port}`;
const cachedChrome = '/home/syed_abdul_rahman/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome';
const executablePath = process.env.CHROME_PATH || (existsSync(cachedChrome) ? cachedChrome : undefined);
if (inspectorPath) {
  const chromeIndex = process.argv.indexOf('--inspector-browser');
  const inspectorBrowser = chromeIndex >= 0 ? process.argv[chromeIndex + 1] : executablePath;
  const allowIndex = process.argv.indexOf('--inspector-allow');
  const allowance = allowIndex >= 0 ? ['--allow', process.argv[allowIndex + 1]] : [];
  const inspector = spawn(process.execPath, [inspectorPath, baseURL, '--out', resolve(before ? '.taste-skill/before-inspect' : '.taste-skill/after'), '--widths', '1440,768,390', ...allowance], { stdio: 'inherit', env: { ...process.env, CHROME_PATH: inspectorBrowser } });
  const code = await new Promise(done => inspector.once('exit', done));
  await new Promise(done => server.close(done));
  process.exit(code ?? 1);
}
const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const report = { mode: before ? 'before' : 'after', viewports: [], checks: [] };
const failures = [];

try {
  for (const width of [1440, 768, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: width < 600 ? 844 : 960 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(baseURL)) errors.push(`${response.status()}: ${response.url()}`); });
    await page.goto(baseURL);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(1100);
    const metrics = await page.evaluate(() => ({
      width: innerWidth,
      pageWidth: document.documentElement.scrollWidth,
      headings: [...document.querySelectorAll('h1,h2,h3,h4')].filter(node => node.getBoundingClientRect().height).map(node => ({ text: node.innerText, lines: Math.round(node.getBoundingClientRect().height / parseFloat(getComputedStyle(node).lineHeight)) })),
      brokenImages: [...document.images].filter(image => image.checkVisibility() && (!image.complete || !image.naturalWidth)).map(image => image.src),
      awardYearLines: [...document.querySelectorAll('.awards-table tbody td:first-child')].map(cell => { const range = document.createRange(); range.selectNodeContents(cell); return range.getClientRects().length; }),
      missingAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(link => link.hash.length > 1 && !document.getElementById(decodeURIComponent(link.hash.slice(1)))).map(link => link.hash)
    }));
    report.viewports.push({ ...metrics, errors });
    const label = width === 1440 ? 'desktop' : width === 768 ? 'tablet' : width === 390 ? 'mobile' : 'small-mobile';
    await page.screenshot({ path: resolve(output, `${label}.png`), fullPage: true });
    await page.screenshot({ path: resolve(output, `${label}-fold.png`) });
    if (!before) {
      if (metrics.pageWidth !== width) failures.push(`Horizontal overflow at ${width}px: ${metrics.pageWidth}`);
      if (metrics.brokenImages.length) failures.push(`Broken images at ${width}px: ${metrics.brokenImages}`);
      if (metrics.awardYearLines.some(lines => lines !== 1)) failures.push(`Award year digits wrap at ${width}px`);
      if (metrics.missingAnchors.length) failures.push(`Missing anchors at ${width}px: ${metrics.missingAnchors}`);
      if (errors.length) failures.push(`Browser errors at ${width}px: ${errors}`);
      if (metrics.headings.find(heading => heading.text.includes('SYED'))?.lines !== 2) failures.push(`Hero wraps beyond two lines at ${width}px`);
    }
    await page.close();
  }
  await writeFile(resolve(output, 'report.json'), JSON.stringify(report, null, 2));
  assert.deepEqual(failures, [], 'Responsive browser checks');


  if (!before) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
    await page.goto(baseURL);
    assert.deepEqual(await page.locator('.project[open]').evaluateAll(nodes => nodes.map(node => node.id)), ['project-shopper']);
    const heroResume = page.locator('.hero a[download]');
    await page.evaluate(() => document.fonts.ready);
    const resumeBox = await heroResume.boundingBox();
    assert.ok(resumeBox && resumeBox.y + resumeBox.height <= 960, 'Résumé action should be on the first desktop screen');
    report.checks.push('One featured project initially expanded and first-screen résumé access');
    for (const [label, count] of [['AI & machine learning', 4], ['Data engineering', 1], ['Full-stack', 1], ['All projects', 6]]) {
      await page.getByRole('button', { name: label, exact: true }).click();
      assert.equal(await page.locator('.project:not([hidden])').count(), count, `${label} count`);
      assert.equal(await page.locator('#experience').isVisible(), true, 'Project filters must preserve experience');
      assert.equal(await page.getByRole('button', { name: label, exact: true }).getAttribute('aria-pressed'), 'true');
    }
    report.checks.push('Category filters, counts, pressed state, and experience isolation');
    const project = page.locator('#project-fragrance');
    assert.equal(await project.getAttribute('open'), null);
    await project.locator('summary').click();
    assert.equal(await project.getAttribute('open'), '');
    assert.equal(await page.locator('#project-shopper').getAttribute('open'), '', 'Readers may keep multiple projects open');
    await project.locator('summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await project.getAttribute('open'), null);
    await page.keyboard.press('Enter');
    assert.equal(await project.getAttribute('open'), '');
    await project.scrollIntoViewIfNeeded();
    await project.locator('img').evaluate(image => image.decode());
    await page.waitForTimeout(550);
    await page.screenshot({ path: resolve(output, 'desktop-fragrance.png') });
    await page.keyboard.press('Enter');
    assert.equal(await project.getAttribute('open'), null);
    report.checks.push('Project details with pointer and keyboard');
    await page.getByRole('link', { name: 'Skip to content' }).focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
    report.checks.push('Keyboard skip link');
    const resume = await page.request.get(`${baseURL}/assets/SAR_Resume_V6.pdf`);
    assert.equal(resume.status(), 200);
    assert.equal(resume.headers()['content-type'], 'application/pdf');
    assert.equal((await resume.body()).subarray(0, 4).toString(), '%PDF');
    report.checks.push('Working local résumé PDF');
    const links = await page.locator('a[href^="mailto:"],a[href^="tel:"],a[href^="https://github.com/"]').evaluateAll(nodes => nodes.map(node => node.href));
    assert.ok(links.includes('mailto:aman.alhaddad@gmail.com'));
    assert.ok(links.includes('tel:+60194004221'));
    assert.ok(links.includes('https://github.com/amanalhaddad'));
    assert.ok(links.includes('https://github.com/amanalhaddad/Ai-Powered-Personal-Shopper-Backenda'));
    assert.ok(links.includes('https://github.com/amanalhaddad/Gaffaly.my'));
    report.checks.push('Email, telephone, and existing GitHub destinations');
    report.checks.push('Owner-supplied SmartShopper backend and fragrance platform source destinations');
    await page.evaluate(() => window.scrollTo({ top: document.querySelector('#contact').offsetTop, behavior: 'instant' }));
    await page.waitForFunction(() => document.querySelector('.nav-contact').getAttribute('aria-current') === 'location');
    await page.getByRole('link', { name: 'Back to top', exact: true }).click();
    await page.waitForFunction(() => window.scrollY < 2 && document.querySelectorAll('#site-menu [aria-current]').length === 0);
    report.checks.push('Back to top clears the active navigation location');
    await page.close();

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    await mobile.goto(baseURL);
    await mobile.evaluate(() => document.fonts.ready);
    await mobile.waitForTimeout(1100);
    const mobileResume = await mobile.locator('.hero a[download]').boundingBox();
    assert.ok(mobileResume && mobileResume.y + mobileResume.height <= 844, 'Résumé action should be on the first mobile screen');
    await mobile.locator('#project-fragrance summary').click();
    await mobile.setViewportSize({ width: 768, height: 960 });
    assert.equal(await mobile.locator('#project-fragrance').getAttribute('open'), '', 'Resizing must preserve the reader’s expanded projects');
    await mobile.setViewportSize({ width: 390, height: 844 });
    assert.equal(await mobile.locator('#project-fragrance').getAttribute('open'), '');
    await mobile.locator('#project-fragrance summary').click();
    await mobile.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await mobile.getByRole('button', { name: 'Open menu' }).click();
    assert.equal(await mobile.getByRole('button', { name: 'Close menu' }).getAttribute('aria-expanded'), 'true');
    await mobile.screenshot({ path: resolve(output, 'mobile-menu.png') });
    await mobile.keyboard.press('Escape');
    assert.equal(await mobile.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded'), 'false');
    await mobile.getByRole('button', { name: 'Open menu' }).click();
    await mobile.locator('#site-menu').getByRole('link', { name: 'Experience', exact: true }).click();
    assert.equal(await mobile.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded'), 'false');
    assert.ok(mobile.url().endsWith('#experience'));
    report.checks.push('Mobile menu, Escape, link selection, and deep links');
    report.checks.push('Mobile résumé access and disclosure choices preserved across resizing');
    await mobile.close();

    const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await reduced.goto(baseURL);
    assert.equal(await reduced.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length), 0);
    const reducedAction = reduced.locator('.hero .button');
    const actionBox = await reducedAction.boundingBox();
    await reduced.mouse.move(actionBox.x + actionBox.width / 2, actionBox.y + actionBox.height / 2);
    await reduced.mouse.down();
    assert.equal(await reducedAction.evaluate(el => getComputedStyle(el).transform), 'none', 'Reduced motion must also remove press scaling');
    assert.ok(Number(await reducedAction.evaluate(el => getComputedStyle(el).opacity)) < 1, 'Pressed feedback remains available without movement');
    await reduced.mouse.up();
    await reduced.locator('.contact-email').hover();
    assert.equal(await reduced.locator('.contact-arrow').evaluate(el => getComputedStyle(el).transform), 'none', 'Reduced motion must remove email-arrow hover travel');
    const reducedSummary = reduced.locator('#project-shopper summary');
    await reducedSummary.scrollIntoViewIfNeeded();
    const summaryBox = await reducedSummary.boundingBox();
    const normalBackground = await reducedSummary.evaluate(el => getComputedStyle(el).backgroundColor);
    await reduced.mouse.move(summaryBox.x + summaryBox.width / 2, summaryBox.y + summaryBox.height / 2);
    await reduced.mouse.down();
    assert.notEqual(await reducedSummary.evaluate(el => getComputedStyle(el).backgroundColor), normalBackground, 'Project summaries must acknowledge pointer-down immediately');
    await reduced.mouse.up();
    await reduced.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await reduced.screenshot({ path: resolve(output, 'reduced-motion.png') });
    report.checks.push('Reduced motion keeps content visible without entrance animation');
    report.checks.push('Immediate summary press feedback and reduced-motion press/hover states');
    await reduced.close();

    report.textScaling = [];
    for (const width of [320, 390, 768]) {
      const largerText = await browser.newPage({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
      await largerText.goto(baseURL);
      await largerText.evaluate(() => document.fonts.ready);
      await largerText.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      const metrics = await largerText.evaluate(() => ({ width: innerWidth, pageWidth: document.documentElement.scrollWidth, bodyFont: getComputedStyle(document.body).fontSize }));
      assert.equal(metrics.pageWidth, width, `The page must reflow at 200% root text size and ${width}px width`);
      assert.equal(metrics.bodyFont, '32px', 'Body copy should respect the larger text preference');
      const yearLines = await largerText.locator('.awards-table tbody td:first-child').evaluateAll(cells => cells.map(cell => { const range = document.createRange(); range.selectNodeContents(cell); return range.getClientRects().length; }));
      assert.ok(yearLines.every(lines => lines === 1), `Award years should remain readable on one line with larger text at ${width}px`);
      await largerText.locator('.contact-email').focus();
      const emailRects = await largerText.locator('.contact-email').evaluate(el => {
        const text = document.createRange();
        text.selectNodeContents(el);
        return [...text.getClientRects()].filter(r => r.width > 0).map(r => ({ left: r.left, right: r.right }));
      });
      assert.ok(emailRects.every(r => r.left >= 0 && r.right <= width), 'Every visible fragment of the email should stay in the viewport');
      report.textScaling.push(metrics);
      if (width === 390) await largerText.screenshot({ path: resolve(output, 'larger-text-contact.png') });
      await largerText.close();
    }
    report.checks.push('200% root text scaling and complete contact-address reflow at 320, 390, and 768px');

    const plain = await browser.newPage({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
    await plain.goto(baseURL);
    assert.equal(await plain.locator('.project:visible').count(), 6);
    assert.equal(await plain.locator('#site-menu a:visible').count(), 4);
    assert.equal(await plain.locator('.hero a[download]').isVisible(), true);
    await plain.locator('#project-fragrance summary').click();
    assert.equal(await plain.locator('#project-fragrance').getAttribute('open'), '');
    await plain.locator('#project-fragrance summary').click();
    assert.equal(await plain.locator('#project-fragrance').getAttribute('open'), null);
    report.checks.push('No-JavaScript project list, native details, and navigation');
    await plain.close();

    const local = await browser.newPage();
    await local.goto(pathToFileURL(resolve('index.html')).href);
    await local.evaluate(() => document.fonts.ready);
    assert.equal(await local.locator('h1').isVisible(), true);
    await local.getByRole('button', { name: 'Data engineering', exact: true }).click();
    assert.equal(await local.locator('.project:not([hidden])').count(), 1);
    assert.equal(await local.locator('#experience').isVisible(), true);
    report.checks.push('Direct file:// use, local fonts, and filtering');
    await local.close();
  }
  await writeFile(resolve(output, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ viewports: report.viewports.map(viewport => ({ width: viewport.width, pageWidth: viewport.pageWidth, browserErrors: viewport.errors.length })), checks: report.checks }, null, 2));
} finally {
  await browser.close();
  await new Promise(done => server.close(done));
}
