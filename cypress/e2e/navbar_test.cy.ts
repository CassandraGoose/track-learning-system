describe('Navbar', () => {
  it('exists', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="navbar-dashboard-link"]').should('be.visible');
    cy.get('[data-cy="navbar-pathways-link"]').should('be.visible');
    cy.get('[data-cy="navbar-about-link"]').should('be.visible');
    cy.get('[data-cy="navbar-user-avatar"]').should('be.visible');
    cy.get('[data-cy="small-logo"]').should('be.visible');
  });

  it('can navigate to the dashboard', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="navbar-dashboard-link"]').click();
    cy.url().should('include', '/dashboard')
  });
});
