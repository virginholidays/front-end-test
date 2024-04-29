import {
    FILTER_FACILITIES,
    PRICE_PER_PERSON,
    FILTER_RATING,
} from '@/utils/constants';
import FilterTextComponent from './filter-text.component';
import { Holiday } from '@/types/booking';
import { getFilterFacility } from '@/app/helpers/getFilterFacility';
import { getFilterPrice } from '@/app/helpers/getFilterPrice';
import { getFilterRating } from '@/app/helpers/getFilterRating';
import { SelectedFilters } from '@/types/filters';

export default function FiltersComponent({
    allDeals,
    filteredDeals,
    selectedFilters,
    setSelectedFilters,
}: {
    allDeals: Holiday[];
    filteredDeals: Holiday[];
    selectedFilters: SelectedFilters;
    setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
}) {
    const handleFilterClick = (
        filterType: keyof SelectedFilters,
        value: string
    ) => {
        setSelectedFilters((prevFilters: SelectedFilters) => {
            const updatedFilters = { ...prevFilters };
            const filterValues = updatedFilters[filterType] || [];

            if (filterValues.includes(value)) {
                updatedFilters[filterType] = filterValues.filter(
                    (v) => v !== value
                );
            } else {
                updatedFilters[filterType] = [...filterValues, value];
            }

            if (!updatedFilters[filterType]?.length) {
                updatedFilters[filterType] = null;
            }

            return updatedFilters;
        });
    };

    return (
        <>
            <FilterTextComponent
                options={getFilterRating(filteredDeals)}
                onChangeAction={(rating: string) =>
                    handleFilterClick('starRating', rating)
                }
                title={FILTER_RATING}
                selected={selectedFilters.starRating}
                rating
                hideEmptyCount={!!selectedFilters.starRating}
            />

            <FilterTextComponent
                options={getFilterPrice(filteredDeals)}
                onChangeAction={(price: string) =>
                    handleFilterClick('price', price)
                }
                title={PRICE_PER_PERSON}
                selected={selectedFilters.price}
                hideEmptyCount={!!selectedFilters.price}
            />

            <FilterTextComponent
                options={getFilterFacility(allDeals, filteredDeals)}
                onChangeAction={(facility: string) =>
                    handleFilterClick('facilities', facility)
                }
                title={FILTER_FACILITIES}
                selected={selectedFilters.facilities}
            />
        </>
    );
}
