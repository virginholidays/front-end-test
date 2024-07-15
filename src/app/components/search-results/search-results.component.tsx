import { BookingResponse } from "@/types/booking";
import { Rooms } from "@/utils/composition.service";
import SearchBarComponent from "./search-bar.component";
import SearchPageComponent from "./search-page.components";
import styles from "./search-results.module.css";

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
  const results: BookingResponse = req;

  return (
    <section>
      <SearchBarComponent searchParams={searchParams} />
      <section className={styles.displayFlex}>
        <SearchPageComponent results={results} searchParams={searchParams} />
      </section>
    </section>
  );
}
