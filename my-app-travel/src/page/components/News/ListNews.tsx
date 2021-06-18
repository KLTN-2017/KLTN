import { RootState } from 'app/rootReducer'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPageNews, clearListNews} from './newsSlice'
import PageNation from '../../../components/PageNation/PageNation'
import { Link } from 'react-router-dom'
import RateStatic from '../../../components/rate/RateStatic'
import ReactLoading from 'react-loading'
import Nodata from 'components/Nodata/Nodata'
const ListNews = () => {
  const dispatch = useDispatch()
  const { listData, loading } = useSelector((state: RootState) => state.news)
  const [page, setPage] = useState<number>(1)
  useEffect(() => {
    dispatch(fetchPageNews(page))
    return function () {
      dispatch(clearListNews())
    }
  }, [dispatch, page])
  const html = listData.rows.map((news) => (
    <Link to={`/tin-tuc/${news.id}`}>
      <div className="news-items" key={news.id}>
        <div className="img">
          <img src={news.img} alt={news.title} />
          <div className="rate">
            <RateStatic value={news.rate ? parseFloat(news.rate.split('-')[0]) : 5 }/>
          </div> 
        </div>
        <div className="info">
          <p className="title">{news.title}</p>
          <hr className="under-line" />
          <div className="detail">
            <p>
              <i className="fas fa-map-marker-alt"></i>
              {news.location}
            </p>
            <p>
              <i className="fas fa-eye"></i>
              {news.view}
            </p>
            <p>
              <i className="fas fa-calendar-week"></i>
              {news.createdat}
            </p>
          </div>
        </div>
      </div>
    </Link>
  ))
  return (
    <div className="list-news">
      <h1>Danh sách tin</h1>
      <div className="list-items">
        {listData.rows.length > 0 ? (
          html
        ) : loading === false ? (
          <Nodata alert="Không thể tải tin tức "/>
        ) : (
          <ReactLoading type="spin" color="blue" height={100} width={75} />
        )}
      </div>
      <PageNation
        total={listData.count}
        current={page}
        change={setPage}
        size={9}
      />
    </div>
  )
}

export default ListNews
