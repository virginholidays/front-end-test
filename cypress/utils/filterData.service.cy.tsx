import { generateFilterParametrs, filterHotelData } from "@/utils/filterData.service";
describe('generateFilterParametrs', () => {
    it('should generate filter parameters correctly', () => {
        // Test data
        const results = {
            holidays: [
                {
                    pricePerPerson: 100,
                    totalPrice: 200,
                    hotel: {
                        boardBasis: 'BB',
                        content: {
                            starRating: 4,
                            hotelFacilities: ['Pool', 'Gym'],
                            name: 'Hotel 1'
                        }
                    }
                },
                {
                    pricePerPerson: 200,
                    totalPrice: 400,
                    hotel: {
                        boardBasis: 'Bed and Breakfast',
                        content: {
                            starRating: 5,
                            hotelFacilities: ['Pool', 'Gym'],
                            name: 'Hotel 2'
                        }
                    }
                }]
        };

        // Expected result
        const expectedFilterParams = {
            data: [
                {
                    filterName: 'Hotel Name',
                    filterId: 'hotelName',
                    filters: [
                        {
                            filterType: 'input',
                            filterId: 'hotelName'
                        }
                    ]
                },
                {
                    filterName: 'Star Ratings',
                    filterId: 'ratings',
                    filters: [
                        {
                            filterType: 'checkbox',
                            filterId: 4,
                            value: 4,
                            label: 4
                        },
                        {
                            filterType: 'checkbox',
                            filterId: 5,
                            value: 5,
                            label: 5
                        },
                        {
                            filterType: 'checkbox',
                            filterId: 'NA',
                            value: 'NA',
                            label: 'Not Rated'
                        }
                    ]
                },
                {
                    interval: 1000,
                    filterName: 'Price(PP)',
                    filterId: 'pricePP',
                    filters: [
                        {
                            filterType: 'checkbox',
                            filterId: 'upto100',
                            value: 100,
                            min: 0,
                            max: 100,
                            label: 'upto £100'
                        },
                        {
                            filterType: 'checkbox',
                            filterId: '100-1100',
                            value: 1100,
                            min: 100,
                            max: 1100,
                            label: '£100 to £1100'
                        }
                    ]
                },
                {
                    filterName: 'Hotel Facilities',
                    filterId: 'hotelFacilities',
                    filters: [
                        {
                            filterType: 'checkbox',
                            filterId: 'Gym',
                            value: 'Gym',
                            label: 'Gym'
                        },
                        {
                            filterType: 'checkbox',
                            filterId: 'Pool',
                            value: 'Pool',
                            label: 'Pool'
                        }
                    ]
                }
            ]
        };

        // Generate filter parameters
        const filterParams = generateFilterParametrs(results);
        // Assertion
        expect(filterParams).to.deep.equal(expectedFilterParams);
    });
});

describe('filterHotelData', () => {
    // Test data
    const holidays = [
        {
            pricePerPerson: 100,
            hotel: {
                content: {
                    starRating: 4,
                    hotelFacilities: ['Pool', 'Gym'],
                    name: 'Hotel 1'
                }
            }
        },
        {
            pricePerPerson: 200,
            hotel: {
                content: {
                    starRating: 5,
                    hotelFacilities: ['Spa', 'Restaurant'],
                    name: 'Hotel 2'
                }
            }
        }
    ];

    it('should filter hotel data based on ratings', () => {
        // Filter parameters
        const filterParams = {
            ratings: [
                { value: 4 },
                { value: 5 }
            ]
        };

        // Expected result
        const expectedFilteredData = holidays;

        // Filter hotel data
        const filteredData = filterHotelData(holidays, filterParams);

        // Assertion
        expect(filteredData).to.deep.equal(expectedFilteredData);
    });

    it('should filter hotel data based on hotel facilities', () => {
        // Filter parameters
        const filterParams = {
            hotelFacilities: [
                { value: 'Spa' }
            ]
        };

        // Expected result
        const expectedFilteredData = [
            {
                pricePerPerson: 200,
                hotel: {
                    content: {
                        starRating: 5,
                        hotelFacilities: ['Spa', 'Restaurant'],
                        name: 'Hotel 2'
                    }
                }
            }
        ];

        // Filter hotel data
        const filteredData = filterHotelData(holidays, filterParams);

        // Assertion
        expect(filteredData).to.deep.equal(expectedFilteredData);
    });

    it('should filter hotel data based on price per person', () => {
        // Filter parameters
        const filterParams = {
            pricePP: [
                { min: 0, max: 100 }
            ]
        };

        // Expected result
        const expectedFilteredData = [
            {
                pricePerPerson: 100,
                hotel: {
                    content: {
                        starRating: 4,
                        hotelFacilities: ['Pool', 'Gym'],
                        name: 'Hotel 1'
                    }
                }
            }
        ];

        // Filter hotel data
        const filteredData = filterHotelData(holidays, filterParams);

        // Assertion
        expect(filteredData).to.deep.equal(expectedFilteredData);
    });

    it('should filter hotel data based on hotel name', () => {
        // Filter parameters
        const filterParams = {
            hotelName: 'hotel'
        };

        // Expected result
        const expectedFilteredData = holidays;

        // Filter hotel data
        const filteredData = filterHotelData(holidays, filterParams);

        // Assertion
        expect(filteredData).to.deep.equal(expectedFilteredData);
    });
});