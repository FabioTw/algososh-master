describe('recursion works correctly', function() {
  before(function() {
    cy.visit('http://localhost:3000/recursion');
    cy.get('p').contains('Развернуть').parent().as('submitButton')
  });

  it('should check recursion work correctly', function (){
    const testWord = 'probe';
    const doneWord = testWord.split('').reverse();
    const colors = ['4px solid rgb(0, 50, 255)', '4px solid rgb(210, 82, 225)', '4px solid rgb(127, 224, 81)'];
    const wordLen = testWord.length;
    let checkedindex = 0

    cy.get('@submitButton').should('be.disabled');
    cy.get('input').type(testWord);
    cy.get('@submitButton').should('not.be.disabled').click();
    cy.get('@submitButton').should('be.disabled');

    testWord.split('').forEach((letter) => {
      cy.get('p').contains(letter).parent().should('have.css', 'border', colors[0])
    });

    while (checkedindex<Math.ceil(wordLen/2)) {
      testWord.split('').forEach((letter, index) => {
        if (index === checkedindex || index === testWord.length-1-checkedindex) {
          cy.get('p').contains(letter).parent().should('have.css', 'border', colors[1])
        }
      })
      cy.wait(1000)
      doneWord.forEach((letter, index) => {
        if (index === checkedindex || index === testWord.length-1-checkedindex) {
          cy.get('p').contains(letter).parent().should('have.css', 'border', colors[2])
        }
      })
      cy.wait(1000)
      checkedindex++
    }
  })
}); 