import RatingComponent from '../rating/rating.component';
import styles from './deal-rating.module.scss';

export default function DealRating({
    vRating,
    starRating,
}: {
    vRating?: number | string;
    starRating?: number | string;
}) {
    return (
        <div className={styles.ratingWrapper}>
            {vRating && <div className={styles.vRating}>{vRating}</div>}
            <div className={styles.starRating}>
                <RatingComponent starRating={starRating} />
            </div>
        </div>
    );
}
