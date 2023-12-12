describe('Dashboard', () => {
    it('should render the footer on the dashboard', () => {
      cy.visit('http://localhost:3000/dashboard');
      cy.get('[data-cy="footer1"]').should('be.visible');
      cy.get('[data-cy="footer2"]').should('be.visible');
    });

    it('should include appropriate content', () => {
      cy.visit('http://localhost:3000/dashboard');
      cy.get('[data-cy="footer-logo"]').contains('Track');
      cy.get('[data-cy="footer-legal-links"]').contains('Legal - coming soon');
      cy.get('[data-cy="footer-company-links"]').contains('Company - coming soon');
      cy.get('[data-cy="footer-icon-info"]').contains('Karyative');
      cy.get('[data-cy="footer-copyright"]').contains('Copyright © 2023');
    });

    it('should render the footer on an individual pathway page', () => {
      cy.visit('http://localhost:3000/dashboard/1');
      cy.get('[data-cy="footer1"]').should('be.visible');
      cy.get('[data-cy="footer2"]').should('be.visible');
    });

    it('should include appropriate content', () => {
      cy.visit('http://localhost:3000/dashboard/1');
      cy.get('[data-cy="footer-logo"]').contains('Track');
      cy.get('[data-cy="footer-legal-links"]').contains('Legal - coming soon');
      cy.get('[data-cy="footer-company-links"]').contains('Company - coming soon');
      cy.get('[data-cy="footer-icon-info"]').contains('Karyative');
      cy.get('[data-cy="footer-copyright"]').contains('Copyright © 2023');
    });
});
  