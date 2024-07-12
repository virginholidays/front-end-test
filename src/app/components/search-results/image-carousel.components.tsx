"use client";
import React, { useState } from 'react';
import Link from "next/link";
import styles from './search-results.module.css'
export default function ImageCarouselComponent(props: any) {
    const { images } = props
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <section className={styles.imgCarausel}>
            <img src={images[currentImageIndex].RESULTS_CAROUSEL.url} alt="Carousel Image" />
            <section className={styles.imgCarauselNavBar}>
                <button className={styles.navBtn} onClick={handlePrevImage}>{"<"}</button>
                <div>
                    <p>{`${currentImageIndex + 1} of ${images.length}`}</p>

                </div>
                <button className={styles.navBtn} onClick={handleNextImage}>{">"}</button>
            </section>
        </section>
    );
};
