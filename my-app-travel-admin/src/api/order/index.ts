
import { notification } from 'antd';
import { axiosApi } from '../axios'

import { DataChart, FilterOrder, GetALLOrderFilter } from '../interface/order'

export const getPageOrderFilter = async (
  page: number,
  filter: FilterOrder
): Promise<GetALLOrderFilter> => {
  try {
    const { data } = await axiosApi.get(
      `/api-order/page/${page}?year=${filter.year}&month=${filter.month}&day=${filter.day}&type=${filter.type}&user_id=${filter.user_id}&isPay=${filter.isPay}`
    )
    return data
  } catch (error) {
    throw error
  }
}

export const updatePayDate = async (id: string, date: string): Promise<void> => {
  try {
    await axiosApi.put(`/api-order/${id}`, {date, type: 'CASH'})
    notification.success({message: `Cập nhật thành công cho đơn hàng ${id}`})
  } catch (error) {
    throw error
  }
}

export const getDataChart = async (): Promise<DataChart> => {
  try {
    const { data } = await axiosApi.get('/api-order/data-chart-order')
    return data
  } catch (error) {
    throw error
  }
}
