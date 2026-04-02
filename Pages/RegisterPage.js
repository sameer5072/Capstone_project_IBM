class RegisterPage {
  constructor(page) {
    this.page = page;

    // Fields
    this.name = page.getByRole('textbox', { name: 'Full Legal Name' });
    this.email = page.getByRole('textbox', { name: 'Email Address' });
    this.voterId = page.getByRole('textbox', { name: 'National Voter ID' });
    this.password = page.getByRole('textbox', { name: 'Password' });

    // Button
    this.registerBtn = page.getByRole('button', { name: 'Complete Registration' });

    // Link
    this.signInLink = page.getByRole('link', { name: 'Sign in here' });

    // Generic message container
    this.body = page.locator('body');
  }

  async goto() {
  await this.page.goto('https://vote-system--shaiksameer2760.replit.app/register', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
}

  async fillForm(name, email, voterId, password) {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.voterId.fill(voterId);
    await this.password.fill(password);
  }

  async submit() {
    await this.registerBtn.click();
  }
}

module.exports = { RegisterPage };