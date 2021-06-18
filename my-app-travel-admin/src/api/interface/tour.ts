export interface Tour {
  id?: string
  title: string
  img: string
  date_start: string
  date_range: string
  map_maker: string
  number_sit: string
  note_attack: string
  price: string
  rate?: string
  city: string
}
export type TourDetail = {
  content: string
  type: string
  zone: string
  is_delete?: string
  createdat?: string
  updatedat?: string
} & Tour

export type ListTour = {
  data: Tour[]
  count?: number
}

export type ListTourFilter = {
  rows: Tour[]
  count: number
}

export interface DateStart {
  date_start: string | undefined
}
export interface Map {
  map_maker: string | undefined
}
export interface DateRange {
  date_range: number | undefined
}

export interface Zone {
  zone: string | undefined
}

export interface ListDataStatic {
  listAllDateStart: DateStart[]
  listDateRange: DateRange[]
  listAllMap: Map[]
}
export interface Type {
  type: string | undefined
}
export interface Price {
  price: string | undefined
}

export type TourFilterData = Zone & Type & Price & DateRange & DateStart & Map

export type Filter = Zone | Type | Price | DateRange | DateStart | Map

export const filterDefault: TourFilterData = {
  date_start: '',
  map_maker: '',
  date_range: 0,
  zone: '',
  type: '',
  price: '',
}

export const defaultTourDetail = {
  title: '',
  img: '',
  date_start: '',
  date_range: '',
  map_maker: '',
  number_sit: '',
  note_attack: '',
  price: '',
  content: '',
  type: '',
  zone: '',
  // rate: '',
  city: ''
}

export interface Dic {
  [key: string]: string
}
