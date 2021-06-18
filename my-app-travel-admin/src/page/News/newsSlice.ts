import { AppThunk } from './../../app/store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { NewsGet, NewsDetail } from '../../api/interface/news'
import { notification } from 'antd'
import { getNewsPage, deleteNews, getNewsById } from '../../api/news/index'
import { handleError } from '../../utils/handleError'
import { setloading } from 'app/rootSlice'
interface initState {
  listData: {
    rows: NewsGet[]
    count: number
  }
  news: NewsDetail | null
}
const initialState: initState = {
  listData: {
    rows: [],
    count: 0,
  },
  news: null,
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
    },
    setNews(state, action: PayloadAction<NewsDetail>) {
      state.news = action.payload
    },
    deleteNewsOfList(state, action: PayloadAction<number>) {
      state.listData.rows = state.listData.rows.filter(
        (news) => news.id !== action.payload
      )
      state.listData.count -= 1
    },
    clearListNews(state) {
      state.listData = {
        rows: [],
        count: 0,
      }
    },
    clearNews(state) {
      state.news = null
    },
  },
})

export const {
  setListNews,
  setNews,
  clearListNews,
  clearNews,
  deleteNewsOfList,
} = NewsSlice.actions

export const fetchPageNews = (page: number): AppThunk => async (dispatch) => {
  try {
    const data = await getNewsPage(page)
    dispatch(setListNews(data))
  } catch (error) {
    handleError(error)
  }
}

export const deletNewsDb = (id: number, title: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setloading(true))
    await deleteNews(id)
    dispatch(setloading(false))
    dispatch(deleteNewsOfList(id))
    notification.success({
      message: 'Xóa thành công',
      description: title,
    })
  } catch (error) {
    dispatch(setloading(false))
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

export default NewsSlice.reducer
