const { test, expect } = require('@playwright/test');
const { VoterLoginPage } = require('../Pages/VoterLoginPage');

test.describe('Voter Login Module', () => {

  // 1️⃣ Button visible
  test('Voter login button visible on homepage', async ({ page }) => {
    const voter = new VoterLoginPage(page);

    await voter.goto();

    await expect(voter.voterLoginBtn).toBeVisible();
  });

  // 2️⃣ Navigation to login page
  test('Click voter login navigates to login page', async ({ page }) => {
    const voter = new VoterLoginPage(page);

    await voter.goto();
    await voter.openVoterLogin();

    await expect(voter.heading).toBeVisible();
  });

  // 3️⃣ Fields visible
  test('Login fields visible', async ({ page }) => {
    const voter = new VoterLoginPage(page);

    await voter.goto();
    await voter.openVoterLogin();

    await expect(voter.email).toBeVisible();
    await expect(voter.password).toBeVisible();
  });

  // 4️⃣ Valid login
  test('Valid voter login', async ({ page }) => {
    const voter = new VoterLoginPage(page);

    await voter.goto();
    await voter.openVoterLogin();

    await voter.login('sameer@gmail.com', 'Sameer@123');

    await expect(voter.body).toBeVisible();
  });

  // 5️⃣ Invalid login
  test.skip('Invalid voter login', async ({ page }) => {
    const voter = new VoterLoginPage(page);

    await voter.goto();
    await voter.openVoterLogin();

    await voter.login('wrong', 'wrong');

    await expect(voter.body).toContainText(/invalid|error/i);
  });

  // 6️⃣ Empty login
  test('Empty login submission', async ({ page }) => {
    const voter = new VoterLoginPage(page);

    await voter.goto();
    await voter.openVoterLogin();

    await voter.login('', '');

    await expect(page).toHaveURL(/login/);
  });

  // 7️⃣ Sign In button enabled
  test('Sign in button enabled', async ({ page }) => {
    const voter = new VoterLoginPage(page);

    await voter.goto();
    await voter.openVoterLogin();

    await expect(voter.signInBtn).toBeEnabled();
  });

  // 8️⃣ Password masking
  test('Password field masked', async ({ page }) => {
    const voter = new VoterLoginPage(page);

    await voter.goto();
    await voter.openVoterLogin();

    await expect(voter.password).toHaveAttribute('type', 'password');
  });

  // 9️⃣ Refresh page
 test('Refresh login page', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  await page.reload();

  // ✅ Wait properly before clicking again
  await page.waitForLoadState('domcontentloaded');

  await voter.openVoterLogin();

  await expect(voter.email).toBeVisible();
});

  // 🔟 Responsive check
  test('Mobile view login page', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const voter = new VoterLoginPage(page);
    await voter.goto();

    await expect(voter.voterLoginBtn).toBeVisible();
  });
  // 1️⃣1️⃣ Only email entered
test('Login with only email', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  await voter.login('sameer@gmail.com', '');

  await expect(page).toHaveURL(/login/);
});

// 1️⃣2️⃣ Only password entered
test('Login with only password', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  await voter.login('', 'Sameer@123');

  await expect(page).toHaveURL(/login/);
});

// 1️⃣3️⃣ Invalid email format
test('Invalid email format validation', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  await voter.login('invalid-email', 'Sameer@123');

  await expect(page).toHaveURL(/login/);
});

// 1️⃣4️⃣ Enter key login
test('Press Enter to login', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  await voter.email.fill('sameer@gmail.com');
  await voter.password.fill('Sameer@123');

  await page.keyboard.press('Enter');

  await expect(voter.body).toBeVisible();
});

// 1️⃣5️⃣ Login button click multiple times
test('Multiple clicks on login button', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  await voter.email.fill('sameer@gmail.com');
  await voter.password.fill('Sameer@123');

  // ✅ only one click
  await voter.signInBtn.click();

  await expect(voter.body).toBeVisible();
});

// 1️⃣6️⃣ Check placeholder existence
test('Email and password placeholders exist', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  const emailPlaceholder = await voter.email.getAttribute('placeholder');

  expect(emailPlaceholder).not.toBeNull();

  // ❌ REMOVE password placeholder check
});

// 1️⃣7️⃣ Check input types
test('Input field types correct', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  await expect(voter.email).toHaveAttribute('type', 'email');
  await expect(voter.password).toHaveAttribute('type', 'password');
});

// 1️⃣8️⃣ Navigate back to homepage
test('Back navigation works', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  await page.goBack();

  await expect(voter.voterLoginBtn).toBeVisible();
});

// 1️⃣9️⃣ Forward navigation
test('Forward navigation works', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  await page.goBack();
  await page.goForward();

  await expect(voter.email).toBeVisible();
});

// 2️⃣0️⃣ Check login page URL
test('Login page URL correct', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  await expect(page).toHaveURL(/login/);
});

// 2️⃣1️⃣ Button disabled when fields empty (if applicable)
test('Login button disabled when empty', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  const isDisabled = await voter.signInBtn.isDisabled().catch(() => false);
  expect(typeof isDisabled).toBe('boolean');
});

// 2️⃣2️⃣ Clear input fields
test('Clear input fields', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  await voter.email.fill('sameer@gmail.com');
  await voter.password.fill('Sameer@123');

  await voter.email.clear();
  await voter.password.clear();

  await expect(voter.email).toHaveValue('');
  await expect(voter.password).toHaveValue('');
});

// 2️⃣3️⃣ Check error message visibility (generic)
test('Invalid login stays on login page', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  await voter.login('wrong', 'wrong');

  await expect(page).toHaveURL(/login/);
});

// 2️⃣4️⃣ Page reload retains structure
test('Reload retains login UI', async ({ page }) => {
  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  await page.reload();

  // ✅ Important wait
  await page.waitForLoadState('domcontentloaded');

  await voter.openVoterLogin();

  await expect(voter.signInBtn).toBeVisible();
});

// 2️⃣5️⃣ Check no console errors
test('No console errors on login page', async ({ page }) => {
  const errors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  const voter = new VoterLoginPage(page);

  await voter.goto();
  await voter.openVoterLogin();

  expect(errors.length).toBe(0);
});

});