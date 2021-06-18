import { AppThunk } from 'app/store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { NewsGet, NewsDetail} from '../../../api/interface/news'
import {
  getNewsPage,
  getNewsById,
  rateNewsById,
  getNewsRelation
} from '../../../api/news/index'
import {toast} from 'react-toastify'
import { handleError } from 'utils/handleError'

interface initState {
  listData: {
    rows: NewsGet[]
    count: number
  }
  news: NewsDetail | null
  loading: boolean
  newsRelation: {
    data: NewsGet[],
    loading: boolean
  }
}
const initialState: initState = {
  listData: {
    rows: [],
    count: 0,
  },
  news: null,
  loading: false,
  newsRelation: {
    data: [],
    loading: true
  }
}

const NewsSlice = createSlice({
  name: 'newsSlice',
  initialState,
  reducers: {
    setListNews(
      state,
      action: PayloadAction<{ rows: NewsGet[]; count: number }>
    ) {
      state.listData = action.payload
      state.loading = false
    },
    setNews(state, action: PayloadAction<NewsDetail>) {
      state.news = action.payload
    },
    clearListNews(state) {
      state.listData = {
        rows: [],
        count: 0,
      }
    },
    setRate(state, action: PayloadAction<string>) {
      if (state.news) state.news.rate = action.payload
    },
    clearNews(state) {
      state.news = null
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setNewsRelation(state, action: PayloadAction<NewsGet[]>) {
      state.newsRelation = {
        data: action.payload,
        loading: false,
      }
    },
    clearNewsRelation(state) {
      state.newsRelation = {
        data: [],
        loading: false,
      }
    },
    setNewsRelationLoaded(state) {
      state.newsRelation.loading = false
    },
  },
})

export const {
  setListNews,
  setNews,
  clearListNews,
  clearNews,
  setRate,
  setLoading,
  setNewsRelation,
  clearNewsRelation,
  setNewsRelationLoaded
} = NewsSlice.actions

export const fetchPageNews = (page: number): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const data = await getNewsPage(page)
    dispatch(setListNews(data))
  } catch (error) {
        dispatch(setLoading(false))
    handleError(error)
  }
}

export const fetchRelationNews = (id: number): AppThunk => async (dispatch) => {
  try {
    
    const data = await getNewsRelation(id)
    dispatch(setNewsRelation(data))
  } catch (error) {
    dispatch(setNewsRelationLoaded())
    handleError(error)
  }
}


export const fetchNewsById = (id: number): AppThunk => async (dispatch) => {
  try {
    const data = await getNewsById(id)
    dispatch(setNews(data))
  } catch (error) {
    handleError(error)
  }
}

export const rateNews = (id: number, rate: number, rateString: string): AppThunk => async (dispatch) => {
  try {
    await rateNewsById(id, rate)
    dispatch(setRate(rateString))
    toast.success("Cảm ơn bạn đã đánh giá!")
  } catch (error) {
    toast.error("Đã xảy ra lỗi trong quá trình đánh giá")
  }
}

export default NewsSlice.reducer
