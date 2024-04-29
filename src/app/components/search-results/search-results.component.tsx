import { BookingResponse, PartyComposition } from '@/types/booking';
import { Rooms } from '@/utils/composition.service';
import dynamic from 'next/dynamic';

async function getData(params: {
    [key: string]: string | string[] | undefined;
}) {
    const body = {
        bookingType: params.bookingType,
        direct: false,
        location: params.location,
        departureDate: params.departureDate,
        duration: params.duration,
        gateway: params.gateway,
        partyCompositions: Rooms.parseAndConvert([
            params.partyCompositions as string,
        ]),
    };

    const res = await fetch(
        'https://www.virginholidays.co.uk/cjs-search-api/search',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

const ClientSideSearchResults = dynamic(
    () => import('./client-side-search-results.component'),
    { ssr: false }
);

export default async function SearchResultsComponent({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const req = await getData(searchParams);
    const results: BookingResponse = req;

    const partyCompositions: PartyComposition[] = Rooms.parseAndConvert([
        searchParams.partyCompositions as string,
    ]);

    // Calculate the total number of adults
    const adultsCount: number = partyCompositions.reduce(
        (totalAdults, composition) => totalAdults + composition.adults,
        0
    );

    return (
        <ClientSideSearchResults
            results={results.holidays}
            adults={adultsCount}
        />
    );
}
