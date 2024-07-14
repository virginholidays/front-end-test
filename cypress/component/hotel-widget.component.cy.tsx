import HotelWidgetComponent from "@/app/components/search-results/hotel-widget.component";

describe('HotelWidgetComponent', () => {
    it('renders hotel widget component correctly', () => {
        // lets mock the props
        const widgetParams = {
            hotel: {
                content: {
                    starRating: 4,
                    images: [{
                        RESULTS_CAROUSEL: {
                            url: "//d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/205/8271/8271-1-results_carousel.jpg?version=33"
                        }
                    },
                    {
                        RESULTS_CAROUSEL: {
                            url: "//d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/205/8271/8271-2-results_carousel.jpg?version=33"
                        }
                    }
                    ]
                },
                name: 'Hotel ABC',
                tripAdvisor: {
                    numReviews: 100,
                },
                boardBasis: 'All Inclusive',
                salesMessage: {
                    header: 'Special Offer',
                },
            },
            totalPrice: 1000,
            pricePerPerson: 250,
        };
        const guests = ['Suneel', 'Tanmay'];

        // Mount the component
        cy.mount(<HotelWidgetComponent widgetParams={widgetParams} guests={guests} />);
        // Assert the rendered content
        cy.get('h1').contains('Hotel ABC');
        cy.get('button').contains('Find details');
        cy.get('button').contains('Hotel details');
        cy.get('button').contains('Reviews');
        cy.get('p').contains('Based on 100 reviews');
        cy.contains('Special Offer')
            .should('have.length', 1)
            .and('have.text', 'Special Offer');
    });
});