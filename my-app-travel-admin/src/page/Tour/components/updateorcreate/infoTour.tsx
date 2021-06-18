import { AutoComplete } from 'antd'
import { getSearchCity } from 'api/tourApi'
import {
  clearListZone,
  fetchAllDataStaticFilter,
  fetchAllZoneType,
  getDateRangeOption,
  getDateStart,
  getMapOption,
  getZoneOption,
  clearStaticDataFilter,
} from 'page/Tour/tourSlice'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TourDetail, Dic } from '../../../../api/interface/tour'
interface Props {
  tourUpCR: TourDetail | null
  updateTour: (data: Dic) => void
}
const InfoTour = ({ tourUpCR, updateTour }: Props) => {
  const dispatch = useDispatch()
  const optionDateRange = useSelector(getDateRangeOption).map((option) => ({
    ...option,
    value: option.value?.toString() || '',
  }))
  const optionDateStart = useSelector(getDateStart)
  const optionMap = useSelector(getMapOption)
  const optionZone = useSelector(getZoneOption)
  const [showListCity, setShowListCity] = useState(false)
  const options = [
    { value: '', label: 'Tất cả' },
    { value: 'national', label: 'Du lịch trong nước' },
    { value: 'international', label: 'Du lịch quốc tế' },
  ]
  const [city, setCity] = useState('')
  const [isFetch, setIsFetch] = useState(false)
  const [listCity, setListCity] = useState<{ name: string; origin: string }[]>(
    []
  )

  useEffect(() => {
    setCity(tourUpCR?.city || '')
  }, [tourUpCR?.city])

  useEffect(() => {
    dispatch(fetchAllDataStaticFilter())
    return () => {
      clearStaticDataFilter()
    }
  }, [dispatch])
  useEffect(() => {
    if (tourUpCR?.type) dispatch(fetchAllZoneType(tourUpCR.type))
    return function () {
      dispatch(clearListZone())
    }
  }, [dispatch, tourUpCR?.type])
  useEffect(() => {
    let myVar: any
    function myFunction() {
      myVar = city
        ? setTimeout(async () => {
            const data = await getSearchCity(city)
            console.log(data)
            setListCity(data || [])
            setIsFetch(false)
          }, 1000)
        : setListCity([])
    }
    function myStopFunction() {
      clearTimeout(myVar)
    }
    if (isFetch) {
      myStopFunction()
      myFunction()
    } else {
      setIsFetch(true)
      myFunction()
    }
    return () => {
      myStopFunction()
    }
  }, [city])
  const optionCity = listCity.map((city, index) => (
    <li
      key={index}
      onClick={() => {
        updateTour({ city: city.origin })
        console.log('clike me')
      }}
    >
      Thành phố {city.name}
    </li>
  ))
  return (
    <div className="more-info">
      <div className="list-info">
        <div className="item-info">
          <label>Ngày khỏi hành:</label>
          <AutoComplete
            allowClear={true}
            value={
              optionDateStart.find(
                (option) => option.value === tourUpCR?.date_start
              )?.value || ''
            }
            onChange={(e) => updateTour({ date_start: e })}
            style={{ width: '70%' }}
            options={optionDateStart}
            placeholder="Ngày khởi hành..."
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </div>
        <div className="item-info">
          <label>Thời gian:</label>
          <AutoComplete
            allowClear={true}
            value={
              optionDateRange
                .find(
                  (option) => option.value === tourUpCR?.date_range.toString()
                )
                ?.value?.toString() || ''
            }
            onChange={(e) => updateTour({ date_range: e })}
            style={{ width: '70%' }}
            options={optionDateRange}
            placeholder="Thời gian tour..."
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </div>
        <div className="item-info">
          <label>Địa điểm xuất phát:</label>
          <AutoComplete
            allowClear={true}
            value={
              optionMap.find((option) => option.value === tourUpCR?.map_maker)
                ?.value || ''
            }
            onChange={(e) => updateTour({ map_maker: e })}
            style={{ width: '70%' }}
            options={optionMap}
            placeholder="Nơi khỏi hành khởi hành..."
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </div>
        <div className="item-info">
          <label>Số chỗ:</label>
          <input
            value={tourUpCR?.number_sit}
            onChange={(e) =>
              updateTour({
                number_sit: parseInt(e.currentTarget.value)
                  ? parseInt(e.currentTarget.value).toString()
                  : '',
              })
            }
          />
        </div>
        <div className="item-info">
          <label>Chi phí:</label>
          <input
            value={tourUpCR?.price}
            onChange={(e) =>
              updateTour({
                price: parseInt(e.currentTarget.value)
                  ? parseInt(e.currentTarget.value).toString()
                  : '',
              })
            }
          />
        </div>
        <div className="item-info">
          <label>Loại:</label>
          <AutoComplete
            allowClear={true}
            value={
              options.find((option) => option.value === tourUpCR?.type)
                ?.value || ''
            }
            onChange={(e) => updateTour({ type: e })}
            style={{ width: '70%' }}
            options={options}
            placeholder="Loại du lịch..."
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </div>
        <div className="item-info">
          <label>Khu vực:</label>
          <AutoComplete
            allowClear={true}
            value={
              optionZone.find((option) => option.value === tourUpCR?.zone)
                ?.value || ''
            }
            onChange={(e) => updateTour({ zone: e })}
            style={{ width: '70%' }}
            options={optionZone}
            placeholder="khu vực..."
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </div>
        <div className="item-info">
          <label>Khuyến mãi:</label>
          <input
            value={tourUpCR?.note_attack}
            onChange={(e) => updateTour({ note_attack: e.currentTarget.value })}
          />
        </div>
        <div className="item-info">
          <label>Thành phố:</label>
          <div className="search">
            <input
              value={city}
              onChange={(e) => setCity(e.currentTarget.value)}
              onFocus={() => setShowListCity(true)}
              onBlur={() => {
                setTimeout(() => {
                  setShowListCity(false)
                }, 500)
              }}
            />
            <ul>{showListCity && optionCity}</ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoTour
