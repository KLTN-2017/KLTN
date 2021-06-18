
import { handleError } from './../../utils/handleError'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getPageOrderFilter, updatePayDate, getDataChart } from '../../api/order/index'
import {
  GetALLOrderFilter,
  FilterOrder,
  DefaultFilterOrder,
  DataChart
} from '../../api/interface/order'
import { AppThunk } from 'app/store'
import { setloading } from 'app/rootSlice'
interface InitialState {
  listOrder: GetALLOrderFilter & { loading: boolean }
  filter: FilterOrder
  dataChart: DataChart
}
const initialState: InitialState = {
  listOrder: {
    rows: [],
    count: 0,
    sum: 0,
    loading: false,
  },
  filter: DefaultFilterOrder,
  dataChart: {
    chartYear: [],
    mountByYearMonth: {}
  }
}

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    setListData(
      state,
      action: PayloadAction<GetALLOrderFilter & { loading: false }>
    ) {
      state.listOrder = action.payload
    },
    clearListData(state) {
      state.listOrder = {
        rows: [],
        count: 0,
        sum: 0,
        loading: false,
      }
    },
    setFilter(state, action: PayloadAction<FilterOrder>) {
      state.filter = action.payload
    },
    setLoadingData(state) {
      state.listOrder.loading = true
    },
    updateOrderPayDate(
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) {
      state.listOrder.rows = state.listOrder.rows.map((order) =>
        order.id === action.payload.id
          ? { ...order, pay_date: action.payload.date, pay_method: 'cash' }
          : order
      )
    },
    setDataChart(state, action: PayloadAction<DataChart>) {
      state.dataChart = action.payload
    },
    clearDataChart(state) {
      state.dataChart = {
        chartYear: [],
        mountByYearMonth: {},
      }
    },
  },
})

export const {
  setListData,
  clearListData,
  setFilter,
    setLoadingData,
  updateOrderPayDate,
  setDataChart,
  clearDataChart
} = orderSlice.actions

export const fetchListOrderCustomer = (
  page: number,
  filter: FilterOrder
): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoadingData())
    const data = await getPageOrderFilter(page, filter)
    dispatch(setListData({ ...data, loading: false }))
  } catch (error) {
    handleError(error)
  }
}

export const getDataChartForYou = (): AppThunk => async (dispatch) => {
  try {
    const listDataChart = await getDataChart()
    dispatch(setDataChart(listDataChart))
  } catch (error) {
    handleError(error)
  }
}


export const updateListOrderCustomer = (
  id: string,
  date: string
): AppThunk => async (dispatch) => {
  try {
    dispatch(setloading(true))
      await updatePayDate(id, date)
      dispatch(updateOrderPayDate({ id, date }))
    dispatch(setloading(false))
  } catch (error) {
    dispatch(setloading(false))
    handleError(error)
  }
}

export default orderSlice.reducer
