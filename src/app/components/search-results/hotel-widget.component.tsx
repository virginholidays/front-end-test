"use client";
import ImageCarouselComponent from "./image-carousel.components";
import styles from './search-results.module.css'

/**
 * Renders a hotel widget component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.widgetParams - The widget parameters.
 * @param {Object} props.widgetParams.hotel - The hotel object.
 * @param {number} props.widgetParams.totalPrice - The total price.
 * @param {number} props.widgetParams.pricePerPerson - The price per person.
 * @returns {JSX.Element} The rendered hotel widget component.
 */
export default function HotelWidgetComponent(props: any) {
    const { hotel, totalPrice, pricePerPerson } = props.widgetParams || {};
    const { starRating, images } = hotel?.content || {};
    return (
        <section className={styles.widgetContainer}>
            <section>
                <section className={styles.displayFlexColumn}>
                    <section className={styles.widgetImageContainer}>
                        <ImageCarouselComponent images={images} />
                        <section className={styles.widgetDetails}>
                            <h1 className={styles.widgetDetailsTitle}>{hotel?.name}</h1>
                            {hotel.content.parentLocation}
                            <p>{`Based on ${hotel?.tripAdvisor?.numReviews} reviews`}</p>
                            {starRating && <p>{`${starRating} Star rating`}</p>}
                            <p>{hotel?.boardBasis}</p>
                            <p>{hotel?.salesMessage?.header}</p>
                        </section>
                    </section>
                    <section className={styles.displayFlex}>
                        <button className={styles.widgetBtn}>Find details</button>
                        <button className={styles.widgetBtn}>Hotel details</button>
                        <button className={styles.widgetBtn}>Reviews</button>
                    </section>
                </section>
            </section>
            <section className={`${styles.widgetDetails} ${styles.bgGrey}`}>
                <h1 className={styles.price}>{`£${pricePerPerson}pp`}</h1>
                <p>{`Total for ${props.guests.length} guests £${totalPrice}`}</p>
            </section>
        </section>
    );
}
