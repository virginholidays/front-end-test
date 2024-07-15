"use client";
import React, { useState } from 'react';
import styles from './search-results.module.css'

/**
 * Image Carousel Component.
 * 
 * @param {Object} props - The component props.
 * @param {Array} props.images - The array of images to be displayed in the carousel.
 * @returns {JSX.Element} The rendered ImageCarouselComponent.
 */
export default function ImageCarouselComponent(props: any) {
    const { images } = props
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    /**
     * Handles the click event for the next image button.
     */
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    /**
     * Handles the click event for the previous image button.
     */
    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <section className={styles.imgCarausel}>
            <img height="250px" src={images[currentImageIndex].RESULTS_CAROUSEL.url} alt="Carousel Image" />
            <section className={styles.imgCarauselNavBar}>
                <button className={styles.navBtn} onClick={handlePrevImage}>{"<"}</button>
                <section className={styles.imageCounter}>
                    {`${currentImageIndex + 1} of ${images.length}`}
                </section>
                <button className={styles.navBtn} onClick={handleNextImage}>{">"}</button>
            </section>
        </section>
    );
};
