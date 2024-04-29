import { getSearchResult } from '../selectors/search/search';

describe('page', () => {
    it('should display the page content correctly', () => {
        cy.visit('/');
        const result = getSearchResult();
        result.click();

        cy.get('h1').contains('Search results');
        cy.contains('Loading...').should('not.exist');

        cy.get('aside').should('be.visible');
        cy.get('[data-testid="deals-result"]').should('be.visible');

        cy.contains('up to £1440').should('be.visible').click();
        cy.get('h2').should('contain', '60 results found');

        cy.contains('Games Room').should('be.visible').click();
        cy.get('h2').should('contain', '38 results found');
    });
});
