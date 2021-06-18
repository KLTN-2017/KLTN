import Select from 'react-select'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchListStarHotel,
  fetchListZoneHotel,
  clearStar,
  clearZone,
  setFilter,
  clearFilter,
  selectOptionStarHotel,
  selectOptionZoneHotel,
} from '../hotelSlice'

const FilterTour = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchListStarHotel())
    dispatch(fetchListZoneHotel())
    return function () {
      dispatch(clearZone())
      dispatch(clearStar())
      dispatch(clearFilter())
    }
  }, [dispatch])
  const optionZone = useSelector(selectOptionZoneHotel)
  const optionStar = useSelector(selectOptionStarHotel)

  return (
    <div className="filter-hotel">
      <span>
        <Select
          placeholder="Khu vực..."
          options={optionZone}
          onChange={(e) => dispatch(setFilter({ location: e?.value }))}
        />
      </span>
      <span>
        <Select
          placeholder="Chất lượng..."
          options={optionStar}
          onChange={(e) => dispatch(setFilter({ star: e?.value }))}
        />
      </span>
    </div>
  )
}

export default FilterTour
