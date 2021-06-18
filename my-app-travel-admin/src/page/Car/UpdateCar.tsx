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
  fetchCarById,
  clearCar,
} from './carSlice'
import { useParams } from 'react-router-dom'
import { Button } from 'antd'
import { updateCar } from '../../api/carResApi/car'
import Ckeditor from '../../components/Ckeditor'
import { RootState } from 'app/rootReducer'
const CreateCar = () => {
  const { carId } = useParams<{ carId: string }>()
  const [src, setImg] = useState<string>('')
  const [refImg, setRefImg] = useState<File | null>(null)
  const [brand, setBrand] = useState<string>('')
  const [cartype, setCartype] = useState<string>('')
  const [vehiclelife, setVehiclelife] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const car = useSelector((state: RootState) => state.car.car)
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
  useEffect(() => {
    if (carId) dispatch(fetchCarById(parseInt(carId)))
    return function () {
      dispatch(clearCar())
    }
  }, [dispatch, carId])

  useEffect(() => {
    if (car) {
      setImg(car.src)
      setBrand(car.brand)
      setCartype(car.cartype)
      setContent(car.content)
      setTitle(car.title)
      setVehiclelife(car.vehiclelife)
    }
  }, [car])
  const optionNumberSitCar = useSelector(selectOptionNumberSitCar)
  const optionTypeCar = useSelector(selectOptionTypeCar)
  const optionYearCar = useSelector(selectOptionYearCar)
  const updateCarOk = async () => {
    if (car)
      await updateCar(car.id, {
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
      <h1>Cập nhật xe</h1>
      <Button onClick={updateCarOk} type="primary">
        Update
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
            value={brand}
            style={{ width: 400 }}
            options={optionTypeCar}
            placeholder="Hãng xe...."
            onChange={(e) => setBrand(e)}
          />
          <AutoComplete
            value={cartype}
            style={{ width: 400 }}
            options={optionNumberSitCar}
            placeholder="Số chỗ..."
            onChange={(e) => setCartype(e)}
          />
          <AutoComplete
            value={vehiclelife}
            style={{ width: 400 }}
            options={optionYearCar}
            placeholder="Năm sản xuất..."
            onChange={(e) => setVehiclelife(e)}
          />
          <textarea
            placeholder="Tiêu đề..."
            rows={4}
            value={car?.title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
        </div>
      </div>
      <Ckeditor content={content ? content : ''} change={setContent} />
    </div>
  )
}

export default CreateCar
