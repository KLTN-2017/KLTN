import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactLoading from 'react-loading'
import { RootState } from 'app/rootReducer'
import { fetchTopTour } from './topTourSlice'
import Slide from '../../../../components/slideCommon/index'
import './topTour.css'
import Nodata from 'components/Nodata/Nodata'
const TopTour = () => {
  const dispatch = useDispatch()
  const dataTour = useSelector((state: RootState) => state.topTour)
  useEffect(() => {
    dispatch(fetchTopTour())
  }, [dispatch])
  return (
    <div className="top-tour">
      <h2 className="title">TOP TOUR DU LỊCH NỔI BẬT</h2>
      {dataTour.data.length > 0 ? (
        <Slide data={dataTour.data} />
      ) : dataTour.loading === false ? (
        <Nodata alert="Lỗi tải top tour du lịch"/>
      ) : (
        <div className="loading">
          <ReactLoading type="spin" color="blue" height={100} width={75} />
        </div>
      )}
    </div>
  )
}

export default TopTour
