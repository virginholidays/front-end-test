import { expect } from '@jest/globals';
import { getFilterPrice } from './getFilterPrice';
import { Holiday } from '@/types/booking';

describe('getFilterPrice', () => {
    it('should return list of facilities with counts', () => {
        const expectedCounts = [
            { name: 'up to £1440', count: 3 },
            { name: '£1440 - £1730', count: 0 },
            { name: '£1730 - £2180', count: 0 },
            { name: 'over £2180', count: 1 },
        ];

        const deals = [
            {
                pricePerPerson: 1000,
            },
            {
                pricePerPerson: 1200,
            },
            {
                pricePerPerson: 6000,
            },
            {
                pricePerPerson: 120,
            },
        ] as unknown as Holiday[];

        const result = getFilterPrice(deals);

        expect(result).toEqual(expectedCounts);
    });
});
