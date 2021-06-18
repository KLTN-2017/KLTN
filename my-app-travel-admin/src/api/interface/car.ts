export interface Car {
  id: string
  title: string
  src: string
  vehiclelife: string
  brand: string
  cartype: string
}
export type CarDetail = {
  content: string
} & Car

export interface ListCarFilter {
  rows: Car[]
  count: number
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

export type CarCreate = {
  content: string
  title: string
  src: string
} & TypeCar &
  YearCar &
  NumberSitCar
