import { toast } from 'react-toastify';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { bookItemHistory, deleteOrderBooked } from '../../../api/order/index'
import { BookDetail, BookCreate } from '../../../api/interface/order'
import { handleError } from 'utils/handleError'
import { setLoading } from 'app/rootSlice'

interface DataStore {
    show: boolean,
    listBook: BookCreate[],
  historyBook: BookDetail[],
  numBook: number,
  login: boolean
}
const initialState: DataStore = {
    show: false,
    listBook: [],
  historyBook: [],
  numBook: 0,
  login: false
}
const OrderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    setListBook(state, action: PayloadAction<BookCreate[]>) {
      state.listBook = action.payload
    },
    clearListBook(state) {
      state.listBook = []
      state.numBook = 0
    },
    clearOrderByTitle(state, action: PayloadAction<string>) {
      state.listBook = state.listBook.filter(
        (order) => order.item_id !== action.payload
      )
      state.numBook -= 1
    },
    setListHistoryBook(state, action: PayloadAction<BookDetail[]>) {
      state.historyBook = action.payload
    },
    clearListHistoryBook(state) {
      state.historyBook = []
    },
    removeOrderOfHistoryBook(state, action: PayloadAction<string>) {
      state.historyBook = state.historyBook.filter(order => order.id !== action.payload)
    },
    setShow(state, action: PayloadAction<boolean>) {
      state.show = action.payload
    },
    setNum(state, action: PayloadAction<number>) {
      state.numBook = action.payload
    },
    addNum(state) {
      state.numBook += 1
    },
    subNum(state) {
      state.numBook -= 1
    },
    setLogin(state, action: PayloadAction<boolean>) {
      state.login = action.payload
    },
  },
})

export const {
    setListBook,
    setListHistoryBook,
    setShow,
  clearListBook,
    clearOrderByTitle,
  clearListHistoryBook,
  setNum,
  addNum,
  subNum,
  setLogin,
    removeOrderOfHistoryBook
} = OrderSlice.actions
export const fetchlistHistoryOrder = (): AppThunk => async (dispatch) => {
  try {
    const data = await bookItemHistory()
    dispatch(setListHistoryBook(data))
    dispatch(setLogin(true))
  } catch (error) {
    handleError(error)
    dispatch(setLogin(false))
  }
}

export const deleteHistoryOrder = (id: string, title: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    await deleteOrderBooked(id)
    dispatch(removeOrderOfHistoryBook(id))
    dispatch(setLoading(false))
    toast.success(`Hủy thành công đơn đã đặt cho ${title}`)
  } catch (error) {
    dispatch(setLoading(false))
    handleError(error)
  }
}


export default OrderSlice.reducer
