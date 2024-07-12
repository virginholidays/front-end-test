import { BookingResponse } from "@/types/booking";
import { Rooms } from "@/utils/composition.service";
import SearchBarComponent from "./search-bar.component";
import FilterComponent from "./filter.components";
import HotelWidgetComponent from "./hotel-widget.component";
import SearchPageComponent from "./search-page.components";

async function getData(params: { [key: string]: string | string[] | undefined }) {
  const body = {
    bookingType: params.bookingType,
    direct: false,
    location: params.location,
    departureDate: params.departureDate,
    duration: params.duration,
    gateway: params.gateway,
    partyCompositions: Rooms.parseAndConvert([params.partyCompositions as string]),
  };

  const res = await fetch(
    "https://www.virginholidays.co.uk/cjs-search-api/search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function SearchResultsComponent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const req = await getData(searchParams);
  // console.log(req);
  const results: BookingResponse = req;
  console.log(results.holidays.map(hol => hol.hotel.content.vRating))

  return (
    <>
      <SearchBarComponent searchParams={searchParams} />
      <section style={{ display: "flex", flexDirection: "row" }}>
        <SearchPageComponent results={results} />
      </section>
    </>

  );
}
