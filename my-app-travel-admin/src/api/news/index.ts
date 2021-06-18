import { axiosApi } from '../axios'
import { NewsCreate, NewsDetail, Result, GetResult } from '../interface/news'

export const createNews = async (news: NewsCreate): Promise<Result> => {
  try {
    const { data } = await axiosApi.post('/api-news', news)
    return data
  } catch (error) {
    throw error
  }
}

export const getNewsPage = async (page: number): Promise<GetResult> => {
  try {
    const { data } = await axiosApi.get(`/api-news/page/${page}`)
    return data
  } catch (error) {
    throw error
  }
}

export const getNewsById = async (id: number): Promise<NewsDetail> => {
  try {
    const { data } = await axiosApi.get(`/api-news/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

export const deleteNews = async (id: number): Promise<void> => {
  try {
    await axiosApi.delete(`/api-news/${id}`)
  } catch (error) {
    throw error
  }
}

export const updateNews = async (
  id: number,
  data: NewsCreate
): Promise<void> => {
  try {
    await axiosApi.put(`/api-news/${id}`, data)
  } catch (error) {
    throw error
  }
}
