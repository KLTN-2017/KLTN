export interface Hotel {
  id: string
  title: string
  img: string
  pirce: string
  star: string
  location: string
}
export type HotelDetail = {
  content: string
} & Hotel

export interface ListHotelFilter {
  rows: Hotel[]
  count: number
}

export interface ZonehHotel {
  location: string | undefined
}

export interface MoneyHotel {
  pirce: string | undefined
}

export interface StarHotel {
  star: string | undefined
}

export type FilterHotel = ZonehHotel & MoneyHotel & StarHotel

export const filterHotelDefault: FilterHotel = {
  location: '',
  star: '',
  pirce: '',
}
export interface HotelCreate {
  title: string
  img: string
  pirce: string
  star: string
  location: string
  content: string
}
