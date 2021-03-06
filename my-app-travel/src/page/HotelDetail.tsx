import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { book } from '../utils/bookTour'
import { addNum } from './components/Order/orderSlice'
import { fetchHotelById, clearHotel } from './components/Hotel/hotelSlice'
import DatePicker from 'react-date-picker'
import './style/hotelDetail.scss'
import Share from '../components/Share/Share'
import Rate from 'components/rate/Rate'
import { postRateHotel } from './components/Hotel/hotelSlice'
import parse from 'html-react-parser'
import socket from 'app/socket'
import HotelRelation from './components/Hotel/HotelRelation'
import { setListHotelSeen } from 'utils/localStorage'
import Comment from '../components/comment/Comment'
const CarDetail = () => {
  const { hotelId } = useParams<{ hotelId: string }>()
  const dispatch = useDispatch()
  const hotel = useSelector((state: RootState) => state.hotel.hotel)
  const [dateBook, setDateBook] = useState<Date>(new Date())
  useEffect(() => {
    dispatch(fetchHotelById(parseInt(hotelId)))
    return function () {
      dispatch(clearHotel())
    }
  }, [dispatch, hotelId])
  useEffect(() => {
    setListHotelSeen(hotelId)
    if (hotelId) socket.emit('join-room', `H${hotelId}`)
    return () => {
      socket.emit('leave-room', `H${hotelId}`)
    }
  }, [hotelId])

  const bookHotel = useCallback(() => {
    const result = book({
      item_id: 'H' + hotel?.id,
      order_date: `${
        dateBook.getDate() > 9 ? dateBook.getDate() : '0' + dateBook.getDate()
      }-${
        dateBook.getMonth() > 9
          ? dateBook.getMonth()
          : '0' + dateBook.getMonth()
      }-${dateBook.getFullYear()}`,
      img: hotel ? hotel.img : '',
      count: hotel ? parseInt(hotel?.pirce) : 0,
      title: hotel ? hotel.title : '',
    })
    if (result) dispatch(addNum())
  }, [hotel, dateBook, dispatch])

  const rateHotelCurrent = (rate: number) => {
    if (hotel) {
      const [rateCurrent, count] = hotel.rate.split('-')
      const newRate = `${(
        (parseFloat(rateCurrent) * parseInt(count) + rate) /
        (parseInt(count) + 1)
      ).toFixed(2)}-${parseInt(count) + 1}`
      dispatch(postRateHotel(hotel.id, rate, newRate))
    }
  }
  return (
    <div className="hotel-detail">
      {hotel && (
        <>
          <div className="hotel-detail-title">
            <h1>{hotel.title}</h1>
            <p>
              ????nh gi??:
              <Rate
                value={parseFloat(hotel.rate.split('-')[0])}
                change={rateHotelCurrent}
              />
              {hotel.rate.split('-')[0]}/5 Trong s??? {hotel.rate.split('-')[1]}{' '}
              ????nh gi??.
            </p>
            <Share />
          </div>
          <div className="img-info">
            <div className="img">
              <img src={hotel.img} alt={hotel.title} />
            </div>
            <div className="info">
              <section>
                D???ch v??? thu?? xe du l???ch, thu?? xe Mercedes S450, thu?? xe d???ch v???
                c???a c??ng ty Du L???ch Vi???t ??ang ???????c nhi???u kh??ch h??ng l???a ch???n tin
                d??ng. D??n xe ?????i m???i hi???n ?????i t???i Du L???ch Vi???t ?????m b???o lu??n mang
                l???i s??? h??i l??ng cho qu?? kh??ch h??ng thu?? xe.
              </section>
              <div className="info-detail">
                <div className="label">
                  <span>
                    <i className="fas fa-car"></i>?????a ??i???m
                  </span>
                  <span>
                    <i className="fas fa-car"></i>Gi??
                  </span>
                  <span>
                    <i className="fas fa-car"></i>Ch???t l?????ng
                  </span>
                </div>
                <div className="value">
                  <span>{hotel.location}</span>
                  <span>{hotel.pirce}</span>
                  <span>{hotel.star}</span>
                </div>
                <DatePicker
                  value={dateBook}
                  onChange={(e) => setDateBook(Array.isArray(e) ? e[0] : e)}
                  minDate={new Date()}
                />
                <button onClick={bookHotel}>LI??N H???</button>
              </div>
            </div>
          </div>
        </>
      )}
      <Comment id={`H${hotelId}`} />
      <div className="ck-content">{parse(hotel?.content || '')}</div>
      <HotelRelation hotelId={hotelId} />
    </div>
  )
}

export default CarDetail
