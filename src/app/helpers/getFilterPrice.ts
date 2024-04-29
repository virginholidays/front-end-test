import { Holiday } from '@/types/booking';
import { Filter } from '@/types/filters';
import { PRICES_PER_PERSON } from '@/utils/constants';

export function getFilterPrice(results: Holiday[]): Filter[] {
    const hotelCounts: Filter[] = [];

    PRICES_PER_PERSON.forEach(({ name, minPrice, maxPrice }) => {
        const count = results.reduce((acc, deal) => {
            const pricePerPerson = deal.pricePerPerson;

            if (
                (maxPrice &&
                    pricePerPerson >= minPrice &&
                    pricePerPerson <= maxPrice) ||
                (!maxPrice && pricePerPerson >= minPrice)
            ) {
                return acc + 1;
            }

            return acc;
        }, 0);

        hotelCounts.push({ name, count });
    });

    return hotelCounts;
}
