import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { clearRelationData, fetchListCarRelation } from './carSlice'
import { RootState } from 'app/rootReducer'
import Slider from 'react-slick'
import useSettingSlice from 'useHook/useSettingSlide'
interface Props {
    carId: string
}

const CarRelation = ({ carId }: Props) => {
    const dispatch = useDispatch()
    const status = useSelector(
      (state: RootState) => state.car.dataRelation.status
    )
    useEffect(() => {
    if(carId) dispatch(fetchListCarRelation(parseInt(carId)))
    return function () {
      dispatch(clearRelationData())
    }
    }, [dispatch, carId])

    const relationCar = useSelector(
    (state: RootState) => state.car.dataRelation.data
  )
    const dataCarRelation = relationCar?.map((value, index) => (
    <div key={index} className="item-car-realation" title={value.title}>
      <Link to={`/theu-xe/${value.id}`}>
        <div className="img-car">
          <p className="contact">{value.price.toLocaleString()}</p>
          <img src={value.src} alt={value.title} />
        </div>
        <div className="info-car">
          <h3>{value.title.toUpperCase().slice(0, 35)}...</h3>
          <hr />
          <div className="info-car-detail">
            <span>
              <i className="fas fa-user-friends"></i>
              {value.cartype}
            </span>
            <span>
              <i className="fas fa-car"></i>
              {value.brand.slice(0, 7)}
            </span>
            <span>
              <i className="far fa-calendar-alt"></i>
              {value.vehiclelife}
            </span>
            <span>Xem chi tiết</span>
          </div>
        </div>
      </Link>
    </div>
    ))
    const settings = useSettingSlice()
    const htmlData =
    status === 'loading' ? (
      <h1>Loading ....</h1>
        ) : status === 'success' ? (
                <Slider {...settings}>{dataCarRelation}</Slider>
      
    ) : (
      <h1>No data</h1>
    )
    return (
      <div className="car-relation">
        <h2>Danh sách xe liên quan: </h2>
        <div className="list-car-relation">{htmlData}</div>
      </div>
    )
}

export default CarRelation