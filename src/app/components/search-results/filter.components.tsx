"use client";
import { useState } from "react";
import { generateFilterParametrs } from "@/utils/filterData.service";
import styles from "./search-results.module.css";

/**
 * FilterComponent is a React component that displays filter options based on the provided results.
 * It allows users to apply filters and notifies the parent component when filters are applied or reset.
 *
 * @param props - The component props.
 * @param props.results - The search results to generate filters from.
 * @param props.onfilterApplied - The callback function to be called when filters are applied or reset.
 * @returns The rendered FilterComponent.
 */
export default function FilterComponent(props: any) {
  const { results, onfilterApplied } = props;
  const [appliedFilters, setAppliedFilters] = useState({} as any);

  /**
   * Resets the applied filters and triggers the onfilterApplied callback with the reset flag.
   */
  const resetHandler = async () => {
    setAppliedFilters({});
    onfilterApplied(true);
  };

  const { data } = generateFilterParametrs(results);

  /**
   * Handles the checkbox change event.
   *
   * @param checked - The new checked state of the checkbox.
   * @param value - The value of the checkbox.
   * @param min - The minimum value for the checkbox.
   * @param max - The maximum value for the checkbox.
   * @param fid - The filter ID.
   */
  const onCheckboxChange = (checked: boolean, value: string, min: number, max: number, fid: string) => {
    const fidValues = appliedFilters?.[fid] || [];
    const values = fidValues.map((v: any) => v.value);
    if (checked && !values.includes(value)) {
      if (value === "NA") {
        fidValues.push({ value: undefined, min, max });
      }
      fidValues.push({ value, min, max });
    } else if (!checked && values.includes(value)) {
      if (value === "NA") {
        const index = fidValues.findIndex((v: any) => v.value === undefined);
        fidValues.splice(fidValues.indexOf(index, 1));
      }
      const idx = fidValues.findIndex((v: any) => v.value === value);
      fidValues.splice(idx, 1);
    }
    setAppliedFilters({ ...appliedFilters, [fid]: fidValues });
    onfilterApplied(false, { ...appliedFilters, [fid]: fidValues });
  };

  /**
   * Handles the filter change event.
   *
   * @param value - The new value of the filter.
   * @param fid - The filter ID.
   */
  const onFilterChange = async (value: any, fid: string) => {
    const app = { ...appliedFilters, [fid]: value };
    setAppliedFilters(app);
    props.onfilterApplied(false, app);
  };

  const getFilter = (filters: any, fid: string) => {
    return filters.map((filter: any) => {
      return (
        <section key={filter.filterId}>
          {filter.filterType === "checkbox" && (
            <section>
              <input
                type="checkbox"
                id={filter.filterId}
                name={filter.filterId}
                checked={appliedFilters?.[fid]?.map((filter: any) => filter.value)?.includes(filter.value) || false}
                onChange={(e) => onCheckboxChange(e.target.checked, filter.value, filter.min, filter.max, fid)}
              />
              <label htmlFor={filter.filterName}>{filter.label}</label>
            </section>
          )}
          {filter.filterType === "input" && (
            <section>
              <input
                type="input"
                id={filter.filterId}
                name={filter.filterId}
                value={appliedFilters?.[fid] || ""}
                onChange={(e) => onFilterChange(e.target.value, fid)}
              />
            </section>
          )}
        </section>
      );
    });
  };

  return (
    <section className={styles.filterPanel}>
      <section className={styles.filterPanelHeader} >
        <h1 className={styles.filterTitle}>Filter By</h1>
        <button onClick={resetHandler}>Reset</button>
      </section>
      {data.map((filter: any) => {
        return (
          <section key={filter.filterName}>
            <h1 className={styles.filterTitle}>{filter.filterName}</h1>
            {getFilter(filter.filters, filter.filterId)}
          </section>
        );
      })}
    </section>
  );
}
