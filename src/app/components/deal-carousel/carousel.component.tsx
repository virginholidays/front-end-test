'use client';

import { HotelImage } from '@/types/booking';
import Image, { ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './carousel.module.scss';
import DealBasis from '../deal-basis/deal-basis.component';

export default function CarouselBlock({
    images,
    className = '',
    borderBasis,
}: {
    images: HotelImage[];
    className?: string;
    borderBasis: string;
}) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                handlePrevClick();
            } else if (event.key === 'ArrowRight') {
                handleNextClick();
            }
        };

        const carouselElement = carouselRef.current;

        if (carouselElement) {
            carouselElement.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener('keydown', handleKeyDown);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={`${styles.carousel} ${className}`}
            ref={carouselRef}
            tabIndex={0}
        >
            <Image
                alt=''
                src={`https:${images[currentIndex].RESULTS_CAROUSEL.url}`}
                loading='lazy'
                fill
                {...(images[currentIndex].RESULTS_CAROUSEL.url &&
                    ({
                        srcSet: `
                            https:${images[currentIndex].RESULTS_CAROUSEL.url} 1024w,
                            https:${images[currentIndex].MOBILE_MAIN.url} 640w
                        `,
                        sizes: `(min-width: 768px) 1024px, 100vw`,
                    } as unknown as ImageProps))}
                sizes={`(min-width: 768px) 1024px, 100vw`}
            />
            <DealBasis text={borderBasis} />
            <button
                onClick={handlePrevClick}
                className={styles.prev}
                aria-label='Previous'
            >
                &lt;
            </button>
            <button
                onClick={handleNextClick}
                className={styles.next}
                aria-label='Next'
            >
                &gt;
            </button>
        </div>
    );
}
