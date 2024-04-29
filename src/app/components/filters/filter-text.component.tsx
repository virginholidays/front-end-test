import { Filter } from '@/types/filters';
import CheckboxComponent from '../checkbox/checkbox.component';
import styles from './filter-text.module.scss';
import RatingComponent from '../rating/rating.component';

export default function FilterTextComponent({
    title,
    onChangeAction,
    selected,
    options,
    rating = false,
    hideEmptyCount = false,
}: {
    title: string;
    selected: string[] | null;
    onChangeAction: (val: string) => void;
    options: Filter[];
    rating?: boolean;
    hideEmptyCount?: boolean;
}) {
    return (
        <div className={styles.filterGroup} test-id={`filter-group-${title}`}>
            <div className={styles.filterTitle}>{title}</div>
            <ul className={styles.filterList}>
                {options?.map((item: Filter, index: number) => {
                    const active = selected?.find((select) => {
                        return item.name === select;
                    });

                    return (
                        <li
                            className={styles.filterItem}
                            key={`select-menu__li--${title}-${index}`}
                        >
                            <CheckboxComponent
                                onClick={() => onChangeAction(item.name)}
                                checked={!!active}
                                count={item.count}
                                id={`select-menu__li--${title}-${index}`}
                                hideCount={
                                    hideEmptyCount &&
                                    item.count === 0 &&
                                    !active
                                }
                            >
                                {rating ? (
                                    <RatingComponent starRating={item.name} />
                                ) : (
                                    item.name
                                )}
                            </CheckboxComponent>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
