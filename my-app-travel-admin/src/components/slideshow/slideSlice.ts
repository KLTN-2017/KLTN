import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Banner } from '../../api/interface/banner'
import { AppThunk } from 'app/store'
import { handleError } from '../../utils/handleError'
import {
  getAllImgBanner,
  createImgBanner,
  deleteimgBanner,
} from '../../api/banner/index'
import{notification} from 'antd'
import {setloading} from 'app/rootSlice'
interface InitialState {
  listSrc: Banner[]
}
const initialState: InitialState = {
  listSrc: [],
}

const bannerSlice = createSlice({
  name: 'bannerSlice',
  initialState,
  reducers: {
    setListSrc(state, action: PayloadAction<Banner[]>) {
      state.listSrc = action.payload
    },
    clearListSrc(state) {
      state.listSrc = []
    },
    addToListSrc(state, action: PayloadAction<Banner>) {
      state.listSrc = [...state.listSrc, action.payload]
    },
    removeImgOfListSrc(state, action: PayloadAction<string>) {
      state.listSrc = state.listSrc.filter((img) => img.id !== action.payload)
    },
  },
})

export const {
  setListSrc,
  clearListSrc,
  addToListSrc,
  removeImgOfListSrc,
} = bannerSlice.actions

export const fecthListImgOfBanner = (): AppThunk => async (dispatch) => {
  try {
    const data = await getAllImgBanner()
    dispatch(setListSrc(data))
  } catch (error) {
    handleError(error)
  }
}

export const deleteImgOfBanner = (id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setloading(true))
    await deleteimgBanner(id)
    dispatch(removeImgOfListSrc(id))
    dispatch(setloading(false))
    notification.success({
      message: 'Xóa thành công ảnh khỏi banner'
    })
  } catch (error) {
    dispatch(setloading(false))
    handleError(error)
  }
  
}

export const createImgToBanner = (src: string, callBack: ()=> void): AppThunk => async (dispatch) => {
  try {
    if (src) {
      dispatch(setloading(true))
      const id = await createImgBanner(src)
      dispatch(addToListSrc({ id, src }))
      dispatch(setloading(false))
      notification.success({
        message: 'Đã thêm ảnh vào slide',
      })
      callBack()
    }
    else notification.warn({
      message: 'Bạn chưa chọn ảnh hoặc là bạn chưa upload nó lên server'
    })
  } catch (error) {
    dispatch(setloading(false))
    handleError(error)
  }
}

export default bannerSlice.reducer
