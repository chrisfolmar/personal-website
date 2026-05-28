/**
 * Generates og-default.png using Playwright.
 * Renders an inline HTML card that matches the "Engineer's notebook"
 * design system (cream bg, deep navy, brass accent) at 1200×630.
 *
 * Usage: node scripts/generate-og-image.mjs
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../client/public/og-default.png');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800&family=Inter:wght@400;500&family=IBM+Plex+Mono:wght@500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    width: 1200px;
    height: 630px;
    background: hsl(43, 50%, 92%);
    font-family: 'Inter', sans-serif;
    display: flex;
    align-items: stretch;
    overflow: hidden;
  }

  .card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 72px 80px 64px;
    position: relative;
  }

  /* Dotted grid texture */
  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, hsl(215, 60%, 16%, 0.12) 1px, transparent 1px);
    background-size: 24px 24px;
    pointer-events: none;
  }

  .eyebrow {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: hsl(41, 72%, 48%);
  }

  .middle {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    padding: 40px 0 32px;
  }

  h1 {
    font-family: 'Inter Tight', sans-serif;
    font-size: 72px;
    font-weight: 800;
    line-height: 1.0;
    color: hsl(215, 60%, 16%);
    letter-spacing: -0.02em;
  }

  .highlight {
    display: inline;
    background: hsl(41, 72%, 58%, 0.35);
    padding: 0 4px;
  }

  .subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 22px;
    font-weight: 400;
    color: hsl(215, 60%, 28%);
    line-height: 1.4;
    max-width: 680px;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .domain {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 16px;
    font-weight: 500;
    color: hsl(215, 60%, 16%);
    letter-spacing: 0.04em;
  }

  .rule {
    display: flex;
    align-items: center;
    gap: 10px;
    color: hsl(41, 72%, 48%);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: hsl(41, 72%, 48%);
    flex-shrink: 0;
  }

  .line {
    width: 120px;
    height: 1px;
    border-top: 1.5px dashed hsl(41, 72%, 48%, 0.5);
  }
</style>
</head>
<body>
<div class="card">
  <div class="eyebrow">Engineering Manager · AI Transformation</div>

  <div class="middle">
    <h1>Chris<br/><span class="highlight">Folmar</span></h1>
    <p class="subtitle">Engineering Manager at Fullscript — leading teams, modernizing systems, and putting AI to work on the problems that matter.</p>
  </div>

  <div class="footer">
    <div class="rule">
      <div class="dot"></div>
      <div class="line"></div>
    </div>
    <div class="domain">chrisfolmar.com</div>
  </div>
</div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(html, { waitUntil: 'networkidle' });
// Give Google Fonts a moment to load
await page.waitForTimeout(1500);
const buf = await page.screenshot({ type: 'png', fullPage: false });
await browser.close();

writeFileSync(OUT, buf);
console.log(`Written: ${OUT}`);
