import React from 'react';
import styles from './checkbox.module.scss';

export default function CheckboxComponent({
    checked = false,
    onClick,
    children,
    id,
    count,
    hideCount = false,
}: {
    checked?: boolean;
    onClick: () => void;
    count: number;
    id: string;
    children: React.ReactNode;
    hideCount: boolean;
}) {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onClick();
        }
    };

    return (
        <label
            htmlFor={id}
            className={`${styles.customCheckbox} ${
                checked ? styles.active : ''
            }`}
            onChange={onClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            test-id={id}
        >
            <input
                aria-checked='false'
                id={id}
                className={styles.checkbox}
                type='checkbox'
                tabIndex={-1}
            />
            <span className={styles.checkmark}></span>
            <span className={styles.checkboxBlock}>
                <div className={styles.label}>{children}</div>
                {!hideCount && <div className={styles.count}>({count})</div>}
            </span>
        </label>
    );
}
