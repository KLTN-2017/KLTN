import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { RootState } from 'app/rootReducer'
import {
  getCarById,
  getListTypeCar,
  getListYearCar,
  getListNumberSitCar,
  getListFiterCar,
  deleteCarById,
} from '../../api/carResApi/car'
import {
  Car,
  CarDetail,
  TypeCar,
  YearCar,
  NumberSitCar,
} from '../../api/interface/car'
import { StateFilter, stateFilter, Filter } from './interfaceStateFilter'
import { notification } from 'antd'
import { handleError } from '../../utils/handleError'
interface DataStore {
  listData: {
    count: number
    rows: Car[]
  }
  car: CarDetail | null
  listTypeCar: TypeCar[]
  filter: StateFilter
  year: YearCar[]
  numberSit: NumberSitCar[]
}
const initialState: DataStore = {
  listData: {
    count: 0,
    rows: [],
  },
  car: null,
  listTypeCar: [],
  filter: stateFilter,
  year: [],
  numberSit: [],
}
const carSlice = createSlice({
  name: 'carSlice',
  initialState,
  reducers: {
    setListCar(
      state,
      action: PayloadAction<{
        count: number
        rows: Car[]
      }>
    ) {
      state.listData = action.payload
    },
    setCar(state, action: PayloadAction<CarDetail>) {
      state.car = action.payload
    },
    clearListCar(state) {
      state.listData = {
        count: 0,
        rows: [],
      }
    },
    clearCarIdList(state, action: PayloadAction<string>) {
      state.listData.rows = state.listData.rows.filter(
        (car) => car.id !== action.payload
      )
      state.listData.count -= 1
    },
    clearCar(state) {
      state.car = null
    },
    setListTypeCar(state, action: PayloadAction<TypeCar[]>) {
      state.listTypeCar = action.payload
    },
    clearListTypeCar(state) {
      state.listTypeCar = []
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = { ...state.filter, ...action.payload }
    },
    clearFilter(state) {
      state.filter = stateFilter
    },
    setListYear(state, action: PayloadAction<YearCar[]>) {
      state.year = action.payload
    },
    setListNumberSit(state, action: PayloadAction<NumberSitCar[]>) {
      state.numberSit = action.payload
    },
    clearListYear(state) {
      state.year = []
    },
    clearListNumberSit(state) {
      state.numberSit = []
    },
  },
})
export const {
  setListCar,
  setCar,
  clearListCar,
  clearCar,
  setListTypeCar,
  clearListTypeCar,
  setFilter,
  clearFilter,
  setListNumberSit,
  clearListNumberSit,
  setListYear,
  clearListYear,
  clearCarIdList,
} = carSlice.actions
export const fetchPageCar = (
  filter: StateFilter,
  page: number
): AppThunk => async (dispatch) => {
  try {
    const data = await getListFiterCar(filter, page)
    dispatch(setListCar(data))
  } catch (error) {
    handleError(error)
  }
}
export const fetchCarById = (id: number): AppThunk => async (dispatch) => {
  try {
    const data = await getCarById(id)
    dispatch(setCar(data))
  } catch (error) {
    handleError(error)
  }
}

export const fetchListTypeCar = (): AppThunk => async (dispatch) => {
  try {
    const data = await getListTypeCar()
    dispatch(setListTypeCar(data))
  } catch (error) {
    handleError(error)
  }
}
export const fetchListNumberSitCar = (): AppThunk => async (dispatch) => {
  try {
    const data = await getListNumberSitCar()
    dispatch(setListNumberSit(data))
  } catch (error) {
    handleError(error)
  }
}
export const fetchListYearCar = (): AppThunk => async (dispatch) => {
  try {
    const data = await getListYearCar()
    dispatch(setListYear(data))
  } catch (error) {
    handleError(error)
  }
}

export const deleteCarOfList = (id: number, title: string): AppThunk => async (
  dispatch
) => {
  try {
    await deleteCarById(id)
    dispatch(clearCarIdList(id.toString()))
    notification.success({
      message: 'Xóa thành công !',
      description: title,
    })
  } catch (error) {
    handleError(error)
  }
}

export const selectOptionTypeCar = (state: RootState) =>
  state.car.listTypeCar.map((type) => ({
    label: type.brand,
    value: type.brand,
  }))

export const selectOptionNumberSitCar = (state: RootState) =>
  state.car.numberSit.map((type) => ({
    label: type.cartype + ' Chỗ',
    value: type.cartype,
  }))
export const selectOptionYearCar = (state: RootState) =>
  state.car.year.map((type) => ({
    label: type.vehiclelife,
    value: type.vehiclelife,
  }))

export default carSlice.reducer
