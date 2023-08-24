describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/dashboard/1');
  })

  it('should render pathway title', () => {
    cy.get('[data-cy="pathway-title"]').contains('Use Qual')
  });

  it('should render pathway description', () => {
    cy.get('[data-cy="pathway-description"]').contains('Learn to use the tool so you can leverage it to your advantage.');
  });

  it('should render content areas', () => {
    cy.get('[data-cy="pathway-content-area"]').should('have.length', 1);
    cy.get('[data-cy="pathway-content-area"]').contains('Navigating Qual');
  });
});