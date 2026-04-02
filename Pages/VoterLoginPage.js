// class VoterLoginPage {
//   constructor(page) {
//     this.page = page;

//     // Homepage button
//     this.voterLoginBtn = page.getByRole('button', { name: 'Voter Login' });

//     // Login page (same UI as admin)
//     this.heading = page.locator('text=Welcome Back');

//     this.email = page.getByRole('textbox', { name: 'Email Address' });
//     this.password = page.getByRole('textbox', { name: 'Password' });

//     this.signInBtn = page.getByRole('button', { name: 'Sign In' });

//     this.body = page.locator('body');
//   }

//   async goto() {
//     await this.page.goto('/');
//   }

//   async openVoterLogin() {
//     await this.voterLoginBtn.click();

//     // wait for login page
//     await this.heading.waitFor();
//   }

//   async login(email, password) {
//     await this.email.fill(email);
//     await this.password.fill(password);
//     await this.signInBtn.click();
//   }
// }

// module.exports = { VoterLoginPage };

class VoterLoginPage {
  constructor(page) {
    this.page = page;

    // Homepage button (unchanged)
    this.voterLoginBtn = page.getByRole('button', { name: 'Voter Login' });

    // Login page (unchanged)
    this.heading = page.locator('text=Welcome Back');

    this.email = page.getByRole('textbox', { name: 'Email Address' });
    this.password = page.getByRole('textbox', { name: 'Password' });

    this.signInBtn = page.getByRole('button', { name: 'Sign In' });

    this.body = page.locator('body');
  }

  // ✅ FIXED (only added stability, no behavior change)
  async goto() {
    await this.page.goto('https://vote-system--shaiksameer2760.replit.app/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  // ✅ FIXED (main issue resolved here)
  async openVoterLogin() {
    // wait for page load
    await this.page.waitForLoadState('domcontentloaded');

    // wait for button safely
    await this.voterLoginBtn.waitFor({ state: 'visible', timeout: 10000 });

    // scroll (fix hidden/viewport issue)
    await this.voterLoginBtn.scrollIntoViewIfNeeded();

    // safe click with wait
    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      this.voterLoginBtn.click()
    ]);

    // wait for login page
    await this.heading.waitFor({ state: 'visible', timeout: 10000 });
  }

  // ✅ Slight improvement (no breaking change)
  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);

    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      this.signInBtn.click()
    ]);
  }
}

module.exports = { VoterLoginPage };