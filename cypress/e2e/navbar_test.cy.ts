describe('Navbar', () => {
  it('should exist', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="navbar-dashboard-link"]').should('be.visible');
    cy.get('[data-cy="navbar-pathways-link"]').should('be.visible');
    cy.get('[data-cy="navbar-about-link"]').should('be.visible');
    cy.get('[data-cy="navbar-user-avatar"]').should('be.visible');
    cy.get('[data-cy="home-link"]').should('be.visible');
  });

  it('should navigate to the dashboard', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="navbar-dashboard-link"]').click();
    cy.url().should('include', '/dashboard')
  });
});
