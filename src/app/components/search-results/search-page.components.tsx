"use client";
import { useState } from "react";
import FilterComponent from "./filter.components";
import HotelWidgetComponent from "./hotel-widget.component";
import { filterHotelData } from "@/utils/filterData.service";
export default function SearchPageComponent(props: any) {

    const [appliedFilters, setAppliedFilters] = useState({} as any)
    const [filteredResults, setFilteredResults] = useState(props.results.holidays)


    function handleOnFilterApplied(reset: boolean = false, filters: any, min: number, max: number) {
        if (reset) {
            setFilteredResults(props.results.holidays)
            return
        } else {
            const filteredDataWithRatings = filterHotelData(props.results.holidays, filters)
            setFilteredResults(filteredDataWithRatings)
            // const ratings = filters?.ratings
            // if (ratings && ratings.length > 0) {
            //     const filtered = props.results.holidays.filter((holiday: any) => {
            //         return ratings.includes(holiday.hotel.content.vRating)
            //     })
            //     setFilteredResults(filtered)
            //     return
            // } else {
            //     setFilteredResults(props.results.holidays)
            // }

        }
    }

    return (
        <section style={{ padding: "0px 10px", width: 400 }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                {filteredResults.length}
                <FilterComponent onfilterApplied={handleOnFilterApplied} />
                <section style={{ display: "flex", flexDirection: "column" }}>
                    {filteredResults.map((holiday: any) => <HotelWidgetComponent key={holiday.id} widgetParams={holiday} />)}
                </section>
            </div>
        </section>
    );
}
