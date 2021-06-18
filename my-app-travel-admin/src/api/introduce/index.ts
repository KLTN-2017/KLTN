import { handleError } from './../../utils/handleError'
import { axiosApi } from '../axios'
import { notification } from 'antd'
import {} from '../../utils/handleError'
export const contentIntroduce = async (): Promise<string> => {
  try {
    const { data } = await axiosApi.get(`/api-introduce`)
    return data
  } catch (error) {
    throw error
  }
}

export const updateIntroduce = async (content: string): Promise<void> => {
  try {
    await axiosApi.post(`/api-introduce`, { content })
    notification.success({
      message: 'Cập nhật thành công trang giới thiệu',
    })
  } catch (error) {
    handleError(error)
  }
}
