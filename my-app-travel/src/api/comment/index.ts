import { CommentItem } from 'api/interface/comment'
import { axiosApi } from '../axios'

export default async function getComment(id: string): Promise<CommentItem[]> {
    try {
          const { data } = await axiosApi.get(`/api-message/${id}`)
         return data
    
    } catch (error) {
        throw error
    }
}

