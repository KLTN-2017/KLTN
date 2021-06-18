export interface Car {
  id: string
  title: string
  src: string
  vehiclelife: string
  brand: string
  cartype: string
  price: number
}
export type CarDetail = {
  content: string
  rate: string
} & Car

export interface ListCar {
  data: Car[]
  count?: number
}
export interface ListCarFilter {
  rows: Car[]
  count?: number
}

export interface TypeCar {
  brand: string
}

export interface YearCar {
  vehiclelife: string
}

export interface NumberSitCar {
  cartype: string
}
