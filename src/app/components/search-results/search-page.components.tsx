"use client";
import { useState } from "react";
import FilterComponent from "./filter.components";
import HotelWidgetComponent from "./hotel-widget.component";
import { filterHotelData } from "@/utils/filterData.service";
import styles from "./search-results.module.css";
import { Holiday } from "@/types/booking";

/**
 * Renders the search page component.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.results - The search results.
 * @param {Object} props.searchParams - The search parameters.
 * @returns {JSX.Element} The rendered search page component.
 */
export default function SearchPageComponent(props: any) {
    const { results, searchParams } = props;
    const holidays: Holiday[] = results?.holidays;
    const [filteredResults, setFilteredResults] = useState(holidays);

    /**
     * Handles the filter applied event.
     * 
     * @param {boolean} reset - Indicates whether to reset the filters.
     * @param {Object} filters - The filter parameters.
     */
    function handleOnFilterApplied(reset: boolean = false, filters: any) {
        if (reset) {
            setFilteredResults(holidays);
        } else {
            setFilteredResults(filterHotelData(holidays, filters));
        }
    }

    const noOfHolidays = () => filteredResults?.length.toString().split('').map((str: string) => <section key={str} className={styles.holidaysFound}>{str}</section>);
    const guests = Array.isArray(searchParams.room) ? searchParams.room.join(',').split(',') : searchParams.room?.split(',') || [];

    return (
        <section className={styles.searhPage}>
            <section className={styles.diplayFlexRow}>
                <FilterComponent onfilterApplied={handleOnFilterApplied} results={results} />
                <section className={styles.displayFlexColumn}>
                    <section className={styles.holidaysFoundContainer}> {noOfHolidays()} holidays found</section>
                    {filteredResults?.length === 0 && <section className={styles.noResults}>Oops! No results found, please try to change the filters</section>}
                    {filteredResults?.map((holiday: any) => <HotelWidgetComponent key={holiday.hotel.id} widgetParams={holiday} guests={guests} />)}
                </section>
            </section>
        </section>
    );
}
