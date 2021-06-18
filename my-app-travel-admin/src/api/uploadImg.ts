import { axiosApi } from './axios'

export const upload = async (
  bucket: string,
  img: FormData
): Promise<{ url: string; err: boolean }> => {
  try {
    const { data } = await axiosApi.post(`${bucket}/uploads`, img)
    return data
  } catch (error) {
    throw error
  }
}
