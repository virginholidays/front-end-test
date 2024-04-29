'use client';

import { Holiday } from '@/types/booking';
import SearchItemComponent from '../search-item/search-item.component';
import { useMemo, useState } from 'react';
import styles from './client-side-search-results.module.css';
import FiltersComponent from '../filters/filters.component';
import { SelectedFilters } from '@/types/filters';
import { PRICES_PER_PERSON } from '@/utils/constants';

export default function ClientSideSearchResults({
    results,
    adults,
}: {
    results: Holiday[];
    adults: number;
}) {
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        price: null,
        facilities: null,
        starRating: null,
    });

    // Filter function for price per person
    const filterByPrice = (deals: Holiday[], selectedPrices: string[]) => {
        if (!selectedPrices || selectedPrices.length === 0) return deals;
        const filteredDeals: Holiday[] = [];

        selectedPrices.forEach((priceName) => {
            const priceRange = PRICES_PER_PERSON.find(
                (range) => range.name === priceName
            );
            if (priceRange) {
                const filtered = deals.filter((deal) => {
                    const { minPrice, maxPrice } = priceRange;
                    return (
                        (!minPrice || deal.pricePerPerson >= minPrice) &&
                        (!maxPrice || deal.pricePerPerson <= maxPrice)
                    );
                });
                filteredDeals.push(...filtered);
            }
        });

        return Array.from(new Set(filteredDeals));
    };

    // Filter function for facilities
    const filterByFacilities = (deals: Holiday[], facilities: string[]) => {
        if (!facilities || facilities.length === 0) return deals;

        return deals.filter((deal) => {
            return facilities.every((facility) =>
                deal.hotel.content.hotelFacilities.includes(facility)
            );
        });
    };

    // Filter function for rating
    const filterByStarRating = (
        deals: Holiday[],
        selectedRatings: string[]
    ) => {
        if (!selectedRatings || selectedRatings.length === 0) return deals;
        const filteredDeals: Holiday[] = [];

        selectedRatings.forEach((rating) => {
            const filtered = deals.filter((deal) => {
                const dealRating = String(deal.hotel.content.starRating);
                return dealRating === rating;
            });
            filteredDeals.push(...filtered);
        });

        return Array.from(new Set(filteredDeals));
    };

    const filteredResults = useMemo(() => {
        let filteredResults = [...results];

        if (selectedFilters.price) {
            filteredResults = filterByPrice(
                filteredResults,
                selectedFilters.price
            );
        }
        if (selectedFilters.facilities) {
            filteredResults = filterByFacilities(
                filteredResults,
                selectedFilters.facilities
            );
        }
        if (selectedFilters.starRating) {
            filteredResults = filterByStarRating(
                filteredResults,
                selectedFilters.starRating
            );
        }

        return filteredResults;
    }, [results, selectedFilters]);

    return (
        <section>
            <h2>{filteredResults?.length} results found</h2>
            <p>Please fill out the filters and results list below&hellip;</p>

            <section className={styles.container}>
                <aside className={styles.filters}>
                    <FiltersComponent
                        allDeals={results}
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                        filteredDeals={filteredResults}
                    />
                </aside>
                <section className={styles.result} data-testid='deals-result'>
                    {filteredResults.length < 1 && (
                        <div className={styles.empty}>No Results Found</div>
                    )}
                    {filteredResults?.map((deal) => {
                        return (
                            <SearchItemComponent
                                deal={deal}
                                adultsCount={adults}
                                key={`hotel-${deal.hotel.id}`}
                            />
                        );
                    })}
                </section>
            </section>
        </section>
    );
}
