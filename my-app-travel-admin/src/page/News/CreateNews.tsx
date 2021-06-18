import React, { useState } from 'react'
import Ckeditor from '../../components/Ckeditor'
import { notification } from 'antd'
import { createNews } from '../../api/news/index'
import UploadImg from '../../components/UploadImg'
import { setloading } from 'app/rootSlice'
import { useDispatch } from 'react-redux'
import { handleError } from '../../utils/handleError'
const CreateNews = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState<string>('')
  const [img, setImg] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [refImg, setRefImage] = useState<File | null>(null)
  const create = async () => {
    try {
      if (title && img && content && location) {
        dispatch(setloading(true))
        await createNews({ title, img, content, location })
        dispatch(setloading(false))
        notification.success({
          message: `Tạo thành công tin ${title}`,
        })
        setImg('')
        setTitle('')
        setContent('')
        setLocation('')
      } else
        notification.warn({
          message: 'Bạn cần điền đầy đủ thông tin',
        })
    } catch (error) {
      dispatch(setloading(false))
      handleError(error)
    }
  }
  return (
    <div className="add-news">
      <h1>Hãy giới thiệu những cảnh đẹp của bạn cho chúng tôi</h1>
      <button onClick={() => create()}>Submit</button>
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

export default CreateNews
