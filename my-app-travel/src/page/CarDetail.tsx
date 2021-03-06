import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { book } from '../utils/bookTour'
import { addNum } from './components/Order/orderSlice'
import DatePicker from 'react-date-picker'
import {
  fetchCarById,
  clearCar,
  postRateCar
} from './components/Car/carSlice'
import './style/carDetail.scss'
import Share from '../components/Share/Share'
import Rate from 'components/rate/Rate'
import parse from 'html-react-parser'
import socket from 'app/socket'
import CarRelation from './components/Car/CarRelation'
import { getListIdCarSeen, setListCarSeen } from 'utils/localStorage'
import CarSeen from './components/Car/CarSeen'
import Under from 'components/bottom/Under'
import Comment from '../components/comment/Comment'
const CarDetail = () => {
  const { carId } = useParams<{ carId: string }>()
  const [dateBook, setDateBook] = useState<Date>(new Date())
  const dispatch = useDispatch()
  const car = useSelector((state: RootState) => state.car.car)
  const [listIdSeen, setListIdSeen] = useState<number[]>([])
  useEffect(() => {
    dispatch(fetchCarById(parseInt(carId)))
    return function () {
      dispatch(clearCar())
    }
  }, [dispatch, carId])

  useEffect(() => {
    if (carId) socket.emit('join-room', `C${carId}`)
    setListCarSeen(carId)
    setListIdSeen(getListIdCarSeen())
    return () => {
      socket.emit('leave-room', `C${carId}`)
    }
  }, [carId])
  const bookCar = () => {
    const result = book({
      item_id: 'C' + car?.id,
      order_date: `${
        dateBook.getDate() > 9 ? dateBook.getDate() : '0' + dateBook.getDate()
      }-${
        dateBook.getMonth() > 9
          ? dateBook.getMonth()
          : '0' + dateBook.getMonth()
      }-${dateBook.getFullYear()}`,
      img: car ? car.src : '',
      count: car?.price || 0,
      title: car ? car.title : '',
    })
    if (result) dispatch(addNum())
  }
  const rateCarCurrent = (rate: number) => {
    if (car) {
      const [rateCurrent, count] = car.rate.split('-')
      const newRate = `${(
        (parseFloat(rateCurrent) * parseInt(count) + rate) /
        (parseInt(count) + 1)
      ).toFixed(2)}-${parseInt(count) + 1}`
      dispatch(postRateCar(car.id, rate, newRate))
    }
  }
  return (
    <div className="car-detail">
      {car && (
        <>
          <div className="car-detail-title">
            <h1>{car.title}</h1>
            <p>
              ????nh gi??:{' '}
              <Rate
                value={parseFloat(car.rate.split('-')[0])}
                change={rateCarCurrent}
              />
              {car.rate.split('-')[0]}/5 Trong s??? {car.rate.split('-')[1]} ????nh
              gi??.
            </p>
            <Share />
          </div>
          <div className="img-info">
            <div className="img">
              <img src={car.src} alt={car.title} />
            </div>
            <div className="info">
              <section>
                {car.content
                  ? car.content.slice(0, 500)
                  : `D???ch v??? thu?? xe du l???ch, thu?? xe Mercedes S450, thu?? xe d???ch v???
                c???a c??ng ty Du L???ch Vi???t ??ang ???????c nhi???u kh??ch h??ng l???a ch???n tin
                d??ng. D??n xe ?????i m???i hi???n ?????i t???i Du L???ch Vi???t ?????m b???o lu??n mang
                l???i s??? h??i l??ng cho qu?? kh??ch h??ng thu?? xe.`}
              </section>
              <div className="info-detail">
                <div className="label">
                  <span>
                    <i className="fas fa-car"></i>H??ng xe
                  </span>
                  <span>
                    <i className="fas fa-car"></i>S??? ch???
                  </span>
                  <span>
                    <i className="fas fa-car"></i>?????i xe
                  </span>
                  <span>
                    <i className="fas fa-car"></i>M??u xe
                  </span>
                  <span>
                    <i className="fas fa-car"></i>Gi?? t???
                  </span>
                </div>
                <div className="value">
                  <span>{car.brand}</span>
                  <span>{car.cartype}</span>
                  <span>{car.vehiclelife}</span>
                  <span>??en v?? tr???ng</span>
                  <span>5000000 VND</span>
                </div>
                <div className="book-car">
                  <DatePicker
                    value={dateBook}
                    onChange={(e) => setDateBook(Array.isArray(e) ? e[0] : e)}
                    minDate={new Date()}
                  />
                </div>
                <button onClick={bookCar}>LI??N H???</button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="ck-content">{parse(car?.content || '')}</div>
      <Under />
      <Comment id={`C${carId}`} />
      <Under />
      <CarRelation carId={carId} />
      <Under />
      <CarSeen listId={listIdSeen} />
    </div>
  )
}

export default CarDetail
