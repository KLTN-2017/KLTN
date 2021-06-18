import { axiosApi } from '../axios'
import {
  HotelDetail,
  ZonehHotel,
  StarHotel,
  ListHotelFilter,
  FilterHotel,
  HotelCreate,
} from '../interface/hotel'
import { notification } from 'antd'

export const getHotelById = async (id: string): Promise<HotelDetail> => {
  try {
    const { data } = await axiosApi.get(`/api-hotel/hotel/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

export const getHotelZone = async (): Promise<ZonehHotel[]> => {
  try {
    const { data } = await axiosApi.get('/api-hotel/hotel-zone')
    return data
  } catch (error) {
    throw error
  }
}

export const getHotelStar = async (): Promise<StarHotel[]> => {
  try {
    const { data } = await axiosApi.get('/api-hotel/hotel-star')
    return data
  } catch (error) {
    throw error
  }
}

export const getFilterHotel = async (
  filter: FilterHotel,
  page: number
): Promise<ListHotelFilter> => {
  try {
    const { data } = await axiosApi.get(
      `/api-hotel/hotel-filter/${page}?star=${filter.star}&location=${filter.location}`
    )
    return data
  } catch (error) {
    throw error
  }
}

export const deleteHotel = async (id: string): Promise<void> => {
  try {
    await axiosApi.put(`/api-hotel/hotel/${id}`, { status: false })
  } catch (error) {
    throw error
  }
}

export const createHotel = async (hotel: HotelCreate): Promise<void> => {
  try {
    if (
      !hotel.title &&
      hotel.img &&
      hotel.location &&
      hotel.star &&
      hotel.pirce
    )
      notification.warn({
        message: 'Bạn cần điền đầy đủ thông tin',
      })
    else if (!parseInt(hotel.star) && parseInt(hotel.pirce))
      notification.warn({
        message: 'Chất lượng và giá phải ở dạng số',
      })
    else {
      await axiosApi.post(`/api-hotel/hotel`, hotel)
      notification.success({
        message: 'Tạo thành công khách sạn',
        description: hotel.title,
      })
    }
  } catch (error) {
    notification.error({
      message: 'Lỗi tạo khách sạn',
      description: hotel.title,
    })
    console.log(error)
  }
}

export const updateHotel = async (
  id: string,
  hotel: HotelCreate
): Promise<void> => {
  try {
    if (
      !hotel.title &&
      hotel.img &&
      hotel.location &&
      hotel.star &&
      hotel.pirce
    )
      notification.warn({
        message: 'Bạn cần điền đầy đủ thông tin',
      })
    else if (!parseInt(hotel.star) && parseInt(hotel.pirce))
      notification.warn({
        message: 'Chất lượng và giá phải ở dạng số',
      })
    else {
      await axiosApi.put(`/api-hotel/hotel/${id}`, hotel)
      notification.success({
        message: 'Cập nhật thành công khách sạn',
        description: hotel.title,
      })
    }
  } catch (error) {
    notification.error({
      message: 'Lỗi cập nhật khách sạn',
      description: hotel.title,
    })
    console.log(error)
  }
}
