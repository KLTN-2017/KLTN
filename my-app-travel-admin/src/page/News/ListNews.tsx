import { RootState } from 'app/rootReducer'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPageNews, clearListNews, deletNewsDb } from './newsSlice'
import confirm from 'react-alert-confirm'
import { Rate } from 'antd'
import PageNation from '../../components/PageNation/PageNation'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import LoadingComponent from '../../components/loading/Loading'
import { checkShowAction } from '../../utils/checkAction'
const ListNews = () => {
  const dispatch = useDispatch()
  const listData = useSelector((state: RootState) => state.news.listData)
  const [page, setPage] = useState<number>(1)
  useEffect(() => {
    dispatch(fetchPageNews(page))
    return function () {
      dispatch(clearListNews())
    }
  }, [dispatch, page])
  const confirmDeleteNews = (titles: string, id: number) => {
    confirm({
      title: `Bạn có chắc muốn xóa`,
      content: <p>{titles}</p>,
      okText: 'ok',
      cancelText: 'Cancel',
      onOk: () => dispatch(deletNewsDb(id, titles)),
    })
  }
  const html = listData.rows.map((news) => (
    <div className="news-items" key={news.id}>
      <img src={news.img} alt={news.title} />
      <div className="info">
        <p className="title">{news.title}</p>
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
        <p>
          <Rate allowHalf value={parseFloat(news.rate.split('-')[0])} />
        </p>
      </div>
      <div className="action">
        {checkShowAction('updateNews') && (
          <Link to={`/tin-tuc/update/${news.id}`}>
            <i className="fas fa-edit"></i>
          </Link>
        )}
        {checkShowAction('deleteNews') && (
          <i
            onClick={() => confirmDeleteNews(news.title, news.id)}
            className="fas fa-trash-alt"
          ></i>
        )}
      </div>
    </div>
  ))
  return (
    <div className="list-news">
      <h1>Danh sách tin</h1>
      <div className="new-news">
        {checkShowAction('createNews') && (
          <Link to="/tin-tuc/tao-tin">
            <PlusCircleOutlined
              style={{ fontSize: '50px', color: '#08c', cursor: 'pointer' }}
            />
          </Link>
        )}
      </div>
      <div className="list-items">
        {listData.rows.length > 0 ? (
          html
        ) : (
          <LoadingComponent title="Loading list news..." />
        )}
      </div>
      <PageNation
        total={listData.count}
        current={page}
        pagSize={9}
        change={setPage}
      />
    </div>
  )
}

export default ListNews
