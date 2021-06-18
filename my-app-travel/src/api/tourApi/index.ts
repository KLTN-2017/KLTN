import { axiosApi } from '../axios'
import {
  ListTour,
  TourDetail,
  ListDataStatic,
  Zone,
  TourFilterData,
  ListTourFilter,
  Tour,
} from '../interface/tour'

export const getTopTour = async (): Promise<ListTour> => {
  try {
    const { data } = await axiosApi.get('api-tour/tour-top')
    return data
  } catch (error) {
    throw error
  }
}
export const getTourById = async (id: number): Promise<TourDetail> => {
  try {
    const { data } = await axiosApi.get(`api-tour/tour/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

export const getTourByType = async (
  type: string,
  page: number
): Promise<ListTour> => {
  try {
    const { data } = await axiosApi.get(`api-tour/tour/type/${type}/${page}`)
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
    const body = {
     type: filter.type,
     zone: filter.zone,
    price:filter.price,
    date_range:filter.date_range,
    date_start:filter.date_start,
    map_maker:filter.map_maker,
  }
    const { data } = await axiosApi.post(`api-tour/tours-filter/${page}`,body)
    return data
  } catch (error) {
    throw error
  }
}

export const getTourRelationById = async (id: number): Promise<Tour[]> => {
    const { data } = await axiosApi.get(`api-tour/tour-relation/${id}`)
    return data
  
}


export const rateTour = async (id: string, rate: number): Promise<void> => {
  await axiosApi.post(`/api-tour/tour/${id}`, { rate })
}

export const getSearchTour = async (q: string): Promise<{id: string, title: string}[]> => {
    const { data } = await axiosApi.get(`api-elastic/search-tour?q=${q}`)
    return data
}

export const getTourByListId = async (
  listId: Array<number>
): Promise<Tour[]> => {
  const { data } = await axiosApi.post(`api-tour/tour-by-list-id`, listId)
  return data
}
