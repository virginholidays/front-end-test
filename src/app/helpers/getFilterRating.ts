import { Holiday } from '@/types/booking';
import { Filter } from '@/types/filters';

export function getFilterRating(results: Holiday[]): Filter[] {
  const filterList: Filter[] = [];

  let villaCount = 0;
  const ratingCounts: Record<string, number> = {};

  results.forEach((deal) => {
    let rating = String(deal.hotel.content.starRating);
    if (["1", "2", "3", "4", "5"].includes(rating)) {
        ratingCounts[rating] = (ratingCounts[rating] || 0) + 1; 
    } else if (rating === "Villas") {
        villaCount++;
    }
  });

  for (let rating = 1; rating <= 5; rating++) {
    const count = ratingCounts[String(rating)] || 0;
    filterList.push({ name: String(rating), count });
  }

  filterList.push({ name: "Villas", count: villaCount });

  return filterList;
}