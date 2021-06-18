import { axiosApi } from '../axios'
import { Banner } from '../interface/banner'

export const createImgBanner = async (src: string): Promise<string> => {
  const { data } = await axiosApi.post('/api-banner', { src })
  return data
}

export const getAllImgBanner = async (): Promise<Banner[]> => {
  const { data } = await axiosApi.get('/api-banner')
  return data
}

export const deleteimgBanner = async (id: string): Promise<void> => {
  // await axiosApi.delete(`/api-banner/${id}`)
  console.log('----------',id, '--------------')
}
