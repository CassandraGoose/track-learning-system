describe('Dashboard', () => {
  it('exists', () => {
    cy.visit('http://localhost:3000/');
    expect(true).to.equal(true);
  })
});
