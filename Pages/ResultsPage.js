class ResultsPage {
  constructor(page) {
    this.page = page;

    // Home button
    this.resultsBtn = page.getByRole('button', { name: /view results/i });

    // Results page elements
    this.heading = page.locator('text=Live and completed election vote tallies');

    this.electionCard = page.locator('text=Presidential Election');

    this.liveTag = page.locator('text=Live');

    this.voteCount = page.locator('text=votes cast');

    this.candidateList = page.locator('div:has-text("Alliance")');

    this.chart = page.locator('canvas'); // if chart exists

    this.body = page.locator('body');
  }

  async goto() {
    await this.page.goto('https://vote-system--shaiksameer2760.replit.app/', {
      waitUntil: 'domcontentloaded'
    });
  }

  async openResults() {
    await this.resultsBtn.waitFor({ state: 'attached' });

    await this.resultsBtn.click({ force: true });

    await this.heading.waitFor({ state: 'visible' });
  }
}

module.exports = { ResultsPage };