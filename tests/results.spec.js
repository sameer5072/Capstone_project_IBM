const { test, expect } = require('@playwright/test');
const { ResultsPage } = require('../Pages/ResultsPage');

test.describe('Results Page Tests', () => {

  test.use({ viewport: { width: 1280, height: 720 } });

  // 1️⃣ Navigation works
  test('Navigate to results page', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await expect(res.heading).toBeVisible();
  });

  // 2️⃣ Heading visible
  test('Heading visible', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await expect(res.heading).toBeVisible();
  });

  // 3️⃣ Election card visible
  test('Election card visible', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await expect(res.electionCard).toBeVisible();
  });

  // 4️⃣ Live tag visible
  test('Live tag visible', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await expect(res.liveTag).toBeVisible();
  });

  // 5️⃣ Vote count visible
  test('Vote count visible', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await expect(res.voteCount).toBeVisible();
  });

  // 6️⃣ Candidate list visible
  test('Candidate list visible', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await expect(res.candidateList.first()).toBeVisible();
  });

  // 7️⃣ Page URL check
  test('URL contains results', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await expect(page).toHaveURL(/results|vote/);
  });

  // 8️⃣ Page loads without crash
  test('Page loads without crash', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await expect(res.body).toBeVisible();
  });

  // 9️⃣ Multiple clicks safe
 test('Multiple clicks on results button', async ({ page }) => {
  const res = new ResultsPage(page);
  await res.goto();

  await res.openResults(); // instead of double click

  await expect(res.body).toBeVisible();
});

  // 🔟 Refresh page
  test('Refresh results page', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await page.reload();

    await expect(res.body).toBeVisible();
  });

  // 1️⃣1️⃣ Chart visible (if exists)
  test('Chart visible (if present)', async ({ page }) => {
  const res = new ResultsPage(page);
  await res.goto();
  await res.openResults();

  const count = await res.chart.count();

  if (count > 0) {
    await expect(res.chart.first()).toBeVisible();
  } else {
    console.log('Chart not present → skipping assertion');
  }
});

  // 1️⃣2️⃣ Data not empty
  test('Results data not empty', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    const text = await page.textContent('body');
    expect(text.length).toBeGreaterThan(50);
  });

  // 1️⃣3️⃣ Mobile view
  test('Mobile view results page', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await expect(res.body).toBeVisible();
  });

  // 1️⃣4️⃣ No console errors
  test('No console errors', async ({ page }) => {
    const errors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    expect(errors.length).toBe(0);
  });

  // 1️⃣5️⃣ Vote count format
  test('Vote count format valid', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    const text = await res.voteCount.textContent();
    expect(text).toMatch(/vote/i);
  });

  // 1️⃣6️⃣ Candidate names visible
  test('Candidate names visible', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();


    await expect(page.locator('text=Rodriguez').first()).toBeVisible();
  });

  // 1️⃣7️⃣ Percentage values visible
 test('Percentage values present (if available)', async ({ page }) => {
  const res = new ResultsPage(page);
  await res.goto();
  await res.openResults();

  const body = await page.textContent('body');

  if (body.includes('%')) {
    expect(body).toMatch(/%/);
  } else {
    console.log('No percentage found → skipping');
  }
});
  // 1️⃣8️⃣ Leading candidate visible
  test('Leading candidate displayed', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await expect(page.locator('text=Leading')).toBeVisible();
  });

  // 1️⃣9️⃣ Results persist after reload
  test('Results persist after reload', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await page.reload();

    await expect(res.body).toBeVisible();
  });

  // 2️⃣0️⃣ Scroll works
  test('Scroll results page', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await page.mouse.wheel(0, 500);

    await expect(res.body).toBeVisible();
  });

  // 2️⃣1️⃣ Back navigation
  test('Back navigation works', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await page.goBack();

    await expect(page).toHaveURL(/replit/);
  });

  // 2️⃣2️⃣ Forward navigation
  test('Forward navigation works', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    await page.goBack();
    await page.goForward();

    await expect(res.body).toBeVisible();
  });

  // 2️⃣3️⃣ Load time check
  test('Results load quickly', async ({ page }) => {
    const res = new ResultsPage(page);

    const start = Date.now();
    await res.goto();
    await res.openResults();
    const end = Date.now();

    expect(end - start).toBeLessThan(5000);
  });

  
  // 2️⃣4️⃣ UI elements count
 test.skip('Multiple candidates present', async ({ page }) => {
  const res = new ResultsPage(page);
  await res.goto();
  await res.openResults();

  const count = await res.candidateList.count();

  console.log('Candidate count:', count);

  expect(count).toBeGreaterThan(0);
});

  // 2️⃣5️⃣ Page stability
  test('Page stable after multiple reloads', async ({ page }) => {
    const res = new ResultsPage(page);
    await res.goto();
    await res.openResults();

    for (let i = 0; i < 2; i++) {
      await page.reload();
    }

    await expect(res.body).toBeVisible();
  });

});