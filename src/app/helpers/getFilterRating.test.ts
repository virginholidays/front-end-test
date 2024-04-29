import { expect } from '@jest/globals';
import { getFilterRating } from './getFilterRating';
import { Holiday } from '@/types/booking';
import { Filter } from '@/types/filters';

describe('getFilterRating', () => {
    it('should return correct filter list', () => {
        const results: Holiday[] = [
            {
                hotel: {
                    content: {
                        starRating: 3,
                    },
                },
            },
            {
                hotel: {
                    content: {
                        starRating: 'Villas',
                    },
                },
            },
            {
                hotel: {
                    content: {
                        starRating: 4,
                    },
                },
            },
        ] as unknown as Holiday[];

        const expectedFilterList: Filter[] = [
            { name: '1', count: 0 },
            { name: '2', count: 0 },
            { name: '3', count: 1 },
            { name: '4', count: 1 },
            { name: '5', count: 0 },
            { name: 'Villas', count: 1 },
        ];

        const result = getFilterRating(results);

        expect(result).toEqual(expectedFilterList);
    });
});
