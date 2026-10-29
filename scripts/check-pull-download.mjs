import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';

export async function checkPullDownload(browser, baseURL, output) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, acceptDownloads: true });
  try {
    await page.clock.install();
    await page.goto(baseURL);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1800);
    await page.clock.pauseAt(await page.evaluate(() => Date.now() + 100));
    const card = page.locator('.lanyard-card');
    const stage = page.locator('.lanyard-stage');
    const downloads = [];
    page.on('download', download => downloads.push(download));
    assert.equal(await page.locator('.resume-label').innerText(), 'Pull to download résumé');
    assert.equal(downloads.length, 0, 'Loading the portfolio must never start a download');
    const grab = async () => {
      const box = await card.boundingBox();
      const point = { x: box.x + box.width / 2, y: box.y + 70 };
      await page.mouse.move(point.x, point.y);
      await page.mouse.down();
      return point;
    };
    const move = async (point, dx, dy) => {
      await page.mouse.move(point.x + dx, point.y + dy, { steps: 8 });
      await page.clock.runFor(20);
    };
    const drag = async (dx, dy) => {
      const point = await grab();
      await move(point, dx, dy);
      await page.mouse.up();
      await page.clock.runFor(20);
    };
    await drag(0, 60);
    await drag(130, 20);
    await drag(140, 140);
    const retreat = await grab();
    await move(retreat, 0, 140);
    assert.equal(await stage.getAttribute('data-pull-state'), 'armed');
    assert.equal(downloads.length, 0, 'Crossing the threshold must wait for release');
    await move(retreat, 0, 35);
    await page.mouse.up();
    assert.equal(downloads.length, 0, 'Small, sideways, diagonal, and withdrawn pulls must not download');

    const first = await grab();
    await move(first, 0, 140);
    await page.screenshot({ path: resolve(output, 'badge-download-armed.png') });
    const firstDownload = page.waitForEvent('download');
    await page.mouse.up();
    const file = await firstDownload;
    assert.equal(file.suggestedFilename(), 'Syed_Abdul_Rahman_Alhaddad_CV.pdf');
    assert.equal(await file.failure(), null);
    assert.equal(await stage.getAttribute('data-pull-state'), 'cooldown');
    assert.match(await page.locator('.badge-pull-copy').innerText(), /30s/);
    assert.match(await page.locator('.hero-resume .file-note').innerText(), /30s/, 'The countdown should also appear beside the résumé link');
    await page.screenshot({ path: resolve(output, 'badge-download-cooldown.png') });
    await drag(0, 150);
    await drag(80, 0);
    assert.equal(downloads.length, 1, 'Playing with the pass during cooldown must not download again');
    assert.equal(await card.isEnabled(), true, 'Cooldown must not disable the pass');
    await page.clock.fastForward(28_000);
    assert.equal(await stage.getAttribute('data-pull-state'), 'cooldown', 'The cooldown must last the full 30 seconds');
    await page.clock.fastForward(2_100);
    assert.equal(await stage.getAttribute('data-pull-state'), 'ready');
    assert.equal(await page.locator('.hero-resume .file-note').innerText(), 'PDF, 568 KB');
    const repeatDownload = page.waitForEvent('download');
    await drag(0, 140);
    await repeatDownload;
    assert.equal(downloads.length, 2, 'A new pull can download again after the cooldown');
    const keyboardDownload = page.waitForEvent('download');
    await page.locator('.hero-resume').focus();
    await page.keyboard.press('Enter');
    await keyboardDownload;
    assert.equal(downloads.length, 3, 'The direct keyboard download remains available');
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
    await page.clock.runFor(80);
    await page.clock.fastForward(30_100);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.clock.runFor(80);
    assert.equal(await stage.getAttribute('data-pull-state'), 'ready', 'Offscreen time must count toward the cooldown');
  } finally {
    await page.close();
  }

  const touchPage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, acceptDownloads: true });
  try {
    await touchPage.goto(baseURL);
    await touchPage.evaluate(() => document.fonts.ready);
    const card = touchPage.locator('.lanyard-card');
    await card.scrollIntoViewIfNeeded();
    await touchPage.waitForTimeout(1100);
    await card.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
    assert.equal(await card.evaluate(element => getComputedStyle(element).touchAction), 'pinch-zoom');
    const cdp = await touchPage.context().newCDPSession(touchPage);
    const send = (type, point) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: point ? [{ ...point, id: 1 }] : [] });
    const pull = async (cancelled, expectedState = 'armed') => {
      const box = await card.boundingBox();
      const point = { x: box.x + box.width / 2, y: box.y + 65 };
      await send('touchStart', point);
      for (let step = 1; step <= 6; step += 1) await send('touchMove', { x: point.x, y: point.y + 140 * step / 6 });
      assert.ok(await card.evaluate(element => element.classList.contains('is-dragging')), 'The touch gesture must reach and move the pass');
      assert.equal(await touchPage.locator('.lanyard-stage').getAttribute('data-pull-state'), expectedState);
      await send(cancelled ? 'touchCancel' : 'touchEnd');
    };
    const downloads = [];
    touchPage.on('download', download => downloads.push(download));
    const originalScroll = await touchPage.evaluate(() => scrollY);
    const containment = [];
    const captureRebound = async filename => {
      const [samples] = await Promise.all([
        touchPage.evaluate(async () => {
          const samples = [];
          for (let frame = 0; frame < 24; frame += 1) {
            await new Promise(requestAnimationFrame);
            const hint = document.querySelector('.badge-hint').getBoundingClientRect();
            const hero = document.querySelector('.hero').getBoundingClientRect();
            samples.push({ width: innerWidth, hintBottom: hint.bottom, heroBottom: hero.bottom });
          }
          return samples;
        }),
        touchPage.screenshot({ path: resolve(output, filename) })
      ]);
      assert.ok(samples.every(sample => sample.hintBottom <= sample.heroBottom + 1), 'The complete caption and meter must stay inside the hero throughout the release rebound');
      containment.push(...samples);
    };
    await pull(true);
    assert.equal(downloads.length, 0, 'A cancelled touch pull must not download');
    await touchPage.waitForTimeout(800);
    const download = touchPage.waitForEvent('download');
    await pull(false);
    assert.equal((await download).suggestedFilename(), 'Syed_Abdul_Rahman_Alhaddad_CV.pdf');
    assert.equal(await touchPage.evaluate(() => scrollY), originalScroll, 'Pulling the pass must not scroll the page');
    await captureRebound('badge-download-touch-cooldown.png');
    await send('touchStart', { x: 8, y: 650 });
    await send('touchMove', { x: 8, y: 450 });
    await send('touchEnd');
    await touchPage.waitForTimeout(250);
    assert.ok(await touchPage.evaluate(() => scrollY) > originalScroll + 40, 'Swiping outside the pass must still scroll the page');
    await touchPage.evaluate(() => new Promise(resolve => {
      let previous = scrollY, stableFrames = 0;
      function settled() {
        stableFrames = Math.abs(scrollY - previous) < .5 ? stableFrames + 1 : 0;
        previous = scrollY;
        if (stableFrames >= 6) resolve();
        else requestAnimationFrame(settled);
      }
      requestAnimationFrame(settled);
    }));
    await touchPage.setViewportSize({ width: 320, height: 844 });
    await card.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await touchPage.waitForTimeout(300);
    await touchPage.waitForFunction(() => {
      const bounds = document.querySelector('.lanyard-card').getBoundingClientRect();
      return bounds.top >= 0 && bounds.bottom <= innerHeight;
    });
    await pull(false, 'cooldown');
    assert.equal(downloads.length, 1, 'Play during cooldown at a smaller width must not start another download');
    await captureRebound('badge-download-touch-small-cooldown.png');
    await writeFile(resolve(output, 'pull-clearance-check.json'), JSON.stringify({ result: 'passed', samples: containment }, null, 2) + '\n');
    await cdp.detach();
  } finally {
    await touchPage.close();
  }
  return ['Deliberate pull-to-download, release/retreat behavior, 30-second cooldown, rearming, offscreen recovery, and keyboard fallback', 'Touch pull download and cancellation, pinch-zoom allowance, and native page scrolling outside the pass'];
}
