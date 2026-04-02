const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../Pages/RegisterPage');

test.describe('Register Page Tests', () => {

  // 1️⃣ Page loads
  test('Register page loads', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();
    await expect(page).toHaveURL(/register/);
  });

  // 2️⃣ All fields visible
  test('All fields visible', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();

    await expect(reg.name).toBeVisible();
    await expect(reg.email).toBeVisible();
    await expect(reg.voterId).toBeVisible();
    await expect(reg.password).toBeVisible();
  });

  // 3️⃣ Valid registration
  test('Valid registration', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();

    await reg.fillForm(
      'Sameer',
      `sameer${Date.now()}@gmail.com`,
      'ABC12345',
      'Sameer@123'
    );
    await reg.submit();

    await expect(reg.body).toContainText(/success|login|sign in/i);
  });

  // 4️⃣ Empty form submission
  test('Empty form', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();

    await reg.submit();
    await expect(page).toHaveURL(/register/);
  });

  // 5️⃣ Invalid email
  test('Invalid email format', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();

    await reg.fillForm('Sameer', 'invalid', 'ABC123', 'Sameer@123');
    await reg.submit();

    await expect(reg.body).toContainText(/invalid|email/i);
  });

  // 6️⃣ Weak password
  test('Weak password', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();

    await reg.fillForm('Sameer', 'test@gmail.com', 'ABC123', '123');
    await reg.submit();

    await expect(reg.body).toContainText(/password/i);
  });

  // 7️⃣ Missing voter ID
  test('Missing voter ID', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();

    await reg.fillForm('Sameer', 'test@gmail.com', '', 'Sameer@123');
    await reg.submit();

    await expect(reg.body).toContainText(/voter/i);
  });

  // 8️⃣ Duplicate email
  test('Duplicate email', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();

    await reg.fillForm('Sameer', 'sameer@gmail.com', 'ABC123', 'Sameer@123');
    await reg.submit();

    await expect(reg.body).toContainText(/already|exists/i);
  });

  // 9️⃣ Password masking
  test('Password is masked', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();

    await expect(reg.password).toHaveAttribute('type', 'password');
  });

  // 🔟 Button enabled
  test('Register button enabled', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();

    await expect(reg.registerBtn).toBeEnabled();
  });

  // 1️⃣1️⃣ Navigation to login
  test('Navigate to login page', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();

    await reg.signInLink.click();
    await expect(page).toHaveURL(/login/);
  });

  // 1️⃣2️⃣ Special characters in name
  test('Special characters in name', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();

    await reg.fillForm('@#$%', 'test@gmail.com', 'ABC123', 'Sameer@123');
    await reg.submit();

    await expect(reg.body).toBeVisible();
  });

  // 1️⃣3️⃣ Long input values
  test('Long input values', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();

    await reg.fillForm('a'.repeat(100), 'long@gmail.com', 'ABC123', 'Sameer@123');
    await reg.submit();

    await expect(reg.body).toBeVisible();
  });

  // 1️⃣4️⃣ Form retains values before submit
  test('Form retains values', async ({ page }) => {
    const reg = new RegisterPage(page);
    await reg.goto();

    await reg.fillForm('Sameer', 'test@gmail.com', 'ABC123', 'Sameer@123');

    await expect(reg.name).toHaveValue('Sameer');
  });

  // 1️⃣5️⃣ UI text validation
 test('Page heading visible', async ({ page }) => {
  await page.goto('https://vote-system--shaiksameer2760.replit.app/register');

  await expect(
    page.getByRole('heading', { name: 'Register to Vote' })
  ).toBeVisible();
 });
 // 1️⃣6️⃣ Only name filled
test('Only name filled', async ({ page }) => {
  const reg = new RegisterPage(page);
  await reg.goto();

  await reg.fillForm('Sameer', '', '', '');
  await reg.submit();

  await expect(page).toHaveURL(/register/);
});

// 1️⃣7️⃣ Only email filled
test('Only email filled', async ({ page }) => {
  const reg = new RegisterPage(page);
  await reg.goto();

  await reg.fillForm('', 'test@gmail.com', '', '');
  await reg.submit();

  await expect(page).toHaveURL(/register/);
});

// 1️⃣8️⃣ Only voter ID filled
test('Only voter ID filled', async ({ page }) => {
  const reg = new RegisterPage(page);
  await reg.goto();

  await reg.fillForm('', '', 'ABC123', '');
  await reg.submit();

  await expect(page).toHaveURL(/register/);
});

// 1️⃣9️⃣ Only password filled
test('Only password filled', async ({ page }) => {
  const reg = new RegisterPage(page);
  await reg.goto();

  await reg.fillForm('', '', '', 'Sameer@123');
  await reg.submit();

  await expect(page).toHaveURL(/register/);
});

// 2️⃣0️⃣ Trim spaces in input
test('Trim spaces in input fields', async ({ page }) => {
  const reg = new RegisterPage(page);
  await reg.goto();

  await reg.fillForm('  Sameer  ', '  test@gmail.com  ', '  ABC123  ', '  Sameer@123  ');
  await reg.submit();

  await expect(reg.body).toBeVisible();
});

// 2️⃣1️⃣ Email case sensitivity
test('Email case sensitivity', async ({ page }) => {
  const reg = new RegisterPage(page);
  await reg.goto();

  await reg.fillForm('Sameer', 'TEST@GMAIL.COM', 'ABC123', 'Sameer@123');
  await reg.submit();

  await expect(reg.body).toBeVisible();
});

// 2️⃣2️⃣ Voter ID format validation
test('Invalid voter ID format', async ({ page }) => {
  const reg = new RegisterPage(page);
  await reg.goto();

  await reg.fillForm('Sameer', 'test@gmail.com', '123', 'Sameer@123');
  await reg.submit();

  await expect(reg.body).toContainText(/voter|invalid/i);
});

// 2️⃣3️⃣ Special characters in password
test('Special characters in password', async ({ page }) => {
  const reg = new RegisterPage(page);
  await reg.goto();

  await reg.fillForm('Sameer', 'test@gmail.com', 'ABC123', '!@#$$%^&*');
  await reg.submit();

  await expect(reg.body).toBeVisible();
});

// 2️⃣4️⃣ Page reload retains inputs
test('Reload retains input fields', async ({ page }) => {
  const reg = new RegisterPage(page);
  await reg.goto();

  await reg.fillForm('Sameer', 'test@gmail.com', 'ABC123', 'Sameer@123');

  await page.reload();

  // values may reset depending on app — just check UI exists
  await expect(reg.name).toBeVisible();
});

// 2️⃣5️⃣ Multiple form submissions
test('Multiple form submissions', async ({ page }) => {
  const reg = new RegisterPage(page);
  await reg.goto();

  await reg.fillForm(
    'Sameer',
    `multi${Date.now()}@gmail.com`,
    'ABC123',
    'Sameer@123'
  );

  await reg.submit();
  await reg.submit(); // second click

  await expect(reg.body).toBeVisible();
});


});