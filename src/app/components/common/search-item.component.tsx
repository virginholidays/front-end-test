import styles from './search-item.module.css'
export default function SearchItemComponent({
    searchParams,
}: {
    searchParams: { title: String, content: any };
}) {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: 150, padding: "15px 10px", flex: 1 }}>
            <label className={styles.title} htmlFor="goingTo">{searchParams.title}</label>
            <label className={styles.content} htmlFor="goingTo">{searchParams.content}</label>
        </div>
    );
}
