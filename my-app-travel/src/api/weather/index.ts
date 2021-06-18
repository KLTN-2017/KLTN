import { handleError } from 'utils/handleError';
import { axiosApi } from '../axios'


export const getSearchCity = async (
  q: string
): Promise<{ name: string; origin: string }[] | undefined> => {
 try {
    const { data } = await axiosApi.get(`api-elastic/search-city?q=${q}`)
    return data
 } catch (error) {
   handleError(error)
 }
}