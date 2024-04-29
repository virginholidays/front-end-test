import { Holiday } from '@/types/booking';

function extractFacilities(results: Holiday[]) {
  const allFacilities = results.reduce((facilities: string[], deal) => {
    deal.hotel.content.hotelFacilities.forEach((facility) => {
          if (!facilities.includes(facility)) {
              facilities.push(facility);
          }
      });
      return facilities;
  }, []);
  return allFacilities;
}

function countFacilityOccurrences(results: Holiday[], allFacilities: string[]) {
  const facilityCounts: Record<string, number> = {};
  allFacilities.forEach((facility: string) => {
      facilityCounts[facility] = results.reduce((count, deal) => {
          if (deal.hotel.content.hotelFacilities.includes(facility)) {
              return count + 1;
          }
          return count;
      }, 0);
  });
  return facilityCounts;
}

export function getFilterFacility(deals: Holiday[], filteredDeals: Holiday[]) {
  const allFacilities = extractFacilities(deals);
  const facilityCounts = countFacilityOccurrences(filteredDeals, allFacilities);

  const filteredFacilityList = allFacilities.map((facility) => ({
      name: facility,
      count: facilityCounts[facility] || 0,
  }));

  return filteredFacilityList;
}