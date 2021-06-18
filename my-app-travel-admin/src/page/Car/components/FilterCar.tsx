import Select from 'react-select'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchListNumberSitCar,
  fetchListTypeCar,
  fetchListYearCar,
  clearListNumberSit,
  clearListTypeCar,
  clearListYear,
  selectOptionNumberSitCar,
  selectOptionTypeCar,
  selectOptionYearCar,
  setFilter,
  clearFilter,
} from '../carSlice'

const FilterTour = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchListNumberSitCar())
    dispatch(fetchListTypeCar())
    dispatch(fetchListYearCar())
    return function () {
      dispatch(clearListNumberSit())
      dispatch(clearListTypeCar())
      dispatch(clearListYear())
      dispatch(clearFilter())
    }
  }, [dispatch])
  const optionNumberSitCar = useSelector(selectOptionNumberSitCar)
  const optionTypeCar = useSelector(selectOptionTypeCar)
  const optionYearCar = useSelector(selectOptionYearCar)
  return (
    <div className="filter-car">
      <span>
        <Select
          placeholder="Loại xe..."
          options={optionTypeCar}
          onChange={(e) => dispatch(setFilter({ brand: e?.value }))}
        />
      </span>

      <span>
        <Select
          placeholder="Số chỗ..."
          options={optionNumberSitCar}
          onChange={(e) => dispatch(setFilter({ cartype: e?.value }))}
        />
      </span>
      <span>
        <Select
          placeholder="Năm sản xuất ..."
          options={optionYearCar}
          onChange={(e) => dispatch(setFilter({ vehiclelife: e?.value }))}
        />
      </span>
    </div>
  )
}

export default FilterTour
