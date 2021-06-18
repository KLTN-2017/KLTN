import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactLoading from 'react-loading'
import { RootState } from 'app/rootReducer'
import { fetchTourInterNational } from './tourInterNationalSlice'
import Slide from '../../../../components/slideCommon/index'
import './tourInterNational.css'
import Nodata from 'components/Nodata/Nodata'

const TourNational = () => {
  const dispatch = useDispatch()
  const dataTour = useSelector(
    (state: RootState) => state.tourInterNational
  )
  useEffect(() => {
    dispatch(fetchTourInterNational())
  }, [dispatch])
  return (
    <div className="tour-national">
      <h2 className="title">TOUR DU LỊCH NƯỚC NGOÀI</h2>
      {dataTour.data.length > 0 ? (
        <Slide data={dataTour.data} />
      ) : dataTour.loading === false ? (
        <Nodata alert="Không thể tải top tour trong nước" />
      ) : (
        <div className="loading">
          <ReactLoading type="spin" color="yellow" height={100} width={75} />
        </div>
      )}
    </div>
  )
}

export default TourNational
