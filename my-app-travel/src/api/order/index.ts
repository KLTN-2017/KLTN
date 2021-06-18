import { handleError } from 'utils/handleError';
import { axiosApi } from '../axios'
import {toast} from 'react-toastify'
import {BookDetail, ResultCreateOrder, BookCreate} from '../interface/order'
import socket from 'app/socket';

export const bookItemHistory = async (): Promise<BookDetail[]>=> {
  try {
      const { data } = await axiosApi.get(`/api-order/order-user`)
      return data.rows
  } catch (error) {
      throw error
  }
}

export const submitBookOrder = async (
  dataBook: BookCreate[],
  callback: () => void,
  callbackOk: () => void
): Promise<ResultCreateOrder | undefined> => {
  try {
    if (localStorage.getItem('user')) {
      const { data } = await axiosApi.post(`/api-order`, dataBook)
      const email = JSON.parse(localStorage.getItem('user') || '').email
      socket.emit('order-item', dataBook, email)
      localStorage.removeItem('order-items')
      toast.success('Chúc mừng bạn đã đặt thành công vui lòng kiểm tra email của bạn!')
      callbackOk()
      return data
    } else {
      toast.warn('You must login !')
      callback()
    }
  } catch (error) {
    handleError(error)
  }
}


export const getUrlpay = async (title: string, count: string, type: string, id: string, types: string): Promise<string> => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const detail = type === 'H' ? 'Thêu khách sạn ' : (type === 'C' ? 'Thêu xe ' : 'Đặt tour du lịch')
    const { data } = await axiosApi.post(`/api-order/url-pay`, {
      title: user?.email + '---' + detail + title
      , count,
      id,
      type: types

    })
    return data
  } catch (error) {
    throw error
  }
}

export const payOrder = async (id: string, type: string): Promise<void> => {
  try {
    await axiosApi.put(`/api-order/${id}`, { type })
    toast.success('Update dữ liệu thanh toán cho bạn')
  } catch (error) {
    handleError(error)
  }
}


export const deleteOrderBooked = async (id: string): Promise<void> => {
  try {
    await axiosApi.delete(`/api-order/${id}`)
  } catch (error) {
    throw error
  }
}
