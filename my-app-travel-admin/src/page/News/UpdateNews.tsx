import React, { useState, useEffect } from 'react'
import Ckeditor from '../../components/Ckeditor'
import { notification } from 'antd'
import UploadImg from '../../components/UploadImg'
import { updateNews } from '../../api/news/index'
import { fetchNewsById } from './newsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from 'app/rootReducer'
import { setloading } from 'app/rootSlice'
import { handleError } from '../../utils/handleError'

const UpdateNews = () => {
  const { newsId } = useParams<{ newsId: string }>()
  console.log(newsId)
  const dispatch = useDispatch()
  const [title, setTitle] = useState<string>('')
  const [img, setImg] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [refImg, setRefImage] = useState<File | null>(null)
  const news = useSelector((state: RootState) => state.news.news)
  useEffect(() => {
    dispatch(fetchNewsById(parseInt(newsId)))
  }, [dispatch, newsId])
  useEffect(() => {
    if (news) {
      setTitle(news.title)
      setImg(news.img)
      setContent(news.content)
      setLocation(news.location)
    }
  }, [news])
  const resetNews = () => {
    if (news) {
      setTitle(news.title)
      setImg(news.img)
      setContent(news.content)
      setLocation(news.location)
      setRefImage(null)
    }
  }
  const updateNewsById = async () => {
    try {
      if (content && title && img && location && news) {
        dispatch(setloading(true))
        await updateNews(news.id, { title, content, location, img })
        dispatch(setloading(false))
        notification.success({
          message: 'Cập nhật thành công',
          description: title,
        })
      } else
        notification.warn({
          message: 'Bạn chưa điền đầy đủ thông tin',
        })
    } catch (error) {
      dispatch(setloading(false))
      handleError(error)
    }
  }

  return (
    <div className="add-news">
      <h1>Hãy giới thiệu những cảnh đẹp của bạn cho chúng tôi</h1>
      <button onClick={updateNewsById}>Submit</button>
      <button onClick={resetNews}>Reset</button>
      <div className="title">
        *
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Tiêu đề"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="img">
        Ảnh:
        <UploadImg
          img={img}
          setImg={setImg}
          fileRef={refImg}
          setFile={setRefImage}
          bucketName='news'
        />
      </div>
      <div className="location">
        *
        <input
          type="text"
          name="location"
          value={location}
          placeholder="Vị trí khu vực..."
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="detail-news">
        Mô tả chi tiết:
        <Ckeditor content={content} change={setContent} />
      </div>
    </div>
  )
}

export default UpdateNews
