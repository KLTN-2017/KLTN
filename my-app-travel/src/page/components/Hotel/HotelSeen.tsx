import { getCarByListId } from 'api/carResApi/car'
import { Car } from 'api/interface/car'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import useSettingSlide from 'useHook/useSettingSlide'
import { handleError } from 'utils/handleError'
interface Props {
  listId: number[]
}
const HotelSeen = ({ listId }: Props) => {
  const [data, setData] = useState<Car[]>([])
  useEffect(() => {
    async function getCarListId() {
      try {
        const listCar = await getCarByListId(listId)
        setData(listCar)
      } catch (error) {
        handleError(error)
      }
    }
    if (listId.length > 0) getCarListId()
  }, [listId])
  const html = data?.map((value, index) => (
    <div
      key={index}
      className={data.length < 3 ? 'item-car' : 'item-car-realation'}
      title={value.title}
    >
      <Link to={`/theu-xe/${value.id}`}>
        <div className="img-car">
          <p className="contact">{value.price.toLocaleString()} VND</p>
          <img src={value.src} alt={value.title} />
        </div>
        <div className="info-car">
          <h3>{value.title.toUpperCase().slice(0, 33)}...</h3>
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
  const settings = useSettingSlide()
    const slide = <Slider {...settings}> {html}</Slider>
    const showHtml = (
      <>
        {data.length >= 3 ? (
          <div className="car-relation">
            <h2>Danh sách xe đã xem</h2>
            <div className="list-car-relation">{slide}</div>
          </div>
        ) : (
          <>
            {' '}
            <h2>Danh sách xe đã xem</h2>
            <div className="list-car">{html}</div>
          </>
        )}
      </>
    )
  return (
    <>
      {showHtml}
    </>
  )
}
export default HotelSeen
