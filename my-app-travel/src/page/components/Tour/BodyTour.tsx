import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ListTour from './ListTour'
import 'rc-pagination/assets/index.css'
import Select from 'react-select'
import {
  fetchAllDataStaticFilter,
  fetchAllZoneType,
  clearListZone,
  getDateRangeOption,
  getDateStart,
  getMapOption,
  getZoneOption,
  setFilter,
} from './TourSlice'
import { RootState } from 'app/rootReducer'
// import Collapsible from 'react-collapsible'

interface Props {
  title: string
}
const options = [
  { value: '', label: 'Tất cả' },
  { value: 'national', label: 'Du lịch trong nước' },
  { value: 'international', label: 'Du lịch quốc tế' },
]
const BodyTour = ({ title }: Props) => {
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
  const optionMoney = [
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
  return (
    <div className="list-tour">
      <h1>{title}</h1>
      {/* <Collapsible trigger={<i className="fas fa-align-justify"></i>}> */}
        <div className="filter-tour">
          <span>
            <Select
              placeholder="Loại du lịch..."
              options={options}
              onChange={(e) => dispatch(setFilter({ type: e?.value }))}
            />
          </span>
          <span>
            <Select
              placeholder="Địa điểm..."
              options={optionZone}
              onChange={(e) => dispatch(setFilter({ zone: e?.value }))}
            />
          </span>
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
        </div>
      {/* </Collapsible> */}
      <ListTour />
    </div>
  )
}

export default BodyTour
