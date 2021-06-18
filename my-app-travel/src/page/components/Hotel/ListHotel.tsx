import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from 'app/rootReducer'
import {
  fetchPageHotel,
  clearListHotel,
  setPage,
  clearStar,
  clearZone,
} from './hotelSlice'
import PageNation from '../../../components/PageNation/PageNation'
import Star from '../../../components/star/star'
import FiterHotel from './FilterHotel'
import { clearFilter } from '../Car/carSlice'
import Nodata from 'components/Nodata/Nodata'
const ListCar = () => {
  const dispatch = useDispatch()
  const { data, count, pageCurrent, filter, loading } = useSelector((state: RootState) => state.hotel)
  useEffect(() => {
    dispatch(fetchPageHotel(filter, pageCurrent))
    return function () {
      dispatch(clearListHotel())
    }
  }, [dispatch, pageCurrent, filter])
  useEffect(() => {
    return function () {
      dispatch(clearStar())
      dispatch(clearZone())
      dispatch(clearFilter())
    }
  }, [dispatch])

  const html = data?.map((value, index) => (
    <div key={index} className="item-hotel" title={value.title}>
      <Link to={`/khach-san/${value.id}`}>
        <div className="img-hotel">
          <img src={value.img} alt={value.title} />
        </div>
        <div className="info-hotel">
          <h3>{value.title.toUpperCase().slice(0, 25)}...</h3>
          <Star star={parseInt(value.star)} />
          <div className="info-hotel-detail">
            <span>
              <i className="fas fa-map-marker-alt"></i>
              {value.location}
            </span>

            <span>
              <i className="fas fa-dollar-sign"></i>
              {value.pirce}
            </span>
          </div>
        </div>
      </Link>
    </div>
  ))
  return (
    <>
      <h1> Danh sách khách sạn</h1>
      <img
        src="http://www.asiawebdirect.com/media/images/hotels/92934/663052.jpg"
        alt="logo-hotel"
      />
      <FiterHotel />
      <div className="list-hotel">
        {html}
        {count ? (
          <PageNation
            total={count}
            current={pageCurrent}
            change={(page: number) => {
              dispatch(setPage(page))
            }}
          />
        ) : ''}
        {(count === 0 && loading === false) && <Nodata alert="Không tìm thấy khách sạn"/>}
      </div>
    </>
  )
}

export default ListCar
