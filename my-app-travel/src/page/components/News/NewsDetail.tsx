import React, {useEffect, useState} from 'react'
import { useParams} from 'react-router-dom'
import { fetchNewsById, clearNews,rateNews } from './newsSlice'
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'app/rootReducer'
import parse from 'html-react-parser'
import RateStar from '../../../components/rate/Rate'
import Share from '../../../components/Share/Share'
import NewRelation from './NewRelation'
import socket from 'app/socket'
import Under from 'components/bottom/Under'
import Comment from '../../../components/comment/Comment'
const DetailNews = () => {
    const { newsId } = useParams<{ newsId: string }>()
    const [star, setStar] = useState<number>(0)
    const dispatch = useDispatch()
    const news = useSelector((state: RootState) => state.news.news)
    useEffect(() => {
      dispatch(fetchNewsById(parseInt(newsId)))
        return () => {
            dispatch(clearNews())
        }
    }, [dispatch, newsId])
  
  
    useEffect(() => {
        if(news)setStar(parseFloat(news.rate.split('-')[0]))
    }, [news])
  
  useEffect(() => {
    if (newsId) socket.emit('join-room', `N${newsId}`)
    return () => {
      socket.emit('leave-room', `N${newsId}`)
    }
  }, [newsId])
  
    const startDetail =
        `${news?.rate.split('-')[0]}/5 trong ${news?.rate.split('-')[1]} Đánh giá`
    const rateNewsCurrent = (rate: number) => {
        if (news) {
            const [rateCurrent, count] = news.rate.split('-')
            const newRate = `${
              ((parseFloat(rateCurrent) * parseInt(count) + rate) / (parseInt(count) + 1)).toFixed(2)
                }-${parseInt(count) + 1}`
            dispatch(rateNews(news.id, rate, newRate))
        }
    }
    return (
      <div className="detail-news">
        <h1>{news?.title}</h1>
        <div className="rate-user">
          {news && (
            <div>
              Đánh giá: <RateStar value={star} change={rateNewsCurrent} />{' '}
              {startDetail}
              <Share />
            </div>
          )}
        </div>
        {news && <img src={news.img} alt={news.title} />}
        <div className="ck-content">{parse(news ? news.content : '')}</div>
        <Under />
        <Comment id={`N${newsId}`} />
        <NewRelation />
      </div>
    )
}

export default DetailNews