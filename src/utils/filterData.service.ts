
export const filterHotelData = (holidays: any, filterParams: any) => {
    const { ratings, pricePP } = filterParams || {};
    // filter hotel data based on the rating
    let filterData = JSON.parse(JSON.stringify(holidays));
    if (ratings && ratings.length > 0) {
        filterData = filterData.filter((holiday: any) => {
            const vRating = holiday?.hotel?.content?.vRating;
            const vRatings = ratings.map((rating: any) => rating?.value)
            return vRatings.includes(vRating)
        })
    } if (pricePP && pricePP.length > 0) {
        filterData = filterData.filter((holiday: any) => {
            return pricePP.some((price: any) => {
                return holiday?.pricePerPerson >= price.min && holiday?.pricePerPerson <= price.max
            })
        })
    }
    return filterData;
}
