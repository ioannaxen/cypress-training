/// <reference types="cypress" />

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-submit"]').as('submit');
  });

  it('should require an email', () => {
    cy.get('@submit').click();
    cy.get('[data-test="sign-up-email"]:invalid').should('have.length', 1);

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please fill in this field.');

    cy.get('[data-test="sign-up-email"]')
      .invoke('prop', 'validity')
      .its('valueMissing')
      .should('be.true');
  });

  it('should require that the email actually be an email address', () => {
    cy.get('[data-test="sign-up-email"]').type('hello');
    cy.get('@submit').click();

    cy.get('[data-test="sign-up-email"]')
      .invoke('prop', 'validity')
      .its('typeMismatch')
      .should('be.true');
  });

  it('should require a password when the email is present', () => {
    cy.get('[data-test="sign-up-email"]').type('hello@fairhq.co{enter}');

    cy.get('[data-test="sign-up-password"]')
      .invoke('prop', 'validity')
      .its('valueMissing')
      .should('be.true');
  });
});
