export interface BookDetail {
  item_id: string
  order_date: string
  pay_date: string
  img: string
  title: string
  count: number
}
export interface ResultBook {
  count: number
}

export interface ResultCreateOrder {
  sucess?: boolean
  error?: string
}

export interface BookCreate {
  item_id: string
  count: number
  img: string
  title: string
}


export interface OrderCustomer {
  id: string
  user_id: string
  item_id: string
  order_date: string
  pay_date: string
  count: string
  img: string
  title: string
  pay_method: string
}

export interface FilterOrder {
  year: string
  month: string
  day: string
  type: string
  user_id: string
  isPay: string
}


export const DefaultFilterOrder = {
  year: '',
  month: '',
  day: '',
  type: '',
  user_id: '',
  isPay: ''
}

export interface GetALLOrderFilter {
  rows: OrderCustomer[],
  count: number,
  sum: number

}

export interface CountYear {
  count_year: number
  year: number
}
export interface CountYearMonth {
   [key: string]: number[]
}
 
export interface DataChart {
  chartYear: CountYear[]
  mountByYearMonth: CountYearMonth
}