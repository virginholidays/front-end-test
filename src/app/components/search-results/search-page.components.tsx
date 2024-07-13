"use client";
import { useState } from "react";
import FilterComponent from "./filter.components";
import HotelWidgetComponent from "./hotel-widget.component";
import { filterHotelData } from "@/utils/filterData.service";
import styles from "./search-results.module.css";

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
    const [filteredResults, setFilteredResults] = useState(results?.holidays);

    /**
     * Handles the filter applied event.
     * 
     * @param {boolean} reset - Indicates whether to reset the filters.
     * @param {Object} filters - The filter parameters.
     */
    function handleOnFilterApplied(reset: boolean = false, filters: any) {
        if (reset) {
            setFilteredResults(results.holidays);
        } else {
            setFilteredResults(filterHotelData(results.holidays, filters));
        }
    }

    const noOfHolidays = () => filteredResults?.length.toString().split('').map((str: string) => <section key={str} className={styles.holidaysFound}>{str}</section>);
    const guests = Array.isArray(searchParams.room) ? searchParams.room.join(',').split(',') : searchParams.room?.split(',') || [];

    return (
        <section style={{ padding: "0px 10px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <FilterComponent onfilterApplied={handleOnFilterApplied} results={results} />
                <section style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <section style={{ display: "flex", alignItems: 'center', margin: "10px 0px" }}> {noOfHolidays()} holidays found</section>
                    {filteredResults?.map((holiday: any) => <HotelWidgetComponent key={holiday.hotel.id} widgetParams={holiday} guests={guests} />)}
                </section>
            </div>
        </section>
    );
}
