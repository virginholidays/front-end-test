"use client";
import ImageCarouselComponent from "./image-carousel.components";

export default function HotelWidgetComponent(props: any) {
    const { hotel, totalPrice } = props.widgetParams || {};
    const { vRating, images } = hotel?.content || {};
    return (
        <section>
            {/* <p>{totalPrice}</p>
            <p>{hotel?.name}</p>
            <p>{hotel?.boardBasis}</p>
            <p>{vRating}</p> */}
            <ImageCarouselComponent images={images} />
        </section>
    );
}
