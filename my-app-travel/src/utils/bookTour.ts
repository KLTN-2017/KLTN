

import {  toast } from 'react-toastify'
import { BookCreate } from '../api/interface/order'
export const getOrderLocalStorage = (): BookCreate[] => {
  const listOrder = localStorage.getItem('order-items')
  const data = listOrder ? JSON.parse(listOrder) : []
  return data
}

export const book = (data: BookCreate) => {
  const listOrder = getOrderLocalStorage()
  if (listOrder.find((order) => order.item_id === data.item_id)) {
    toast.warning('🦄 Bạn đã book nó rồi. ', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    return 0
  } else {
    listOrder.push(data)
    localStorage.setItem('order-items', JSON.stringify(listOrder))
    toast.warning(`🦄 Thêm thành công ${data.title}`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    return 1
  }
}

export const clearBook = (item_id: string, title: string)=> {
    const listOrder = getOrderLocalStorage()
    const listRemove = listOrder.filter(order => order.item_id !== item_id)
  localStorage.setItem('order-items', JSON.stringify(listRemove))
  toast.warning(`🦄 Hủy thành công ${title}`, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

