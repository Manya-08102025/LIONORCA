const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Scroll to Turnkey section
  await page.evaluate(() => {
    const el = document.getElementById('turnkey');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(600);
  const turnkey = await page.locator('#turnkey');
  await turnkey.screenshot({ path: 'C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-turnkey-verification.png' });

  // Scroll to Process section
  await page.evaluate(() => {
    const el = document.getElementById('process');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(600);
  const process = await page.locator('#process');
  await process.screenshot({ path: 'C:/Users/Manya Verma/.gemini/antigravity/brain/5cf2b075-3b45-4ecc-a3e6-419ce585766e/live-process-clarity-updated.png' });

  await browser.close();
  console.log('Screenshots saved successfully');
})();

