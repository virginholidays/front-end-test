import styles from './deal-basis.module.scss';

const DealBasis = ({ text }: { text: string }) => (
    <div className={styles.basis}>
        <span className={styles.text}>{text}</span>
    </div>
);

export default DealBasis;
