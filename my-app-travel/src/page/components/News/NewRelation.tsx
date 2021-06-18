import { RootState } from 'app/rootReducer'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ReactLoading from 'react-loading'
import { fetchRelationNews, clearNewsRelation } from './newsSlice'
import Nodata from 'components/Nodata/Nodata'
import RateStatic from 'components/rate/RateStatic'
import useSettingSlice from 'useHook/useSettingSlide'
import Slider from 'react-slick'
const RealtionNews = () => {
  const { newsId } = useParams<{ newsId: string }>()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRelationNews(parseInt(newsId)))
    return () => {
      dispatch(clearNewsRelation())
    }
  }, [dispatch, newsId])
  const listRelation = useSelector(
    (state: RootState) => state.news.newsRelation
  )
  const settings = useSettingSlice()
  const htmlData = (
    <Slider {...settings}>
      {listRelation.data.map((news) => (
        <Link to={`/tin-tuc/${news.id}`}>
          <div className="news-items" key={news.id}>
            <div className="img">
              <img src={news.img} alt={news.title} />
              <div className="rate">
                <RateStatic
                  value={news.rate ? parseFloat(news.rate.split('-')[0]) : 5}
                />
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
      ))}
    </Slider>
  )

  return (
    <div className="realtion-news">
      <h2>Danh sách tin mới:</h2>
      {listRelation.loading && (
        <div className="loading-tour">
          <ReactLoading type="spin" color="blue" height={100} width={75} />
        </div>
      )}
      {listRelation.loading === false && listRelation.data.length === 0 && (
        <Nodata alert="Không tìm thấy tin " />
      )}
      {listRelation.data.length > 0 && (
        <div className="list-items">{htmlData}</div>
      )}
    </div>
  )
}

export default RealtionNews
