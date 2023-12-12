describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/dashboard/1');
  })

  it('should render content area title', () => {
    cy.get('[data-cy="content-area-title"]').contains('Navigating Qual')
  });

  it('should render content area description', () => {
    cy.get('[data-cy="content-area-description"]').contains('Practice finding things in the applicaiton.');
  });

  it('should render competency progress', () => {
    cy.get('[data-cy="competency-progress"]').contains('3/7 competencies met');
  });

  it('should show the table of competencies for a content area', () => {
    cy.get('[data-cy="content-area-title"]').click();
    cy.get('table').contains('td', '✅');
    cy.get('table').contains('td', 'Find personal pathways');
    cy.get('table').contains('td', 'You can find all of your saved pathways');
    cy.get('table').contains('td', 'Proof');
  });
});
