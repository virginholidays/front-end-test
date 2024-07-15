import { BookingRequest, PartyComposition } from '@/types/booking';
import { DateTime } from "luxon";
import styles from './page.module.css'
import { DATE_FORMATS } from '@/utils/constants';
import Link from 'next/link';
import { Rooms } from '@/utils/composition.service';

export default function Home() {
  const samples: BookingRequest[] = [
    {
      bookingType: 'holiday',
      location: 'orlando',
      departureDate: DateTime.now().plus({ days: 7, months: 1 }).toFormat(DATE_FORMATS.URL_DATE),
      direct: false,
      duration: "7",
      gateway: 'LHR',
      partyCompositions: [
        {
          adults: 2,
          childAges: [10],
          infants: 0
        },
      ]
    },
    {
      bookingType: 'holiday',
      location: 'new-york',
      departureDate: DateTime.now().plus({ days: 14, months: 1 }).toFormat(DATE_FORMATS.URL_DATE),
      direct: false,
      duration: "14",
      gateway: 'MAN',
      partyCompositions: [
        {
          adults: 2,
          childAges: [12, 10],
          infants: 0
        },
        {
          adults: 3,
          childAges: [14, 15],
          infants: 1
        }
      ]
    },
  ];

  const generateUrl = (sample: BookingRequest) => {
    const { bookingType, location, gateway, departureDate, duration, partyCompositions } = sample;
    const partyCompositionsString = partyCompositions.map((party: PartyComposition) => {
      return `a${party.adults}&room=a${party.adults},${'c' + party.childAges.join(',c')}`
    })
    return `/results?bookingType=${bookingType}&location=${location}&gateway=${gateway}&departureDate=${departureDate}&duration=${duration}&partyCompositions=${partyCompositionsString}`
  }
  return (
    <main className={`wrapper`}>
      <h1>Holiday Search Test</h1>
      <p>Please review the `README.md` file for full instructions.</p>
      <p>We have provided some sample searches below:</p>

      <ul className={styles.list}>
        {
          samples?.map((sample: BookingRequest, idx: number) => {
            return (
              <li key={idx} className={styles.listItem}>
                <Link href={generateUrl(sample)}>
                  {`
                    ${sample?.location} from ${sample?.gateway} (${sample?.duration} nights, ${Rooms.prettyFormat(sample?.partyCompositions)}) 
                  `}
                </Link>
              </li>
            )
          })
        }
      </ul>
    </main>
  )
}
