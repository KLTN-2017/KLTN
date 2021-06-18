import Select from 'react-select'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchAllDataStaticFilter,
  fetchAllZoneType,
  clearListZone,
  getDateRangeOption,
  getDateStart,
  getMapOption,
  getZoneOption,
  setFilter,
} from '../../tourSlice'
import { RootState } from 'app/rootReducer'

const FilterTour = () => {
  const dispatch = useDispatch()
  const type = useSelector((state: RootState) => state.tour.filter.type)
  useEffect(() => {
    dispatch(fetchAllDataStaticFilter())
  }, [dispatch])
  useEffect(() => {
    dispatch(fetchAllZoneType(type))
    return function () {
      dispatch(clearListZone())
    }
  }, [dispatch, type])
  const optionDateRange = useSelector(getDateRangeOption)
  const optionDateStart = useSelector(getDateStart)
  const optionMap = useSelector(getMapOption)
  const optionZone = useSelector(getZoneOption)
  optionZone.unshift({ value: '', label: 'Tất cả' })
  const optionMoney = [
    {
      label: 'Tất cả',
      value: '',
    },
    {
      label: 'Dưới 5.000.000 VNĐ',
      value: '0-5000000',
    },
    {
      label: 'Từ 5.000.000 - 10.000.000 VNĐ',
      value: '5000000-10000000',
    },
    {
      label: 'Từ 10.000.000 - 20.000.000 VNĐ',
      value: '10000000-20000000',
    },
    {
      label: 'Trên 20.000.000 VNĐ',
      value: '20000000-500000000',
    },
  ]
  const options = [
    { value: '', label: 'Tất cả' },
    { value: 'national', label: 'Du lịch trong nước' },
    { value: 'international', label: 'Du lịch quốc tế' },
  ]
  return (
    <>
      <span>
        <Select
          placeholder="Loại du lịch..."
          options={options}
          onChange={(e) => dispatch(setFilter({ type: e?.value }))}
        />
      </span>
      {type && (
        <span>
          <Select
            placeholder="Địa điểm..."
            options={optionZone}
            onChange={(e) => dispatch(setFilter({ zone: e?.value }))}
          />
        </span>
      )}
      <span>
        <Select
          placeholder="Điểm khởi hành ..."
          options={optionMap}
          onChange={(e) => dispatch(setFilter({ map_maker: e?.value }))}
        />
      </span>
      <span>
        <Select
          placeholder="Ngày khởi hành..."
          options={optionDateStart}
          onChange={(e) => dispatch(setFilter({ date_start: e?.value }))}
        />
      </span>
      <span>
        <Select
          placeholder="Thời gian tour..."
          options={optionDateRange}
          onChange={(e) => dispatch(setFilter({ date_range: e?.value }))}
        />
      </span>
      <span>
        <Select
          placeholder="Chi phí..."
          options={optionMoney}
          onChange={(e) => dispatch(setFilter({ price: e?.value }))}
        />
      </span>
    </>
  )
}

export default FilterTour
