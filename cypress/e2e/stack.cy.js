describe('stack works correctly', function() {
  before(function(){ 
    cy.visit('http://localhost:3000/stack');
  })

  beforeEach(function() {
    cy.get('p').contains('Добавить').parent().as('submitButton');
    cy.get('p').contains('Удалить').parent().as('deleteButton');
    cy.get('p').contains('Очистить').parent().as('clearButton');
  });

  it('should add stack work correctly', function (){
    const stackArray =  ['sd', '533', '32', '21', 'test'];
    const colors = ['4px solid rgb(0, 50, 255)', '4px solid rgb(210, 82, 225)'];

    cy.get('@submitButton').should('be.disabled');
    cy.get('@deleteButton').should('be.disabled');
    cy.get('@clearButton').should('be.disabled');

    stackArray.forEach((element, index)=> {
      cy.get('input').type(element);
      cy.get('@submitButton').should('not.be.disabled').click();
      cy.get('@submitButton').should('be.disabled');
      cy.get('p').contains(element)
        .parent()
        .should('have.css', 'border', colors[1])
        .parent()
        .contains('top')
        .should('be.visible');
      cy.get('p').contains(element)
        .parent()
        .parent()
        .contains(index)
        .should('be.visible');
      cy.wait(500);
      cy.get('p').contains(element)
        .parent()
        .should('have.css', 'border', colors[0])
        .parent()
        .contains('top')
        .should('be.visible');
    })
  })

  it('should delete element from stack correctly', function (){
    const colors = ['4px solid rgb(0, 50, 255)', '4px solid rgb(210, 82, 225)'];
    const deleteElements = 3
    for (let index = 0; index < deleteElements; index++) {
      cy.get('@deleteButton').should('not.be.disabled').click();
      cy.get('@deleteButton').should('be.disabled');
      cy.get('*[class^=circle]').last()
      cy.get('*[class^=circle]').last()
        .should('have.css', 'border', colors[1])
        .parent()
        .contains('top')
        .should('be.visible');
      cy.wait(500);
      cy.get('*[class^=circle]').last()
        .should('have.css', 'border', colors[0])
        .parent()
        .contains('top')
        .should('be.visible');
    }
  })

  it('should delete all elements', function (){
    cy.get('*[class^=circle]').should('exist');
    cy.get('@clearButton').should('not.be.disabled').click();
    cy.get('*[class^=circle]').should('not.exist');
  })
}); 