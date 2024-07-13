/**
 * Generates filter parameters based on the provided results and filter metadata.
 * @param results - The results data.
 * @returns The generated filter parameters.
 */
export const generateFilterParametrs = (results: any) => {
    const data: any = [];
    const filterPP = getPricePPFilter(results);
    const hfFilters = getHotelFacilitiesFilter(results);
    const starRatingsFilter = getStarRatingsFilter(results);
    const hotelNameFilter = {
        filterName: "HOTAL NAME",
        filterId: "hotelName",
        filters: [
            {
                filterType: "input",
                filterId: "hotelName"
            }
        ]
    }
    data.push(hotelNameFilter);
    data.push(starRatingsFilter);
    data.push(filterPP);
    data.push(hfFilters);
    return { data };
}

/**
 * Filters the price per person based on the provided results.
 * @param results - The results data.
 * @returns The filtered hotel based on price per person range.
 */
const getPricePPFilter = (results: any) => {
    const pricePP = results?.holidays?.map((holiday: any) => holiday.pricePerPerson) || {};
    const { min, max } = { min: Math.round(Math.min(...pricePP)), max: Math.round(Math.max(...pricePP)) };
    const pricePPFilters = {
        interval: 1000,
        filterName: "Price(PP)",
        filterId: "pricePP",
        filters: [{
            filterType: "checkbox",
            filterId: "upto" + min,
            value: min,
            min: 0,
            max: min,
            label: "upto £" + min
        }]
    }
    for (let i = min; i < max; i += pricePPFilters.interval) {
        pricePPFilters.filters.push({
            filterType: "checkbox",
            filterId: i + "-" + (i + pricePPFilters.interval),
            value: i + pricePPFilters.interval,
            min: i,
            max: i + pricePPFilters.interval,
            label: `£${i} to £${(i + pricePPFilters.interval)}`
        })
    }
    return pricePPFilters;
}

/**
 * Filters the hotel facilities based on the provided results.
 * @param results - The results data.
 * @returns The filtered hotel based on star ratings.
 */
const getStarRatingsFilter = (results: any) => {
    const starRatings = results?.holidays?.map((holiday: any) => holiday.hotel.content.starRating);
    // remove duplicates from the array and filter undefined values
    const uniqueRatings = [...new Set(starRatings)].filter((rating: any) => rating !== undefined);
    // sort the array from high to low rating keeping Villas at the end
    uniqueRatings.sort((a: any, b: any) => {
        if (a === 'Villas') return 1;
        if (b === 'Villas') return -1;
        return a - b;
    });
    // append the 'Not Rated' rating at the end of the array
    uniqueRatings.push('NA');
    return {
        filterName: "Star Ratings",
        filterId: "ratings",
        filters: uniqueRatings.map((rating: any) => {
            return {
                filterType: "checkbox",
                filterId: rating,
                value: rating,
                label: rating === 'NA' ? 'Not Rated' : rating
            }
        })
    }

    // TODO: Implement the logic to filter star ratings based on the provided results
    // This function is currently empty and needs to be implemented
}

/**
 * Filters the hotel facilities based on the provided results.
 * @param results - The results data.
 * @returns The filtered hotel based on hotel facilities.
 */
const getHotelFacilitiesFilter = (results: any) => {
    // get all hotel facilities available in a search results
    const hotelFacilities = results?.holidays?.map((holiday: any) => holiday.hotel.content.hotelFacilities.join(',')).join(',').split(',')

    // remove duplicates from the array
    const uniqueFacilities = [...new Set(hotelFacilities)];
    // remove empty string from the array and sort the array
    const uniqueFacilitiesWithoutEmpty = uniqueFacilities.sort().filter((facility: any) => facility !== "").map((facility: any) => {
        return {
            filterType: "checkbox",
            filterId: facility,
            value: facility,
            label: facility
        }
    })

    // sort the array
    uniqueFacilitiesWithoutEmpty.sort()
    const hfFilters = {
        filterName: "Hotel Facilities",
        filterId: "hotelFacilities",
        filters: uniqueFacilitiesWithoutEmpty
    }
    return hfFilters;
}

/**
 * Filters the hotel data based on the provided filter parameters.
 * @param holidays - The holidays data.
 * @param filterParams - The filter parameters.
 * @returns The filtered hotel data.
 */
export const filterHotelData = (holidays: any, filterParams: any) => {
    const { ratings, pricePP, hotelName, hotelFacilities } = filterParams || {};
    // filter hotel data based on the rating
    let filterData = JSON.parse(JSON.stringify(holidays));
    if (ratings && ratings.length > 0) {
        filterData = filterData.filter((holiday: any) => {
            const starRating = holiday?.hotel?.content?.starRating;
            const starRatings = ratings.map((rating: any) => rating?.value)
            return starRatings.includes(starRating)
        })
    }
    if (hotelFacilities && hotelFacilities.length > 0) {
        filterData = filterData.filter((holiday: any) => {
            const hFacilities = holiday?.hotel?.content?.hotelFacilities;
            const selectedFacilities = hotelFacilities.map((facility: any) => facility?.value)
            return selectedFacilities.some((facility: any) => hFacilities.includes(facility));
        })
    }
    if (pricePP && pricePP.length > 0) {
        filterData = filterData.filter((holiday: any) => {
            return pricePP.some((price: any) => {
                return holiday?.pricePerPerson >= price.min && holiday?.pricePerPerson <= price.max
            })
        })
    }
    if (hotelName && hotelName.length > 0) {
        filterData = filterData.filter((holiday: any) => {
            const hName = holiday?.hotel?.content?.name?.toLowerCase();
            return hName.startsWith(hotelName.toLowerCase())
        })
    }
    return filterData;
}
