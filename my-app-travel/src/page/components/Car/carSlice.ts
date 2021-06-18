import { toast } from 'react-toastify';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { RootState } from 'app/rootReducer'
import {
  getCarById,
  getListTypeCar,
  getListYearCar,
  getListNumberSitCar,
  getListFiterCar,
  getRelationById,
  rateCar
} from '../../../api/carResApi/car'
import {
  Car,
  CarDetail,
  TypeCar,
  YearCar,
  NumberSitCar,
} from '../../../api/interface/car'
import { StateFilter, stateFilter } from './interfaceStateFilter'
import { Filter } from './interfaceStateFilter'
import { handleError } from 'utils/handleError'

interface DataStore {
  data: Car[]
  dataRelation: {
    data: Car[]
    status: 'nodata' | 'loading' | 'success' | 'rest'
  }
  car: CarDetail | null
  count: number
  listTypeCar: TypeCar[]
  filter: StateFilter
  year: YearCar[]
  numberSit: NumberSitCar[]
  pageCurrent: number,
  loading: boolean
}
const initialState: DataStore = {
  data: [],
  dataRelation: {
    data: [],
    status: 'rest',
  },
  car: null,
  count: 0,
  listTypeCar: [],
  filter: stateFilter,
  year: [],
  numberSit: [],
  pageCurrent: 1,
  loading: false
}
const carSlice = createSlice({
  name: 'carSlice',
  initialState,
  reducers: {
    setListCar(state, action: PayloadAction<Car[]>) {
      state.data = action.payload
      state.loading = false
    },
    setCar(state, action: PayloadAction<CarDetail>) {
      state.car = action.payload
      state.loading = false
    },
    clearListCar(state) {
      state.data = []
    },
    clearCar(state) {
      state.car = null
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload
    },
    setListTypeCar(state, action: PayloadAction<TypeCar[]>) {
      state.listTypeCar = action.payload
    },
    clearListTypeCar(state) {
      state.listTypeCar = []
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.pageCurrent = 1
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
    setpage(state, action: PayloadAction<number>) {
      state.pageCurrent = action.payload
    },
    setListDataRelation(state, action: PayloadAction<Car[]>) {
      state.dataRelation.data = action.payload
      if (action.payload) state.dataRelation.status = 'success'
      else state.dataRelation.status = 'nodata'
    },
    clearRelationData(state) {
      state.dataRelation.data = []
      state.dataRelation.status = 'rest'
    },
    setRelationLoading(state) {
      state.dataRelation.status = 'loading'
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setRateCar(state, action: PayloadAction<string>) {
      state.car = Object.assign({}, state.car, {rate: action.payload})
    }
  },
})
export const {
  setListCar,
  setCar,
  clearListCar,
  clearCar,
  setCount,
  setListTypeCar,
  clearListTypeCar,
  setFilter,
  clearFilter,
  setListNumberSit,
  clearListNumberSit,
  setListYear,
  clearListYear,
  setpage,
  setListDataRelation,
  clearRelationData,
  setRelationLoading,
  setLoading,
  setRateCar
} = carSlice.actions
export const fetchPageCar = (
  filter: StateFilter,
  page: number
): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const { rows, count } = await getListFiterCar(filter, page)
    dispatch(setListCar(rows))
    if (count) dispatch(setCount(count))
  } catch (error) {
    dispatch(setLoading(false))
    handleError(error)
  }
}
export const fetchCarById = (id: number): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const data = await getCarById(id)
    dispatch(setCar(data))
  } catch (error) {
    dispatch(setLoading(false))
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

export const fetchListCarRelation = (id: number): AppThunk => async (
  dispatch
) => {
  dispatch(setRelationLoading())
  const data = await getRelationById(id)
  dispatch(setListDataRelation(data))
  try {
  } catch (error) {
    handleError(error)
  }
}
export const postRateCar = (id: string, rate: number, rateString: string): AppThunk => async (
  dispatch
) => {
  
 
  try {
     await rateCar(id, rate)
     dispatch(setRateCar(rateString))
     toast.success('Cảm ơn bạn đã đánh giá!')
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
    label: type.cartype,
    value: type.cartype,
  }))
export const selectOptionYearCar = (state: RootState) =>
  state.car.year.map((type) => ({
    label: type.vehiclelife,
    value: type.vehiclelife,
  }))

export default carSlice.reducer
