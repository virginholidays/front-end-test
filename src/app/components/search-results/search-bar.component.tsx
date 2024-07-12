import Link from "next/link";
import { DateTime, } from "luxon";
import { DATE_FORMATS } from '@/utils/constants';
import styles from './search-results.module.css'
import SearchItemComponent from "../common/search-item.component";


export default async function SearchBarComponent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const { bookingType, location, departureDate, duration, gateway, partyCompositions } = searchParams;
  //TODO fix the return date
  console.log(searchParams)
  const returnDate = DateTime.fromISO(departureDate?.toString() ?? "").plus({ days: Number(duration) }).toFormat(DATE_FORMATS.URL_DATE);

  return (
    <section style={{ display: "flex", flexDirection: "row", alignItems: 'center', backgroundColor: '#e8e8e8', padding: "0px 10px" }}>
      <SearchItemComponent searchParams={{ title: "You Searched For", content: bookingType }} />
      <SearchItemComponent searchParams={{ title: "Going TO:", content: location }} />
      <SearchItemComponent searchParams={{ title: "Flying From:", content: gateway }} />
      <SearchItemComponent searchParams={{ title: "Depart:", content: departureDate }} />
      <SearchItemComponent searchParams={{ title: "Return:", content: returnDate }} />
      <SearchItemComponent searchParams={{ title: "Room & Guests:", content: searchParams.location }} />
      <Link className={styles.editButton} href="/">Edit Search</Link>
    </section>
  );
}
