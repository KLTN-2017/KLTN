import { handleError } from './../../utils/handleError';
import { axiosApi } from '../axios'
import {
  TourDetail,
  ListDataStatic,
  Zone,
  TourFilterData,
  ListTourFilter,
  Tour,
} from '../interface/tour'
import { notification } from 'antd'
export const getTourById = async (id: number): Promise<TourDetail> => {
  try {
    const { data } = await axiosApi.get(`api-tour/tour/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

export const getAllDataFilter = async (): Promise<ListDataStatic> => {
  try {
    const { data } = await axiosApi.get('api-tour/tour-data-filter')
    return data
  } catch (error) {
    throw error
  }
}

export const getAllZoneByType = async (type: string): Promise<Zone[]> => {
  try {
    const { data } = await axiosApi.get(`api-tour/tour-type/${type}`)
    return data
  } catch (error) {
    throw error
  }
}

export const getPageTourFilter = async (
  page: number,
  filter: TourFilterData
): Promise<ListTourFilter> => {
  try {
    const { data } = await axiosApi.post(
      `api-tour/tours-filter/${page}`,
      filter
    )
    return data
  } catch (error) {
    throw error
  }
}

export const deleteTourById = async (
  id: number
): Promise<void> => {
  try {
    const { data } = await axiosApi.put(`api-tour/tour/${id}`, { is_delete: 1 })
    return data
  } catch (error) {
    handleError(error)
  }
}

export const UpdateTourById = async (
  id: string,
  tour: TourDetail,
  callback: (loading: boolean) => void
): Promise<void> => {
  try {
    callback(true)
    await axiosApi.put(`api-tour/tour/${id}`, tour)
    notification.success({
      message: 'Cập nhật thành công tour',
      description: tour.title,
    })
    callback(false)
  } catch (error) {
    callback(false)
   handleError(error)
  }
}

export const createTour = async (
  tour: TourDetail,
  callback: (loading: boolean) => void
): Promise<void> => {
  try {
    if (Object.values(tour).some(value => (value === '')) || Object.values(tour).length < 7) notification.warn({ message: 'Bạn cần nhập đủ thông tin' })
    else {
      callback(true)
    await axiosApi.post(`api-tour/tour`, tour)
    notification.success({
      message: 'Tạo thành công tour',
      description: tour.title,
    })
    callback(false)
    }
  } catch (error) {
    callback(false)
    handleError(error)
  }
}

export const uploadImageTofirebase = async (
  file: File | null
): Promise<{ url: string; error: boolean } | undefined> => {
  try {
    if (file) {
      const dataFile = new FormData()
      dataFile.append('image', file)
      const { data } = await axiosApi.post('/uploads', dataFile)
      return data
    }
  } catch (error) {
    throw error
  }
}

export const getSearchCity = async (
  q: string
): Promise<{ name: string; origin: string }[] | undefined> => {
  try {
    const { data } = await axiosApi.get(`api-elastic/search-city?q=${q}`)
    return data
  } catch (error) {
    handleError(error)
  }
}