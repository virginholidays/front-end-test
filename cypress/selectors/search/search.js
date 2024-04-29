export function getSearchResult() {
    return cy.get('a').contains('orlando from LHR');
}
