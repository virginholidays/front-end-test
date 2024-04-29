import { Holiday } from '@/types/booking';
import DealCardWrapper from '../shared/deal-wrapper.component';
import CarouselBlock from '../deal-carousel/carousel.component';
import styles from './search-item.module.scss';
import DealRating from '../shared/deal-rating.component';
import DealPrice from '../deal-price/deal-price.component';
import Link from 'next/link';

export default function SearchItemComponent({
    deal,
    adultsCount,
}: {
    deal: Holiday;
    adultsCount: number;
}) {
    const location = deal.hotel.content.parentLocation;

    return (
        <section
            data-testid={`deal-${deal.hotel.id}`}
            id={`deal-${deal.hotel.id}`}
            className={styles.holidayDeal}
        >
            <DealCardWrapper>
                <div className={styles.imageContainer}>
                    <CarouselBlock
                        images={deal.hotel.content.images}
                        borderBasis={deal.hotel.boardBasis}
                    />
                </div>
                <Link as={undefined} href='/'>
                    <div className={styles.dealInfo}>
                        <h3>{deal.hotel.name}</h3>
                        {location && (
                            <p className={styles.dealLocation}>{location}</p>
                        )}
                        <DealRating
                            starRating={deal.hotel.content.starRating}
                        />
                        <DealPrice
                            price={deal.pricePerPerson}
                            totalPrice={deal.totalPrice}
                            adultsCount={adultsCount}
                        />
                    </div>
                </Link>
            </DealCardWrapper>
        </section>
    );
}
