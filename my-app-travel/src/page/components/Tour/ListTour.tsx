import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'
import { clearListTour, fetchPageTourFilter, setPage } from './TourSlice'
import { RootState } from 'app/rootReducer'
import PageNation from '../../../components/PageNation/PageNation'
import { Tour } from '../../../api/interface/tour'
import './listTour.scss'
import Nodata from 'components/Nodata/Nodata'
import LazyLoad from 'react-lazyload'
import RateStatic from 'components/rate/RateStatic'

const ListTour = () => {
  const { page, data, count, filter, loading } = useSelector((state: RootState) => state.tour)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPageTourFilter(page, filter))
    return function () {
      dispatch(clearListTour())
    }
  }, [dispatch, page, filter])
  const htmlData =
    data.length > 0 ? (
      data.map((value: Tour, index: number) => (
        <Link to={`/du-lich/${value.id}`}>
          <div key={index} className="tour" title={value.title}>
            <div className="img-location">
              <LazyLoad height={300}>
                <img
                  className="img"
                  src={value.img}
                  alt={value.title}
                  loading="lazy"
                />
              </LazyLoad>
              <p className="location">{value.map_maker}</p>
            </div>
            <div className="content">
              <p className="title-tour">{value.title.slice(0, 50)}...</p>
              <p className="note">
                <i className="far fa-bell"></i>
                {value.note_attack}
              </p>
              <div className="wrapp">
                <div>
                  <p>
                    <i className="far fa-calendar-alt"></i>
                    {value.date_start}
                  </p>
                  <p>
                    <i className="far fa-clock"></i>
                    {value.date_range}
                  </p>
                </div>
                <div>
                  <p>
                    <i className="fas fa-user-friends"></i>
                    {value.number_sit}
                  </p>
                  <p>
                    <i className="fas fa-dollar-sign"></i>
                    {value.price}
                  </p>
                </div>
              </div>
            </div>
            <div className="rate">
              <RateStatic value={parseInt(value.rate.split('-')[0])} />
            </div>
          </div>
        </Link>
      ))
    ) : loading === false && count === 0 ? (
      <Nodata alert="Không thể tải Tour" />
    ) : (
      <div className="loading-tour">
        <ReactLoading type="spin" color="blue" height={100} width={75} />
      </div>
    )
  return (
    <div className="list-tour">
      {htmlData}
      {count > 0 && (
        <div className="pagination">
          <PageNation
            current={page}
            total={count}
            change={(page: number) => dispatch(setPage(page))}
          />
        </div>
      )}
      
    </div>
  )
}
export default ListTour
