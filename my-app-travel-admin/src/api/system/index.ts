import { axiosApi } from '../axios'
import { ActionRoute } from '../interface/actionRoute'

export const getAllActionRoute = async (): Promise<ActionRoute[]> => {
  const { data } = await axiosApi.get('/api-action-route')
  return data
}

export const addActionRoute = async (route: ActionRoute): Promise<void> => {
  await axiosApi.post('/api-action-route', route)
}
