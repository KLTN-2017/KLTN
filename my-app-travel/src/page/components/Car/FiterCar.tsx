import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import {
  fetchListTypeCar,
  setFilter,
  clearFilter,
  fetchListNumberSitCar,
  fetchListYearCar,
  selectOptionTypeCar,
  selectOptionNumberSitCar,
  selectOptionYearCar,
} from './carSlice'
const FilterCar = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchListTypeCar())
    dispatch(fetchListNumberSitCar())
    dispatch(fetchListYearCar())
    return function () {
      dispatch(clearFilter())
    }
  }, [dispatch])
  const optionTypeCar = useSelector(selectOptionTypeCar)
  optionTypeCar.unshift({ label: 'Tất cả', value: '' })
  const optionNumberSitCar = useSelector(selectOptionNumberSitCar)
  optionNumberSitCar.unshift({ label: 'Tất cả', value: '' })
  const optionYearCar = useSelector(selectOptionYearCar)
  optionYearCar.unshift({ label: 'Tất cả', value: '' })
  return (
    <>
      <Select
        placeholder="Loại xe..."
        options={optionTypeCar}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        onChange={(e) => dispatch(setFilter({ brand: e?.value }))}
      />
      <Select
        placeholder="Số chỗ..."
        options={optionNumberSitCar}
        onChange={(e) => dispatch(setFilter({ cartype: e?.value }))}
      />
      <Select
        placeholder="Năm sản xuất..."
        options={optionYearCar}
        onChange={(e) => dispatch(setFilter({ vehiclelife: e?.value }))}
      />
    </>
  )
}

export default FilterCar
