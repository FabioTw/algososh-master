const { wait } = require("@testing-library/user-event/dist/utils");

describe('list works correctly', function() {
  before(function(){ 
    cy.visit('http://localhost:3000/list');
  })

  beforeEach(function() {
    cy.get('p').contains('Добавить в head').parent().as('addToHead');
    cy.get('p').contains('Добавить в tail').parent().as('addToTail');
    cy.get('p').contains('Удалить из head').parent().as('deleteFromHead');
    cy.get('p').contains('Удалить из tail').parent().as('deleteFromTail');
    cy.get('p').contains('Добавить по индексу').parent().as('addByIndex');
    cy.get('p').contains('Удалить по индексу').parent().as('deleteByIndex');

    cy.get('input[placeholder="Введите значение"]').as('inputValue');
    cy.get('input[placeholder="Введите индекс"]').as('inputIndex');
  });

  it('should add to list head work correctly',()=>{
  const listArray =  ['tes', 'ser'];
  const colors = ['4px solid rgb(0, 50, 255)', '4px solid rgb(210, 82, 225)', '4px solid rgb(127, 224, 81)'];
  cy.get('div').eq(9).contains('head').should('be.visible');
  cy.get('div').eq(9).contains('tail').should('be.visible');
  cy.get('@addToHead').should('be.disabled');
  cy.get('@addToTail').should('be.disabled');
  cy.get('@addByIndex').should('be.disabled');
  cy.get('@deleteByIndex').should('be.disabled');
  cy.get('*[class^=list_circles]').then((circles)=> {
    if (circles.find('*[class^=list_circles]').length <= 4) {
      listArray.forEach((element)=> {
        cy.get('@inputValue').type(element);
        cy.get('@addToHead').should('not.be.disabled').click();
        cy.get('@addToHead').should('be.disabled');
        cy.get('p').contains(element)
          .parent()
          .should('have.css', 'border', colors[1])
          .contains(element)
          .should('be.visible');
        cy.wait(1000);
        cy.get('p').contains(element)
          .parent()
          .should('have.css', 'border', colors[2])
          .parent()
          .contains('head')
          .should('be.visible')
        cy.wait(1000);
        cy.get('p').contains(element)
          .parent()
          .should('have.css', 'border', colors[0])
          .parent()
          .contains('head')
          .should('be.visible')
      })
      }
    })
  cy.get('*[class^=list_circles]').then(($elements)=> {
      if ($elements.length === 6) {
        cy.get('@inputValue').should('be.disabled') 
      }
    })
  });

  it('should delete element from list head work correctly',()=>{
    const deleteElements =  ['ser'];
    const colors = ['4px solid rgb(0, 50, 255)', '4px solid rgb(210, 82, 225)', '4px solid rgb(127, 224, 81)'];
    cy.get('div').eq(9).contains('head').should('be.visible');
    cy.get('div').eq(9).contains('tail').should('be.visible');
    cy.get('*[class^=list_circles]')
      .then((circles)=> {
        if (circles.length > 0) {
          deleteElements.forEach((elements)=> {
            cy.get('@deleteFromHead').should('not.be.disabled').click()
            cy.get('@deleteFromHead').should('be.disabled')
            cy.get('p').contains(elements)
              .parent()
              .should('have.css', 'border', colors[1])
              .contains(elements)
              .should('be.visible');
            cy.get('div').eq(14).find('p')
              .should('be.empty')
              .parent()
              .should('have.css', 'border', colors[0])
              .should('be.visible');
            cy.wait(1000);
          })
        }
      })
  });

  it('should delete element from list tail work correctly',()=>{
    const colors = ['4px solid rgb(0, 50, 255)', '4px solid rgb(210, 82, 225)'];
    cy.get('div').eq(9).contains('head').should('be.visible');
    cy.get('div').eq(9).contains('tail').should('be.visible');
    cy.get('*[class^=list_circles]')
      .then((circles)=> {
        const length = circles.length
        if (length > 0) {
          cy.get('@deleteFromTail').should('not.be.disabled').click();
          cy.get('@deleteFromTail').should('be.disabled');
          cy.get('div').eq(9).contains('tail').parent().find('p').should('be.empty');
          cy.get('*[class^=list_small-circle-bottom]')
            .find('*[class^=circle_circle]')
            .should('have.css', 'border', colors[1]);
          cy.wait(1000);
          cy.get('*[class^=list_circles]').should('have.length', length-1);
        }
      })
  });

  it('should add to list by index work correctly',()=>{
    const listElement =  'hi';
    const index = 1;
    const colors = ['4px solid rgb(0, 50, 255)', '4px solid rgb(210, 82, 225)', '4px solid rgb(127, 224, 81)'];
    cy.get('@addByIndex').should('be.disabled');
    cy.get('*[class^=list_circles]')
      .then((circles)=> {
        const length = circles.length
        cy.get('@inputValue').type(listElement);
        cy.get('@inputIndex').type(index);
        cy.get('@addByIndex').should('not.be.disabled').click();
        cy.get('@addByIndex').should('be.disabled');
        cy.wait(1000);
        cy.get('*[class^=list_circles]').eq(0)
          .find('*[class^=circle_circle]')
          .should('have.css', 'border', colors[1])
        cy.get('p').contains(listElement)
          .parent()
          .should('have.css', 'border', colors[1])
          .contains(listElement)
          .should('be.visible');
        cy.wait(1000);
        cy.get('*[class^=list_circles]').eq(0).contains('head')
        cy.get('p').contains(listElement)
          .parent()
          .should('have.css', 'border', colors[2])
        cy.get('p').contains(listElement)
          .parent()
          .should('have.css', 'border', colors[0])
        cy.get('*[class^=list_circles]').should('have.length', length+1);
        cy.get('*[class^=list_circles]').eq(1).find('p').contains(listElement);
        })
    });

  it('should delete element by index work correctly',()=> {
    const colors = ['4px solid rgb(0, 50, 255)', '4px solid rgb(210, 82, 225)'];
    const index = 1;
    cy.get('div').eq(9).contains('head').should('be.visible');
    cy.get('div').eq(9).contains('tail').should('be.visible');
    cy.get('*[class^=list_circles]')
      .then((circles)=> {
        const length = circles.length
        if (length > 0) {
          cy.get('@inputIndex').type(index);
          cy.get('@deleteByIndex').should('not.be.disabled').click();
          cy.get('@deleteByIndex').should('be.disabled');
          cy.get('*[class^=list_circles]').eq(1).children().find('p').should('be.empty');
          cy.get('*[class^=list_small-circle-bottom]')
            .find('*[class^=circle_circle]')
            .should('have.css', 'border', colors[1]);
          cy.wait(1000);
          cy.get('*[class^=list_circles]').should('have.length', length-1);
        }
      })
  });
})