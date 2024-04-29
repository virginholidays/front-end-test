import { expect } from '@jest/globals';
import { getFilterFacility } from './getFilterFacility';
import { Holiday } from '@/types/booking';

describe('getFilterFacility', () => {
    it('should return list of facilities with counts', () => {
        const deals = [
            {
                hotel: {
                    content: {
                        hotelFacilities: ['Facility 1', 'Facility 2'],
                    },
                },
            },
            {
                hotel: {
                    content: {
                        hotelFacilities: ['Facility 2', 'Facility 3'],
                    },
                },
            },
        ] as unknown as Holiday[];

        const result = getFilterFacility(deals, deals);

        expect(result).toEqual([
            { name: 'Facility 1', count: 1 },
            { name: 'Facility 2', count: 2 },
            { name: 'Facility 3', count: 1 },
        ]);
    });
});
