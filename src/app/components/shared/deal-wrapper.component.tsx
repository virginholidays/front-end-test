import styles from './deal-wrapper.module.scss';

export default function DealCardWrapper({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`${styles.cardWrapper} ${className}`}>{children}</div>
    );
}
