import { generateFilterParametrs, filterHotelData } from "@/utils/filterData.service";
describe('filterData.service', () => {
    it('should generate filter parameters correctly', () => {
        // Test data
        const results = {
            holidays: [
                {
                    pricePerPerson: 100,
                    hotel: {
                        content: {
                            hotelFacilities: ['Facility 1', 'Facility 2']
                        }
                    }
                },
                {
                    pricePerPerson: 200,
                    hotel: {
                        content: {
                            hotelFacilities: ['Facility 2', 'Facility 3']
                        }
                    }
                }
            ]
        };
        const filterMetadata1 = {};

        // Expected result
        const expectedFilterParameters = {
            data: [
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
                            label: 'upto100'
                        },
                        {
                            filterType: 'checkbox',
                            filterId: '100-1100',
                            value: 1100,
                            min: 100,
                            max: 1100,
                            label: '£100 to £1100'
                        },
                        // ... other price filters
                    ]
                },
                {
                    filterName: 'Hotel Facilities',
                    filterId: 'hotelFacilities',
                    filters: [
                        {
                            filterType: 'checkbox',
                            filterId: 'Facility 1',
                            value: 'Facility 1',
                            label: 'Facility 1'
                        },
                        {
                            filterType: 'checkbox',
                            filterId: 'Facility 2',
                            value: 'Facility 2',
                            label: 'Facility 2'
                        },
                        // ... other facility filters
                    ]
                }
            ]
        };

        // Call the function
        const generatedFilterParameters = generateFilterParametrs(results, filterMetadata1);

        // Assertion
        expect(generatedFilterParameters).to.deep.equal(expectedFilterParameters);
    });

    it('should filter the hotel data correctly', () => {
        // Test data
        const holidays = [
            {
                pricePerPerson: 100,
                hotel: {
                    content: {
                        starRating: 4,
                        hotelFacilities: ['Facility 1', 'Facility 2'],
                        name: 'Hotel A'
                    }
                }
            },
            {
                pricePerPerson: 200,
                hotel: {
                    content: {
                        starRating: 3,
                        hotelFacilities: ['Facility 2', 'Facility 3'],
                        name: 'Hotel B'
                    }
                }
            }
        ];
        const filterParams = {
            ratings: [{ value: 4 }],
            pricePP: [{ min: 100, max: 200 }],
            hotelName: 'Hotel'
        };

        // Expected result
        const expectedFilteredData = [
            {
                pricePerPerson: 100,
                hotel: {
                    content: {
                        starRating: 4,
                        hotelFacilities: ['Facility 1', 'Facility 2'],
                        name: 'Hotel A'
                    }
                }
            }
        ];

        // Call the function
        const filteredData = filterHotelData(holidays, filterParams);

        // Assertion
        expect(filteredData).to.deep.equal(expectedFilteredData);
    });
});