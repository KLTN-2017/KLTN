import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import {
  fetchListStarHotel,
  fetchListZoneHotel,
  selectOptionStarHotel,
  selectOptionZoneHotel,
  setFilter,
} from './hotelSlice'
const FilterHotel = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchListStarHotel())
    dispatch(fetchListZoneHotel())
    return function () {}
  }, [dispatch])
  const optionZone = useSelector(selectOptionZoneHotel)
  optionZone.unshift({ label: 'Tất cả', value: '' })
  const optionStar = useSelector(selectOptionStarHotel)
  optionStar.unshift({ label: 'Tất cả', value: '' })
  return (
    <>
      <Select
        placeholder="Khu vực..."
        options={optionZone}
        onChange={(e) => dispatch(setFilter({ location: e?.value }))}
      />
      <Select
        placeholder="Chất lượng..."
        options={optionStar}
        onChange={(e) => dispatch(setFilter({ star: e?.value }))}
      />
    </>
  )
}

export default FilterHotel
