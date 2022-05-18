/// <reference types="cypress" />

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');

    cy.get('#minimum-rating-visibility').as('rating-filter');
    cy.get('#restaurant-visibility-filter').as('restaurant-filter');
  });

  it('should set the range and verify it', () => {
    cy.get('@rating-filter').should('have.value', '1');
    cy.get('@rating-filter').invoke('val', '6').trigger('input');
    cy.get('@rating-filter').should('have.value', '6');
  });

  it('should check the checkbox and verify it', () => {
    cy.get('input[type="checkbox"]').first().as('firstCheckbox');
    cy.get('@firstCheckbox').should('be.checked');
    cy.get('@firstCheckbox').uncheck();
    cy.get('@firstCheckbox').should('not.be.checked');
  });

  it('should select an option from the select and verify it', () => {
    cy.get('@restaurant-filter').should('not.have.value', 'KFC');
    cy.get('@restaurant-filter').select('KFC');
    cy.get('@restaurant-filter').should('have.value', 'KFC');
  });
});
