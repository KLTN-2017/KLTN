import { axiosApi } from '../axios'
import {
  ListHotel,
  HotelDetail,
  ZonehHotel,
  StarHotel,
  ListHotelFilter,
  FilterHotel,
  Hotel,
} from '../interface/hotel'

export const getPageHotel = async (page: number): Promise<ListHotel> => {
  try {
    const { data } = await axiosApi.get(`/api-hotel/hotels/${page}`)
    return data
  } catch (error) {
    throw error
  }
}

export const getHotelById = async (id: number): Promise<HotelDetail> => {
  try {
    const { data } = await axiosApi.get(`/api-hotel/hotel/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

export const getRelationById = async (id: number): Promise<Hotel[]> => {
  try {
    const { data } = await axiosApi.get(`/api-hotel/hotel-relation/${id}`)
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

export const rateHotel = async (id: string, rate: number): Promise<void> => {
  await axiosApi.post(`/api-hotel/hotel/${id}`, { rate })
}

export const getHotelByListId = async (
  listId: Array<number>
): Promise<Hotel[]> => {
  const { data } = await axiosApi.post(`api-hotel/hotel-by-list-id`, listId)
  return data
}

export const getSearchHotel = async (
  q: string
): Promise<{ id: string; title: string }[]> => {
  const { data } = await axiosApi.get(`api-elastic/search-hotel?q=${q}`)
  return data
}
