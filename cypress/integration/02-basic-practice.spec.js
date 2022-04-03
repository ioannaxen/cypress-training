/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      cy.get('[data-test="new-item-input"]')
        .type('Good attitude')
        .should('have.value', 'Good attitude')
        .click(cy.get('[data-test="add-item"]'));
      cy.get('[data-test="new-item-input"]').should('not.have.value', 'Good attitude');
      cy.contains('Good attitude');
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]')
        .type('Good attitude')
        .click(cy.get('[data-test="add-item"]'));
      cy.get('[data-test="items-unpacked"]').contains('Good attitude');
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]')
        .type('Good attitude')
        .click(cy.get('[data-test="add-item"]'));
      cy.get('[data-test="items-unpacked"] li').last().contains('Good attitude');
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('iPhone');
      cy.get('[data-test="items"]').contains('iPhone Charger');
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Hoodie');
      cy.get('[data-test="items"]').should('not.contain', 'Tooth Brush');
      cy.get('[data-test="items"]').should('not.contain', 'Tooth Paste');
      cy.get('[data-test="items"]').should('not.contain', 'Deoderant');
      cy.get('[data-test="items"]').should('not.contain', 'iPhone Charger');
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click();
        cy.get('[data-test="items-unpacked"] ul').contains('No items to show');
        cy.get('[data-test="items-packed"] ul').contains('No items to show');
        cy.get('[data-test="items-unpacked"] ul li').should('not.exist');
        cy.get('[data-test="items-packed"] ul li').should('not.exist');
      });
    });
    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="items-packed"] ul li').first().get('button').contains('Remove');
      });
      it('should remove an item from the page', () => {
        cy.get('[data-test="items-unpacked"] ul li')
          .first()
          .get('button')
          .contains('Remove')
          .click();
        cy.get('[data-test="items-unpacked"] ul li').contains('Tooth Brush').should('not.exist');
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="items-packed"] ul li');
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-packed"] ul li').should('not.exist');
      cy.get('[data-test="items-packed"] ul').contains('No items to show');
    });

    it('should have all of the items in the "Unpacked" list', () => {
      cy.get('[data-test="items-unpacked"] ul li').should('have.length', 4);
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-unpacked"] ul li').should('have.length', 5);
    });
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {
      cy.get('[data-test="items-unpacked"]').contains('Tooth Brush');
      cy.get('#item-1 ').click();
      cy.get('[data-test="items-packed"]').contains('Tooth Brush');
      cy.get('[data-test="items-unpacked"]').should('not.contain', 'Tooth Brush');
    });
  });
});
