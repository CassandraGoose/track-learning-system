describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/dashboard');
  })

  it('should navigate to the dashboard', () => {
    cy.get('[data-cy="pathways-title"]').should('be.visible');
  });

  it('should render expected pathways', () => {
    cy.get('[data-cy="pathway-card"]').should('have.length', 2);
    cy.get('[data-cy="pathway-card"]').then((items) => {
      expect(items[0]).to.contain.text('Use Qual');
      expect(items[0]).to.contain.text('Learn to use the tool so you can leverage it to your advantage.');
      expect(items[1]).to.contain.text('Learn to Learn');
      expect(items[1]).to.contain.text('Utilize a growth mindset and grit to learn anything');
      expect(items[0].children[0].children[1]).to.contain.text('View Pathway');
      expect(items[0].children[1]).to.contain.text('25%');
    })
  });
});
