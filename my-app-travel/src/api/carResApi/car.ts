import { axiosApi } from '../axios'
import {
  ListCar,
  ListCarFilter,
  CarDetail,
  TypeCar,
  YearCar,
  NumberSitCar,
  Car,
} from '../interface/car'

export const getPageCar = async (page: number): Promise<ListCar> => {
  const { data } = await axiosApi.get(`/api-car/cars/${page}`)
  return data
}

export const getCarById = async (id: number): Promise<CarDetail> => {
  const { data } = await axiosApi.get(`/api-car/car/${id}`)
  return data
}

export const getRelationById = async (id: number): Promise<Car[]> => {
  const { data } = await axiosApi.get(`/api-car/car-relation/${id}`)
  return data
}

export const getAllCar = async (): Promise<ListCar> => {
  const data = await axiosApi.get(`/api-car/cars`)
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

export const rateCar = async (id: string, rate: number): Promise<void> => {
  await axiosApi.post(`/api-car/car/${id}`, {rate})
}

export const getCarByListId = async (
  listId: Array<number>
): Promise<Car[]> => {
  const { data } = await axiosApi.post(`api-car/car-by-list-id`, listId)
  return data
}

export const getSearchCar = async (
  q: string
): Promise<{ id: string; title: string }[]> => {
  const { data } = await axiosApi.get(`api-elastic/search-car?q=${q}`)
  return data
}
