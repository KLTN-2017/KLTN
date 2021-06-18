import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UploadImg from '../../components/UploadImg'
import { AutoComplete } from 'antd'
import {
  fetchListZoneHotel,
  clearZone,
  selectOptionZoneHotel,
} from './hotelSlice'
import { Button } from 'antd'
import Ckeditor from '../../components/Ckeditor'
import { createHotel } from '../../api/carResApi/hotel'
const CreateCar = () => {
  const [img, setImg] = useState<string>('')
  const [refImg, setRefImg] = useState<File | null>(null)
  const [pirce, setPirce] = useState<string>('')
  const [star, setStar] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchListZoneHotel())
    return function () {
      dispatch(clearZone())
    }
  }, [dispatch])
  const listZone = useSelector(selectOptionZoneHotel)

  const createHotelOk = async () => {
    await createHotel({
      img,
      pirce,
      content,
      title,
      star,
      location,
    })
  }
  return (
    <div className="create-car">
      <h1>Tạo mới khách sạn nhà nghỉ</h1>
      <Button onClick={createHotelOk} type="primary">
        Submit
      </Button>
      <div className="title-hotel">
        *
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề..."
        />
      </div>
      <div className="img-info-car">
        <div className="upload-img">
          <UploadImg
            img={img}
            setImg={setImg}
            fileRef={refImg}
            setFile={setRefImg}
            bucketName='hotel'
          />
        </div>
        <div className="info-car">
          <AutoComplete
            style={{ width: 400 }}
            options={listZone}
            placeholder="Vị trí"
            onChange={(e) => setLocation(e)}
          />
          <AutoComplete
            style={{ width: 400 }}
            placeholder="Chất lượng..."
            onChange={(e) => setStar(e)}
          />
          <AutoComplete
            style={{ width: 400 }}
            placeholder="Giá khách sạn..."
            onChange={(e) => setPirce(e)}
          />
        </div>
      </div>
      <Ckeditor content={content} change={setContent} />
    </div>
  )
}

export default CreateCar
