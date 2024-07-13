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
        <section style={{ margin: "10px 0px", height: "312px", display: "flex", flexDirection: "row", width: 1000, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)" }}>
            <section style={{ height: "auto" }}>
                <section style={{ height: 'auto', display: "flex", flexDirection: "column" }}>
                    <section className={styles.cardImageContainer}>
                        <ImageCarouselComponent images={images} />
                        <section className={styles.carddetails}>
                            <h1 style={{ fontSize: "2.5rem", padding: 0, margin: 0 }}>{hotel?.name}</h1>
                            {hotel.content.parentLocation}
                            <p>{`Based on ${hotel?.tripAdvisor?.numReviews} reviews`}</p>
                            {starRating && <p>{`${starRating} Star rating`}</p>}
                            <p>{hotel?.boardBasis}</p>
                            <p>{hotel?.salesMessage?.header}</p>
                        </section>
                    </section>
                    <section className={styles.cardbtncontainer}>
                        <button className={styles.cardbtn}>Find details</button>
                        <button className={styles.cardbtn}>Hotel details</button>
                        <button className={styles.cardbtn}>Reviews</button>
                    </section>
                </section>
            </section>
            <section className={`${styles.carddetails} ${styles.bgGrey}`}>
                <h1 style={{ fontSize: "2.5rem", padding: 0, margin: 0 }}>{`£${pricePerPerson}pp`}</h1>
                <p>{`Total for ${props.guests.length} guests £${totalPrice}`}</p>
            </section>
        </section>
    );
}
