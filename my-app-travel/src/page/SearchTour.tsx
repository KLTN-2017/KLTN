import React, { useEffect, useState } from 'react'
import Layout from '../layout/Main'
import { getTourByListId } from '../api/tourApi/index'
import { useSelector} from 'react-redux'
import { RootState } from 'app/rootReducer'
import { Tour } from 'api/interface/tour'
import { Link } from 'react-router-dom'
import Nodata from 'components/Nodata/Nodata'
import ReactLoading from 'react-loading'
import LazyLoad from 'react-lazyload'
import './style/searchTour.scss'
import RateStatic from 'components/rate/RateStatic'
const SearchTour = () => {
  const listSearch = useSelector((state: RootState) => state.tour.tourSearch)
  const [listId, setListId] = useState<Array<number>>([])
  const [listTour, setListTour] = useState<Tour[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const keySearch = useSelector((state: RootState) => state.tour.search)
  useEffect(() => {
    if(listSearch) setListId(listSearch.map( tour => parseInt(tour.id)))
  }, [listSearch])
  useEffect(() => {
    async function getData () {
      const listTour = await getTourByListId(listId)
      setListTour(listTour)
    }
    if (listId.length > 0) getData()
    setLoading(false)
  }, [listId])
  const htmlData =
    listTour.length > 0 ? (
      listTour.map((value: Tour, index: number) => (
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
              <RateStatic value={parseInt(value.rate.split('-')[0])}/>
            </div>
          </div>
        </Link>
      ))
    ) : loading === false && listTour.length === 0 ? (
      <Nodata alert="Không tìm thấy tour nào" />
    ) : (
      <div className="loading-tour">
        <ReactLoading type="spin" color="blue" height={100} width={75} />
      </div>
    )
  return (
    <Layout>
      <div className="search-result">
        <h1>Kết quả cho tìm kiếm tour: <span>{keySearch}</span></h1>
        <p>Tổng số kết quả:  {listTour.length}</p>
        <div className="list-tour">{htmlData}</div>
      </div>
    </Layout>
  )
}

export default SearchTour 
