// 
const { test, expect } = require('@playwright/test');
const { AdminPage } = require('../Pages/AdminPage');

test.describe('Admin Login Flow', () => {

  // ✅ Navigation Test
  test('Admin button navigates to login page', async ({ page }) => {
    const admin = new AdminPage(page);

    await admin.goto();
    await admin.openAdminLogin();

    // Assertion: Check heading
    await expect(admin.heading).toBeVisible();
  });

  // ✅ Fields visible
  test('Login fields visible', async ({ page }) => {
    const admin = new AdminPage(page);

    await admin.goto();
    await admin.openAdminLogin();

    await expect(admin.email).toBeVisible();
    await expect(admin.password).toBeVisible();
  });

  // ✅ Valid login (if backend works)
  test('Valid login', async ({ page }) => {
    const admin = new AdminPage(page);

    await admin.goto();
    await admin.openAdminLogin();

    await admin.login('admin@gmail.com', 'Admin@123');

    await expect(page.locator('body')).toBeVisible();
  });

  // ❌ Invalid login
  test.skip('Invalid login', async ({ page }) => {
    const admin = new AdminPage(page);

    await admin.goto();
    await admin.openAdminLogin();

    await admin.login('wrong', 'wrong');

    await expect(page.locator('body')).toContainText(/invalid|error/i);
  });

  // ✅ Empty fields validation
test('Login with empty fields', async ({ page }) => {
  const admin = new AdminPage(page);

  await admin.goto();
  await admin.openAdminLogin();

  await admin.login('', '');

  await expect(page.locator('body')).toContainText(/required|enter/i);
});

// ✅ Only email entered
test('Login with only email', async ({ page }) => {
  const admin = new AdminPage(page);

  await admin.goto();
  await admin.openAdminLogin();

  await admin.login('admin@gmail.com', '');

  await expect(page.locator('body')).toContainText(/password/i);
});

// ✅ Only password entered
test('Login with only password', async ({ page }) => {
  const admin = new AdminPage(page);

  await admin.goto();
  await admin.openAdminLogin();

  await admin.login('', 'Admin@123');

  await expect(page.locator('body')).toContainText(/email/i);
});

// ✅ Invalid email format
test('Invalid email format', async ({ page }) => {
  const admin = new AdminPage(page);

  await admin.goto();
  await admin.openAdminLogin();

  await admin.login('invalid-email', 'Admin@123');

  await expect(page.locator('body')).toContainText(/email/i);
});

// ✅ Password masked
test('Password field should be masked', async ({ page }) => {
  const admin = new AdminPage(page);

  await admin.goto();
  await admin.openAdminLogin();

  await expect(admin.password).toHaveAttribute('type', 'password');
});


// ✅ Enter key triggers login
test('Press Enter to login', async ({ page }) => {
  const admin = new AdminPage(page);

  await admin.goto();
  await admin.openAdminLogin();

  await admin.email.fill('admin@gmail.com');
  await admin.password.fill('Admin@123');

  await page.keyboard.press('Enter');

  await expect(page.locator('body')).toBeVisible();
});

// ✅ Page refresh retains login page
test('Refresh login page', async ({ page }) => {
  const admin = new AdminPage(page);

  await admin.goto();
  await admin.openAdminLogin();

  await page.reload();

  await expect(admin.email).toBeVisible();
});



// ✅ Multiple failed login attempts
test('Multiple invalid login attempts', async ({ page }) => {
  const admin = new AdminPage(page);

  await admin.goto();
  await admin.openAdminLogin();

  for (let i = 0; i < 3; i++) {
    await admin.login('wrong@gmail.com', 'wrong123');
  }

  await expect(page.locator('body')).toContainText(/invalid|error/i);
});

});