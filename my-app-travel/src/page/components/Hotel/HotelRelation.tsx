import { RootState } from 'app/rootReducer'
import Star from 'components/star/star'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import useSettingSlide from 'useHook/useSettingSlide'
import { clearRelation, fetchRelationlById } from './hotelSlice'
interface Props {
    hotelId: string
}
const HotelRelation = ({ hotelId }: Props) => {
    const dispatch = useDispatch()
      const status = useSelector(
        (state: RootState) => state.hotel.relation.status
      )

    useEffect(() => {
      if(hotelId)dispatch(fetchRelationlById(parseInt(hotelId)))
      return function () {
        dispatch(clearRelation())
      }
    }, [dispatch, hotelId])
    const dataRelation = useSelector(
      (state: RootState) => state.hotel.relation.data
    )
        
        const settings =useSettingSlide()
    const htmlData =
      dataRelation.length === 0 ? (
        <h1>NoData</h1>
      ) : (
        <Slider {...settings}>
          {dataRelation.map((value, index) => (
            <div key={index} className="item-hotel">
              <Link to={`/khach-san/${value.id}`}>
                <img src={value.img} alt={value.title} />
                <div className="content">
                  <p>{value.title}</p>
                  <p>
                    <Star star={parseInt(value.star)} />
                    <i className="fas fa-map-marker-alt"></i>
                    {value.location}
                  </p>
                  <p>
                    <i className="fas fa-dollar-sign"></i>
                    {value.pirce}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      )
    return (
      <div className="hotel-relation">
        <h2>Danh sách khách sạn liên quan: </h2>
        <div className="list-hotel-relation">
          {status === 'loading' ? <h1>Loading .....</h1> : htmlData}
        </div>
      </div>
    )
}

export default HotelRelation