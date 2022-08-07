describe('app works correctly with routes', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });
  
  it('should open every page', function (){
    const pages = ['recursion', 'fibonacci', 'sorting', 'stack', 'queue', 'list'];
  
    pages.forEach(page => {
      cy.get(`a[href*=${page}]`).click();
      cy.location('pathname').should('eq', `/${page}`);
      cy.go('back');
    });
  });
}); 
