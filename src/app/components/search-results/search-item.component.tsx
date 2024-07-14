import styles from './search-results.module.css'
export default function SearchItemComponent({
    searchParams,
}: {
    searchParams: { title: String, content: any };
}) {

    return (
        <section className={styles.seachItemContainer}>
            <label className={styles.title} htmlFor="goingTo">{searchParams.title}</label>
            <label className={styles.content} htmlFor="goingTo">{searchParams.content}</label>
        </section>
    );
}
