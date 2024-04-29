import { CURRENCY } from '@/utils/constants';
import styles from './deal-price.module.scss';

export default function DealPriceComponent({
    price,
    totalPrice,
    adultsCount,
}: {
    price: number;
    totalPrice: number;
    adultsCount: number;
}) {
    const adult = adultsCount > 1 ? 'guests' : 'guest';

    return (
        <div className={styles.priceBlock}>
            <p className={styles.pricePP}>
                {CURRENCY}
                {price}pp
            </p>
            <p className={styles.priceTotal}>
                Total for {adultsCount} {adult}
                <strong>
                    {CURRENCY}
                    {totalPrice}
                </strong>
            </p>
        </div>
    );
}
