import { axiosApi } from '../axios'
import {
  NewsDetail,
  GetResult,
  Result,
  NewsGet
} from '../interface/news'

export const getNewsPage = async (page: number): Promise<GetResult> => {
  try {
    const { data } = await axiosApi.get(`/api-news/page/${page}`)
    return data
  } catch (error) {
    throw error
  }
}

export const getNewsRelation = async (id: number): Promise<NewsGet[]> => {
    const { data } = await axiosApi.get(`/api-news/relation/${id}`)
    return data
}

export const getNewsById = async (id: number): Promise<NewsDetail> => {
  try {
    const { data } = await axiosApi.get(`/api-news/${id}`)
    return data
  } catch (error) {
    throw error
  }
}

export const rateNewsById = async (id: number, rate: number): Promise<Result> => {
  try {
    const { data } = await axiosApi.post(`/api-news/rate/${id}`, { rate })
    return data
  } catch (error) {
    throw error
  }
}

export const getSearchNews = async (
  q: string
): Promise<{ id: string; title: string }[]> => {
  const { data } = await axiosApi.get(`api-elastic/search-news?q=${q}`)
  return data
}