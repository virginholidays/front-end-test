"use client";
import { useState } from "react";
import filterMetadata from "./filterMetadata.module.json";

export default function FilterComponent(props: any) {

  const [appliedFilters, setAppliedFilters] = useState({} as any)
  const resetHandler = async () => {
    setAppliedFilters({})
    props.onfilterApplied(true)
  }

  const onCheckboxChange1 = (checked: boolean, value: string, min: number, max: number, fid: string) => {
    const fidValues = appliedFilters?.[fid] || []
    if (checked && !fidValues.includes(value)) {
      if (value === "NA") {
        fidValues.push(undefined)
      }
      fidValues.push(value)
    } else if (!checked && fidValues.includes(value)) {
      if (value === "NA") {
        fidValues.splice(fidValues.indexOf(undefined), 1)
      }
      fidValues.splice(fidValues.indexOf(value), 1)
    }
    setAppliedFilters({ ...appliedFilters, [fid]: fidValues })
    const dd = fidValues.map((value: string) => ({ min, max, value }))
    props.onfilterApplied(false, { ...appliedFilters, [fid]: dd, })
  }

  const onCheckboxChange = (checked: boolean, value: string, min: number, max: number, fid: string) => {
    const fidValues = appliedFilters?.[fid] || []
    const values = fidValues.map((v: any) => v.value)
    if (checked && !values.includes(value)) {
      if (value === "NA") {
        fidValues.push({ value: undefined, min, max })
      }
      fidValues.push({ value, min, max })
    } else if (!checked && values.includes(value)) {
      if (value === "NA") {
        const index = fidValues.findIndex((v: any) => v.value === undefined)
        fidValues.splice(fidValues.indexOf(index, 1))
      }
      const idx = fidValues.findIndex((v: any) => v.value === value)
      fidValues.splice(idx, 1)
    }
    setAppliedFilters({ ...appliedFilters, [fid]: fidValues })
    props.onfilterApplied(false, { ...appliedFilters, [fid]: fidValues })
  }

  const onFilterChange = async (value: any, fid: string, filterId: string) => {
    /* if (value) {
      const fidValues = appliedFilters?.[fid] || []
      if (!fidValues.includes(value)) {
        fidValues.push(value)
      }
      const app = { ...appliedFilters, [fid]: fidValues }
      setAppliedFilters(app)
      props.onfilterApplied(false, app)
    }
    if (!value) {
      const fidValues = appliedFilters?.[fid] || []
      if (fidValues.includes(value)) {
        fidValues.p
      }
    } */
  }

  const getFilter = (filters: any, fid: string) => {
    return filters.map((filter: any) => {
      return (
        <div key={filter.filterType}>
          {filter.filterType === "checkbox" && (
            <div>
              <input type="checkbox" id={filter.filterId} name={filter.filterId}
                checked={appliedFilters?.[fid]?.map((filter: any) => filter.value)?.includes(filter.value) || false}
                onChange={(e) => onCheckboxChange(e.target.checked, filter.value, filter.min, filter.max, fid)}
              />
              <label htmlFor={filter.filterName}>{filter.label}</label>
            </div>
          )
          }
          {filter.filterType === "input" && (
            <div>
              <input type="input" id={filter.filterId} name={filter.filterId}
                value={appliedFilters?.[fid]?.map((filter: any) => filter.value)?.[filter.filterId] || ''}
                onChange={(e) => onFilterChange(e.target.value, fid, filter.filterId)}
              />
            </div>
          )
          }
        </div>
      )
    })
  }

  return (
    <section style={{ padding: "0px 10px", width: 400 }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <h1>Filter By</h1>
        <button onClick={resetHandler}>Reset</button>
      </div>

      {filterMetadata.data.map((filter) => {
        return (
          <div key={filter.filterName}>
            <h1>
              {filter.filterName}
            </h1>
            {getFilter(filter.filters, filter.filterId)}
          </div>)
      })}

    </section>
  );
}
