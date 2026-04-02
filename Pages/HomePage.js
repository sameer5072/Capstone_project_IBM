class HomePage {
  constructor(page) {
    this.page = page;

    // Header
    this.logo = page.locator('text=CivicVote');
    this.loginBtn = page.getByRole('button', { name: /log in/i });
    this.registerTopBtn = page.getByRole('button', { name: /Register to Vote/i });

    // Hero Section
    this.heading = page.locator('text=The Future of Democracy is Here');
    this.subText = page.locator('text=Experience a transparent');
    
    this.registerBtn = page.getByRole('button', { name: /register to vote/i });
    this.voterLoginBtn = page.getByRole('button', { name: /voter login/i });

    // Theme toggle (sun icon)
    this.themeToggle = page.locator('button:has(svg)');
  }

  async goto() {
    await this.page.goto('/');
  }
}

module.exports = { HomePage };