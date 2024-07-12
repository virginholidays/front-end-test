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
        <div>
            <img src={images[currentImageIndex].RESULTS_CAROUSEL.url} alt="Carousel Image" />
            <section className={styles.imgCarausel}>
                <button className={styles.navBtn} onClick={handlePrevImage}>{"<"}</button>
                <p>{`${currentImageIndex + 1} of ${images.length}`}</p>
                <button className={styles.navBtn} onClick={handleNextImage}>{">"}</button>
            </section>
        </div>
    );
};
