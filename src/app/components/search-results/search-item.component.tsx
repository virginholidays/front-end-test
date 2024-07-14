import styles from './search-results.module.css'
export default function SearchItemComponent({
    props
}: {
    props: { title: String, content: any, border?: String };
}) {

    return (
        <section className={`${styles.seachItemContainer} ${props.border === 'none' ? styles.rightBorderNone : ''}`}>
            <label className={styles.title} htmlFor="goingTo">{props.title}</label>
            <label className={styles.content} htmlFor="goingTo">{props.content}</label>
        </section>
    );
}
