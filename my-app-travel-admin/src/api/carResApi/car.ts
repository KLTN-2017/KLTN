import { axiosApi } from '../axios'
import {
  ListCarFilter,
  CarDetail,
  TypeCar,
  YearCar,
  NumberSitCar,
  CarCreate,
} from '../interface/car'
import { notification } from 'antd'

export const getCarById = async (id: number): Promise<CarDetail> => {
  const { data } = await axiosApi.get(`/api-car/car/${id}`)
  return data
}

export const deleteCarById = async (
  id: number
): Promise<{ success: string }> => {
  const { data } = await axiosApi.delete(`/api-car/car/${id}`)
  return data
}

export const getListTypeCar = async (): Promise<TypeCar[]> => {
  const { data } = await axiosApi.get(`/api-car/car-type`)
  return data
}

export const getListNumberSitCar = async (): Promise<NumberSitCar[]> => {
  const { data } = await axiosApi.get(`/api-car/car-numbersit`)
  return data
}

export const getListYearCar = async (): Promise<YearCar[]> => {
  const { data } = await axiosApi.get(`/api-car/car-year`)
  return data
}
export const getListFiterCar = async (
  filter: {
    vehiclelife: string | undefined
    brand: string | undefined
    cartype: string | undefined
  },
  page: number
): Promise<ListCarFilter> => {
  const { data } = await axiosApi.get(
    `/api-car/car-filter/${page}?vehiclelife=${filter.vehiclelife}&brand=${filter.brand}&cartype=${filter.cartype}`
  )
  return data
}

export const createCar = async (car: CarCreate): Promise<void> => {
  try {
    console.log(car)
    if (
      !car.brand &&
      car.cartype &&
      car.content &&
      car.title &&
      car.vehiclelife &&
      car.src
    )
      notification.warn({
        message: 'Bạn cần đầy đủ thông tin',
      })
    else if (!parseInt(car.cartype) && parseInt(car.vehiclelife))
      notification.warn({
        message: 'Giá trị số chỗ và năm sản xuất phải là số',
      })
    else {
      await axiosApi.post(`/api-car/car`, car)
      notification.success({
        message: 'Tạo thành công xe',
        description: car.title,
      })
    }
  } catch (error) {
    notification.error({
      message: 'Lỗi tạo xe',
      description: car.title,
    })
    console.log(error)
  }
}

export const updateCar = async (id: string, car: CarCreate): Promise<void> => {
  try {
    console.log(car)
    if (
      !car.brand &&
      car.cartype &&
      car.content &&
      car.title &&
      car.vehiclelife &&
      car.src
    )
      notification.warn({
        message: 'Bạn cần đầy đủ thông tin',
      })
    else if (!parseInt(car.cartype) && parseInt(car.vehiclelife))
      notification.warn({
        message: 'Giá trị số chỗ và năm sản xuất phải là số',
      })
    else {
      await axiosApi.put(`/api-car/car/${id}`, car)
      notification.success({
        message: 'Cập nhật công xe',
        description: car.title,
      })
    }
  } catch (error) {
    notification.error({
      message: 'Lỗi cập nhật xe',
      description: car.title,
    })
    console.log(error)
  }
}
