// 

class AdminPage {
  constructor(page) {
    this.page = page;

    // Homepage button
    this.adminLoginBtn = page.getByRole('button', { name: 'Admin Login' });

    // Login Page (based on your UI)
    this.email = page.getByRole('textbox', { name: 'Email Address' });
    this.password = page.getByRole('textbox', { name: 'Password' });

    // ✅ FIXED BUTTON
    this.loginBtn = page.getByRole('button', { name: 'Sign In' });

    // Heading
    this.heading = page.locator('text=Welcome Back');
  }

  async goto() {
    await this.page.goto('/');
  }

  async openAdminLogin() {
    await this.adminLoginBtn.click();

    // ✅ Wait for login page to load
    await this.heading.waitFor();
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}

module.exports = { AdminPage };