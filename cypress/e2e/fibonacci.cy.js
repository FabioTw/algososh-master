describe('fibonacci works correctly', function() {
  before(function() {
    cy.visit('http://localhost:3000/fibonacci');
    cy.get('p').contains('Рассчитать').parent().as('submitButton')
  });

  it('should check fibonacci work correctly', function (){
    const testNumber = '6';
    const perfectFibbonachi = [1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765]
    
    cy.get('@submitButton').should('be.disabled');
    cy.get('input').type(testNumber);
    cy.get('@submitButton').should('not.be.disabled').click();
    cy.get('@submitButton').should('be.disabled');
    cy.wait(500)

    for (let index = 0; index <= Number(testNumber); index++) {
      cy.get('p').contains(perfectFibbonachi[index]).parent().should('have.css', 'border', '4px solid rgb(0, 50, 255)')
      cy.wait(500)
    }
  })
}); 