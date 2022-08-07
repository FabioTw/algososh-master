describe('stack works correctly', function() {
  before(function(){ 
    cy.visit('http://localhost:3000/queue');
  })

  beforeEach(function() {
    cy.get('p').contains('Добавить').parent().as('submitButton');
    cy.get('p').contains('Удалить').parent().as('deleteButton');
    cy.get('p').contains('Очистить').parent().as('clearButton');
  });

  it('should add queue work correctly',()=>{
    const queueArray =  ['52', '123', 'asd', 'cz', '512', '234', 'hi'];
    const colors = ['4px solid rgb(0, 50, 255)', '4px solid rgb(210, 82, 225)'];

    cy.get('@submitButton').should('be.disabled');
    cy.get('@deleteButton').should('be.disabled');
    cy.get('@clearButton').should('be.disabled');

    queueArray.forEach((element, index)=> {
      cy.get('input').type(element);
      cy.get('@submitButton').should('not.be.disabled').click();
      cy.get('@submitButton').should('be.disabled');
      cy.get('p').contains(element)
        .parent()
        .should('have.css', 'border', colors[1])
        .parent()
        .contains('tail')
        .should('be.visible');
      cy.get('p').contains(element)
        .parent()
        .parent()
        .contains(index)
        .should('be.visible');
      if(index===0) {
        cy.get('p').contains(element)
          .parent()
          .parent()
          .contains('head')
          .should('be.visible');
      }
      cy.wait(500);
      cy.get('p').contains(element)
        .parent()
        .should('have.css', 'border', colors[0])
        .parent()
        .contains('tail')
        .should('be.visible');
    })
  });

  it('should delete element from queue correctly', function (){
    const queueArray =  ['52', '123', 'asd', 'cz', '512', '234', 'hi'];
    const colors = ['4px solid rgb(0, 50, 255)', '4px solid rgb(210, 82, 225)'];
    const deleteElements = 3
    for (let index = 0; index < deleteElements; index++) {
      cy.get('@deleteButton').should('not.be.disabled').click();
      cy.get('*[class^=circle_cir]').eq(index).should('have.css', 'border', colors[1])
      .parent()
      .contains('head')
      .should('be.visible');
      cy.get('@deleteButton').should('be.disabled');

      cy.wait(500);
      cy.get('p').contains(queueArray[index]).should('not.exist')
      cy.get('*[class^=circle_cir]').eq(index+1).should('have.css', 'border', colors[0])
        .parent()
        .contains('head')
        .should('be.visible');
    }
  });

  it('should delete all elements', function (){
    const queueArray =  ['cz', '512', '234', 'hi'];
    queueArray.forEach((element)=> {
      cy.get('p').contains(element).should('exist');
    })
    cy.get('@clearButton').should('not.be.disabled').click();
    queueArray.forEach((element)=> {
      cy.get('p').contains(element).should('not.exist');
    })
  });
})