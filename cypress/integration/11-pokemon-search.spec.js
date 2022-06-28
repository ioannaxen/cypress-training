/// <reference types="cypress" />

const pokemon = [
  { id: 1, name: 'Bumblesaur' },
  { id: 2, name: 'Charmer' },
  { id: 3, name: 'Turtle' },
];

describe('Pokémon Search', () => {
  beforeEach(() => {
    cy.visit('/pokemon-search');

    cy.get('[data-test="search"]').as('search');
    cy.get('[data-test="search-label"]').as('label');

    cy.intercept('/pokemon-search/api?*').as('api');
  });

  it('should call the API when the user types', () => {
    cy.get('@search').type('pika');
    cy.wait('@api');
  });

  it('should update the query parameter', () => {
    const searchTerm = 'char';
    cy.get('@search').type(searchTerm);
    cy.wait('@api');
    cy.location('search').should('equal', `?name=${searchTerm}`);
  });

  it('should call the API with correct query parameter', () => {
    const searchTerm = 'eev';
    cy.get('@search').type(searchTerm);
    cy.wait('@api').its('request.url').should('contain', `name=${searchTerm}`);
  });

  it('should pre-populate the search field with the query parameter', () => {
    const searchTerm = 'bulb';
    cy.visit({ url: '/pokemon-search', qs: { name: searchTerm } });
    cy.get('@search').should('have.value', searchTerm);
  });

  it('should render the results to the page', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');
    cy.get('@search').type('snor');
    cy.wait('@stubbed-api');
    cy.get('[data-test="result"]').should('have.length', 3);
  });

  it('should link to the correct pokémon', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');
    cy.get('@search').type('pmewika');
    cy.wait('@stubbed-api');

    cy.get('[data-test="result"] a').each(($el, index) => {
      const { id } = pokemon[index];
      expect($el.attr('href')).to.contain('/pokemon-search/' + id);
    });
  });

  it('should persist the query parameter in the link to a pokémon', () => {
    const searchTerm = 'pidg';
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');
    cy.get('@search').type(searchTerm);
    cy.wait('@stubbed-api');

    cy.get('[data-test="result"] a').each(($el) => {
      expect($el.attr('href')).to.contain('name=' + searchTerm);
    });
  });

  it('should bring you to the route for the correct pokémon', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');
    cy.intercept('/pokemon-search/api/1', { fixture: 'bulbasaur.json' }).as('bulbasaur-api');

    cy.get('@search').type('bulba');
    cy.wait('@stubbed-api');

    cy.get('[data-test="result"] a').first().click();
    cy.wait('@bulbasaur-api');

    cy.location('pathname').should('contain', '/pokemon-search/1');
  });

  it.only('should immediately fetch a pokémon if a query parameter is provided', () => {
    const seachTerm = 'eka';
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');
    cy.visit({ url: '/pokemon-search', qs: { name: seachTerm } });

    cy.wait('@stubbed-api').its('response.url').should('contain', `?name=${seachTerm}`);
  });
});
