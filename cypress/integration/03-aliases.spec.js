/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
    cy.get('[data-test="filter-items"').as('filterInput');

    cy.get('[data-test="items"]').as('allItems');
    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');
  });

  it('should hold onto an alias', () => {
    cy.get('@filterInput');

    cy.get('@unpackedItems').find('label').first().as('firstItem');
    cy.get('@firstItem').invoke('text').as('firstItemText');
    cy.get('@firstItem').find('input[type="checkbox"]').click();

    cy.get('@firstItemText').then((text) =>
      cy.get('@packedItems').find('label').first().should('include.text', text),
    );
  });

  it('should filter the items shown on the page', () => {
    cy.get('@filterInput').type('iPhone');

    cy.get('@allItems').should('contain.text', 'iPhone');
    cy.get('@allItems').should('not.contain.text', 'Tooth Paste');
  });
});
