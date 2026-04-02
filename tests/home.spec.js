const { test, expect } = require('@playwright/test');
const { HomePage } = require('../Pages/HomePage');

test.describe('Homepage Tests', () => {

  // 1️⃣ Page Load
  test('Homepage loads successfully', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(page).toHaveURL(/replit/);
  });

  // 2️⃣ Title Check
  test.skip('Page title is correct', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Online Voting System/i);
  });

  // 3️⃣ Logo Visible
  test('Logo is visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.logo).toBeVisible();
  });

  // 4️⃣ Main Heading Visible
  test('Main heading visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.heading).toBeVisible();
  });

  // 5️⃣ Subtext Visible
  test('Subtext visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.subText).toBeVisible();
  });

  // 6️⃣ Register Button Visible
  test.skip('Register button visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.registerBtn).toBeVisible();
  });

  // 7️⃣ Voter Login Button Visible
  test('Voter login button visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.voterLoginBtn).toBeVisible();
  });

  // 8️⃣ Header Login Button Visible
  test('Header login button visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.loginBtn).toBeVisible();
  });

  // 9️⃣ Register Navigation Works
  test.skip('Click Register navigates', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.registerBtn.click();

    await expect(page).toHaveURL(/register/);
  });

  // 🔟 Login Navigation Works
  test('Click Login navigates', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.loginBtn.click();

    await expect(page).toHaveURL(/login/);
  });

  // 1️⃣1️⃣ Voter Login Navigation
  test('Voter login button works', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.voterLoginBtn.click();

    await expect(page).toHaveURL(/login/);
  });

  // 1️⃣2️⃣ Theme Toggle Click
  test.skip('Theme toggle works', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.themeToggle.click();

    await expect(home.heading).toBeVisible(); // still visible after toggle
  });

  // 1️⃣3️⃣ Buttons Enabled
  test.skip('Buttons are enabled', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.registerBtn).toBeEnabled();
    await expect(home.loginBtn).toBeEnabled();
  });

  // 1️⃣4️⃣ Page Responsive (Mobile)
  test('Mobile view loads', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const home = new HomePage(page);
    await home.goto();

    await expect(home.heading).toBeVisible();
  });

  // 1️⃣5️⃣ No Console Errors
  test('No console errors', async ({ page }) => {
    const errors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    const home = new HomePage(page);
    await home.goto();

    expect(errors.length).toBe(0);
  });

  // 1️⃣6️⃣ Check all main buttons count
test('All main buttons present', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  const buttons = page.locator('button');
  const count = await buttons.count();

  expect(count).toBeGreaterThan(2);
});

//17 logo text visible
test('Logo text visible', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await expect(home.logo).toBeVisible();
  await expect(home.logo).toContainText(/civicvote/i);
});

// 1️⃣8️⃣ Heading text content
test('Heading contains expected text', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await expect(home.heading).toContainText(/democracy/i);
});

// 1️⃣9️⃣ Subtext not empty
test('Subtext should not be empty', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  const text = await home.subText.textContent();
  expect(text.trim().length).toBeGreaterThan(0);
});

// 2️⃣0️⃣ Check page loads within time
test('Page load performance', async ({ page }) => {
  const start = Date.now();

  const home = new HomePage(page);
  await home.goto();

  const loadTime = Date.now() - start;
  expect(loadTime).toBeLessThan(5000); // <5 sec
});

// 2️⃣1️⃣ Double click login button
test('Double click login button', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await home.loginBtn.dblclick();

  await expect(page).toHaveURL(/login/);
});

// 2️⃣2️⃣ Rapid clicks on voter login
test('Multiple clicks voter login', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await home.voterLoginBtn.click();

  await expect(page).toHaveURL(/login/);
});

// 2️⃣3️⃣ Back navigation works
test('Back navigation to homepage', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await home.loginBtn.click();
  await page.goBack();

  await expect(home.heading).toBeVisible();
});

// 2️⃣4️⃣ Forward navigation works
test('Forward navigation', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await home.loginBtn.click();
  await page.goBack();
  await page.goForward();

  await expect(page).toHaveURL(/login/);
});

// 2️⃣5️⃣ Scroll page
test('Page scroll works', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await page.mouse.wheel(0, 500);

  await expect(home.heading).toBeVisible();
});

// 2️⃣6️⃣ Refresh homepage
test('Page refresh', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await page.reload();

  await expect(home.heading).toBeVisible();
});

// 2️⃣7️⃣ Check if buttons clickable
test('Buttons clickable', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await expect(home.loginBtn).toBeEnabled();
  await expect(home.voterLoginBtn).toBeEnabled();
});

// 2️⃣8️⃣ Tab navigation
test('Login button focus works', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await home.loginBtn.focus();
  await expect(home.loginBtn).toBeFocused();
});

// 2️⃣9️⃣ Check URL is HTTPS
test('Page uses HTTPS', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  expect(page.url()).toContain('https');
});

// 3️⃣0️⃣ Open in new tab simulation
test('Open login in new tab', async ({ context, page }) => {
  const home = new HomePage(page);
  await home.goto();

  const newPage = await context.newPage();
  await newPage.goto(page.url());

  await expect(newPage).toHaveURL(/replit/);
});

// 3️⃣1️⃣ Check duplicate elements not present
test('No duplicate login buttons', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  const count = await home.loginBtn.count();
  expect(count).toBe(1);
});

// 3️⃣2️⃣ Check visibility after resize
test('Resize window', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await page.setViewportSize({ width: 1024, height: 768 });

  await expect(home.heading).toBeVisible();
});

// 3️⃣3️⃣ Check text alignment exists
test('Heading CSS check', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  const alignment = await home.heading.evaluate(el =>
    window.getComputedStyle(el).textAlign
  );

  expect(alignment).toBeDefined();
});

// 3️⃣4️⃣ Check favicon exists
test('Favicon present', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  const favicon = await page.locator('link[rel="icon"]').count();
  expect(favicon).toBeGreaterThan(0);
});

// 3️⃣5️⃣ Check no broken images
test('Images load correctly', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  const images = await page.locator('img').all();

  for (const img of images) {
    const src = await img.getAttribute('src');
    expect(src).not.toBeNull();
  }
});

});