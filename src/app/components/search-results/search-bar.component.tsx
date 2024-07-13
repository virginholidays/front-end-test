import Link from "next/link";
import { DateTime } from "luxon";
import { DATE_FORMATS } from '@/utils/constants';
import styles from './search-results.module.css'
import SearchItemComponent from "../common/search-item.component";

/**
 * Renders the search bar component.
 *
 * @param searchParams - The search parameters.
 * @returns The rendered search bar component.
 */
export default async function SearchBarComponent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { bookingType, location, departureDate, duration, gateway, room } = searchParams;

  //TODO fix the return date
  const noOfRooms = Array.isArray(room) ? room.length : 1;

  /**
   * Gets the room and guests information.
   *
   * @returns The room and guests information.
   */
  const getRoomAndGuests = () => {
    const rooms = Array.isArray(room) ? room.join(',').split(',') : room?.split(',') || [];
    const isPlural = (len: number = 0) => len > 1;
    const noOfchildren = rooms.filter(part => part.startsWith('c')).length;
    const noofAdults = rooms.filter(part => part.startsWith('a')).map(r => Number(r.substring(1, r.length))).reduce((acc, cur) => acc + cur);
    const rommsStr = `${noOfRooms} ${(isPlural(noOfRooms) ? 'rooms' : 'room')}`;
    const addults = `${noofAdults} ${isPlural(noofAdults) ? 'adults' : 'adult'}`;
    const children = `${noOfchildren} ${isPlural(noOfchildren) ? 'children' : 'child'}`;
    return `${rommsStr} / ${addults} / ${children}`;
  }

  const returnDate = DateTime.fromISO(departureDate?.toString() ?? "").plus({ days: Number(duration) }).toFormat(DATE_FORMATS.URL_DATE);

  return (
    <section style={{ display: "flex", flexDirection: "row", alignItems: 'center', backgroundColor: '#e8e8e8', padding: "0px 10px" }}>
      <SearchItemComponent searchParams={{ title: "You Searched For", content: bookingType }} />
      <SearchItemComponent searchParams={{ title: "Going TO:", content: location }} />
      <SearchItemComponent searchParams={{ title: "Flying From:", content: gateway }} />
      <SearchItemComponent searchParams={{ title: "Depart:", content: departureDate }} />
      <SearchItemComponent searchParams={{ title: "Return:", content: returnDate }} />
      <SearchItemComponent searchParams={{ title: "Room & Guests:", content: getRoomAndGuests() }} />
      <Link className={styles.editButton} href="/">Edit Search</Link>
    </section>
  );
}
