"use client";
import ImageCarouselComponent from "./image-carousel.components";

export default function HotelWidgetComponent(props: any) {
    const { hotel, totalPrice } = props.widgetParams || {};
    const { vRating, images } = hotel?.content || {};
    return (
        <section style={{ display: "flex", flexDirection: "row", width: 1200, border: "solid 1px black" }}>
            <section style={{ width: 800, border: "solid 1px black" }}>
                <section style={{ display: "flex", flexDirection: "column" }}>
                    <section style={{ display: "flex", flexDirection: "row", border: "solid 1px black" }}>
                        <ImageCarouselComponent images={images} />
                        <section style={{ width: 300, border: "solid 1px black" }}>
                            <h1 style={{ fontSize: "2rem" }}>{hotel?.name}</h1>
                            <p>{vRating}</p>
                            <p>{hotel?.boardBasis}</p>
                        </section>
                    </section>
                    <section style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                        <button>Find details</button>
                        <button>Hotel details</button>
                        <button>Reviews</button>
                    </section>
                </section>
            </section>
            <section style={{ width: 400 }}>
                Section 2

            </section>






            {/* <section style={{ display: "flex", flexDirection: "row" }}>
                <section style={{ display: "flex", flexDirection: "row" }}>
                    <section>
                    </section><ImageCarouselComponent images={images} />
                    <p>{hotel?.name}</p>
                    <p>{vRating}</p>
                    <p>{hotel?.boardBasis}</p>
                </section>
                <section>
                    <p>{hotel?.name}</p>
                    <p>{vRating}</p>

                    <p>{hotel?.boardBasis}</p>
                </section>
            </section>
            <section>
                Sex 1
            </section>
            <section>
                Sex 2
            </section>
            <section>
                Sex 3
            </section>
            <section>
                <p>{totalPrice}</p>

            </section> */}
        </section>
    );
}
