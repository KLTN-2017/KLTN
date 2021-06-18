import { axiosApi } from '../axios'

export const contentIntroduce = async (): Promise<string> => {
  try {
    const { data } = await axiosApi.get(`/api-introduce`)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

