export interface BookDetail {
    id: string
    item_id: string,
    order_date: string,
    pay_date: string,
    img: string,
    title: string,
    count: number
}
export interface ResultBook{
    count: number,
}

export interface ResultCreateOrder {
    sucess?: boolean,
    error?: string
}

export interface BookCreate {
  item_id: string
  count: number
  img: string
    title: string
    order_date: string
}
