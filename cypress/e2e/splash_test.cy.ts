describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should navigate to the dashboard', () => {
    cy.get('[data-cy="splash-title"]').should('be.visible');
  });

  it('should render expected title and tag', () => {
    cy.get('[data-cy="splash-title"]').should('have.text', 'TRACK');
    cy.get('[data-cy="splash-tag"]').should('have.text', 'Learn it. Prove it.');
  });

  it('should render get started button', () => {
    cy.get('[data-cy="get-started"]').should('be.visible');
  });

  it('should render expected introductory information', () => {
    cy.get('[data-cy="splash-info1"]')
      .children()
      .contains(
        'Track is a learning tool built for you, not for some corporate entity.'
      );
    cy.get('[data-cy="splash-info1"]')
      .children()
      .contains(
        'Community-driven learning paths provide learning opportunities that can mimic college education, work training, and personal fulfillment.'
      );
    cy.get('[data-cy="splash-info1"]')
      .children()
      .contains(
        'Find pathways created by educators, curriculum designers, professionals, and hobbyists.'
      );
    cy.get('[data-cy="splash-info-2"]')
      .children()
      .contains(
        "Track was designed to put you in the driver's seat of your learning, while also allowing you to proove your understaning and share your accomplishments with the world."
      );
    cy.get('[data-cy="splash-info-2"]')
      .children()
      .contains(
        "As you complete your learning, you can add artifacts to back up your understanding and skills. Once you're ready, send the link to your portofolio for any given pathway. Potential employers, colleagues, and friends can verify you're learning by reveiwing your portfolio."
      );
  });

  it('should render the video', () => {
    cy.get('[data-cy="splash-video').should('be.visible');
  });
});
