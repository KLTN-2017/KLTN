import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UploadImg from '../../components/UploadImg'
import { AutoComplete } from 'antd'
import {
  fetchListNumberSitCar,
  fetchListTypeCar,
  fetchListYearCar,
  clearListNumberSit,
  clearListTypeCar,
  clearListYear,
  selectOptionNumberSitCar,
  selectOptionTypeCar,
  selectOptionYearCar,
} from './carSlice'
import { Button } from 'antd'
import { createCar } from '../../api/carResApi/car'
import Ckeditor from '../../components/Ckeditor'
const CreateCar = () => {
  const [src, setImg] = useState<string>('')
  const [refImg, setRefImg] = useState<File | null>(null)
  const [brand, setBrand] = useState<string>('')
  const [cartype, setCartype] = useState<string>('')
  const [vehiclelife, setVehiclelife] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchListNumberSitCar())
    dispatch(fetchListTypeCar())
    dispatch(fetchListYearCar())
    return function () {
      dispatch(clearListNumberSit())
      dispatch(clearListTypeCar())
      dispatch(clearListYear())
    }
  }, [dispatch])
  const optionNumberSitCar = useSelector(selectOptionNumberSitCar)
  const optionTypeCar = useSelector(selectOptionTypeCar)
  const optionYearCar = useSelector(selectOptionYearCar)
  const createCarOk = async () => {
    await createCar({
      src,
      brand,
      cartype,
      content,
      title,
      vehiclelife,
    })
  }
  return (
    <div className="create-car">
      <h1>Tạo mới xe cho thêu</h1>
      <Button onClick={createCarOk} type="primary">
        Submit
      </Button>
      <div className="img-info-car">
        <div className="upload-img">
          <UploadImg
            img={src}
            setImg={setImg}
            fileRef={refImg}
            setFile={setRefImg}
            bucketName='car'
          />
        </div>
        <div className="info-car">
          <AutoComplete
            style={{ width: 400 }}
            options={optionTypeCar}
            placeholder="Hãng xe...."
            onChange={(e) => setBrand(e)}
          />
          <AutoComplete
            style={{ width: 400 }}
            options={optionNumberSitCar}
            placeholder="Số chỗ..."
            onChange={(e) => setCartype(e)}
          />
          <AutoComplete
            style={{ width: 400 }}
            options={optionYearCar}
            placeholder="Năm sản xuất..."
            onChange={(e) => setVehiclelife(e)}
          />
          <textarea
            placeholder="Tiêu đề..."
            rows={4}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
        </div>
      </div>
      <Ckeditor content={content} change={setContent} />
    </div>
  )
}

export default CreateCar
