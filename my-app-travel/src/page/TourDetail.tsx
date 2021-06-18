import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTourById,
  fetchRelationTourById,
  clearTour,
  postRateTour
} from './components/Tour/TourSlice'
import { RootState } from 'app/rootReducer'
import Info from './components/tourDetail/Info'
import './style/tourDetail.scss'
import Share from '../components/Share/Share'
import Rate from 'components/rate/Rate'
import parse from 'html-react-parser'
import socket from 'app/socket'
import TourRelation from './components/tourDetail/TourRelation'
import WeatherCity from './components/tourDetail/WeatherCity'
import Under from '../components/bottom/Under'
import { getListIdTourSeen, setListTourSeen } from 'utils/localStorage'
import TourSeen from './components/tourDetail/TourSeen'
import { toast } from 'react-toastify'
import Comment from '../components/comment/Comment'
const TourDetail = () => {
  const [listTourIdSeen, setListIdTourSeen] = useState<number[]>([])
  const { tourId } = useParams<{ tourId: string }>()
  const dispatch = useDispatch()
  const tour = useSelector((state: RootState) => state.tour.tour)
  const tourRelation = useSelector(
    (state: RootState) => state.tour.relation.data
  )
  useEffect(() => {
    dispatch(fetchTourById(parseInt(tourId)))
    dispatch(fetchRelationTourById(parseInt(tourId)))
    return function () {
      dispatch(clearTour())
    }
  }, [dispatch, tourId])

  useEffect(() => {
    setListTourSeen(tourId)
    setListIdTourSeen(getListIdTourSeen())

    if (tourId) socket.emit('join-room', `T${tourId}`)

    return () => {
      socket.emit('leave-room', `T${tourId}`)
    }
  }, [tourId])


  const html = !tour ? (
    'Not data'
  ) : (
    <>
      <div className="editor">
        <img src={tour.img} alt={tour.title} />
      </div>
      <Info data={tour} />
    </>
    )
  const rateCarCurrent = (rate: number) => {
    if (tour) {
      const [rateCurrent, count] = tour.rate.split('-')
      const newRate = `${(
        (parseFloat(rateCurrent) * parseInt(count) + rate) /
        (parseInt(count) + 1)
      ).toFixed(2)}-${parseInt(count) + 1}`
      dispatch(postRateTour(tour.id, rate, newRate))
    }
  }
  return (
    <div className="body-tour-detail">
      <h1>{tour && tour.title}</h1>
      {tour && (
        <>
          <p>
            Đánh giá:{' '}
            <Rate
              value={parseFloat(tour.rate.split('-')[0])}
              change={rateCarCurrent}
            />
            {tour.rate.split('-')[0]}/5 Trong số {tour.rate.split('-')[1]} Đánh
            giá.
          </p>
          <Share />
          <div className="tour-detail">{html}</div>
        </>
      )}
      <div className="ck-content">{parse(tour?.content || '')}</div>
      <Under />
      <Comment id={`T${tourId}`} />
      <Under />
      <WeatherCity city={tour?.city || ''} />
      <Under />
      <div className="tour-relation">
        <h1>Danh sách tour liên quan</h1>
        <TourRelation tourRelation={tourRelation} />
      </div>
      <Under />
      {listTourIdSeen.length > 0 && (
        <div className="tour-relation">
          <h1>Danh sách tour đã xem</h1>
          <TourSeen listTourId={listTourIdSeen} />
        </div>
      )}
    </div>
  )
}

export default TourDetail
