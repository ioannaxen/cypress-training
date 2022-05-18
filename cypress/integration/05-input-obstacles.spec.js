/// <reference types="cypress" />

describe('Input obstacles', () => {
  beforeEach(() => {
    cy.visit('/obstacle-course');
  });

  it('should input text into the input field', () => {
    const thought = 'Ravioli are a form of pop tart.';

    cy.get('[data-test="text-input"]').type(thought);
    cy.get('[data-test="text-result"]').contains(thought);
  });

  it('should control a select input', () => {
    const favouriteAvenger = 'Hulk';
    cy.get('[data-test="select-input"]').select(favouriteAvenger);
    cy.get('[data-test="select-result"]').contains(favouriteAvenger);
  });

  it('should find and control a checkbox input', () => {
    cy.get('[data-test="checkbox-result"]').as('checkboxResult').contains('(None)');
    cy.get('[data-test="checkbox-tomato"]').check();
    cy.get('@checkboxResult').contains('Tomato');
    cy.get('[data-test="checkbox-onion"]').check();
    cy.get('@checkboxResult').contains('Tomato, Onion');
  });

  it('should find and control a radio input', () => {
    cy.get('[data-test="radio-ringo"]').check();
    cy.get('[data-test="radio-result"]').contains('Ringo');
  });

  it('should find and control a color input', () => {
    cy.get('[data-test="color-input"]').invoke('val', '#123456').trigger('input');
    cy.get('[data-test="color-result"]').contains('#123456');
  });

  it('should find and control a date input', () => {
    cy.get('[data-test="date-input"]').type('1991-07-25');
    cy.get('[data-test="date-result"]').contains('1991-07-25');
  });

  it('should find and control a range input', () => {
    cy.get('[data-test="range-input"]').invoke('val', '8').trigger('input');
    cy.get('[data-test="range-result"]').contains('8');
  });

  it('should find and control a file input', () => {
    cy.get('[data-test="file-input"]').selectFile('cypress/fixtures/bulbasaur.json');
    cy.get('[data-test="file-result"]').contains('C:\\fakepath\\bulbasaur.json');
  });
});
