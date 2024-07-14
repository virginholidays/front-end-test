import Link from "next/link";
import { DateTime } from "luxon";
import { DATE_FORMATS } from '@/utils/constants';
import styles from './search-results.module.css'
import SearchItemComponent from "./search-item.component";

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
    <section className={styles.searchBar}>
      <SearchItemComponent props={{ title: "You Searched For", content: bookingType }} />
      <SearchItemComponent props={{ title: "Going TO:", content: location }} />
      <SearchItemComponent props={{ title: "Flying From:", content: gateway }} />
      <SearchItemComponent props={{ title: "Depart:", content: departureDate }} />
      <SearchItemComponent props={{ title: "Return:", content: returnDate }} />
      <SearchItemComponent props={{ title: "Room & Guests:", content: getRoomAndGuests(), border: 'none' }} />
      <Link className={styles.primaryButton} href="/">Edit Search</Link>
    </section>
  );
}
