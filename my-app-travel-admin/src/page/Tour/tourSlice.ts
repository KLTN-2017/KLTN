import { AppThunk } from './../../app/store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'
import {
  TourDetail,
  TourFilterData,
  ListTourFilter,
  filterDefault,
  Filter,
  DateRange,
  DateStart,
  Map,
  Zone,
  ListDataStatic,
  Dic,
  defaultTourDetail,
} from '../../api/interface/tour'

import {
  getTourById,
  getPageTourFilter,
  getAllDataFilter,
  getAllZoneByType,
} from '../../api/tourApi/index'

import { handleError } from '../../utils/handleError'

interface initState {
  listData: ListTourFilter
  tour: TourDetail | null
  filter: TourFilterData
  listAllDateStart: DateStart[]
  listAllMap: Map[]
  listDateRange: DateRange[]
  zone: Zone[]
}
const initialState: initState = {
  listData: {
    rows: [],
    count: 0,
  },
  tour: defaultTourDetail,
  filter: filterDefault,
  listAllDateStart: [],
  listAllMap: [],
  listDateRange: [],
  zone: [],
}

const TourSlice = createSlice({
  name: 'tourSlice',
  initialState,
  reducers: {
    setListTour(state, action: PayloadAction<ListTourFilter>) {
      state.listData = action.payload
    },
    setTour(state, action: PayloadAction<TourDetail>) {
      state.tour = action.payload
    },
    updateTour(state, action: PayloadAction<Dic>) {
      state.tour = Object.assign({}, state.tour, action.payload)
    },
    clearListData(state) {
      state.listData = {
        rows: [],
        count: 0,
      }
    },
    clearTourInList(state, action: PayloadAction<string>) {
      state.listData.rows = state.listData.rows.filter(
        (tour) => tour.id !== action.payload
      )
    },
    clearTour(state) {
      state.tour = null
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = { ...state.filter, ...action.payload }
    },
    setStaticDataFilter(state, action: PayloadAction<ListDataStatic>) {
      state.listAllDateStart = action.payload.listAllDateStart
      state.listAllMap = action.payload.listAllMap
      state.listDateRange = action.payload.listDateRange
    },
    clearStaticDataFilter(state) {
      state.listAllDateStart = []
      state.listAllMap = []
      state.listDateRange = []
    },
    setListZone(state, action: PayloadAction<Zone[]>) {
      state.zone = action.payload
    },
    clearListZone(state) {
      state.zone = []
    },
  },
})

export const {
  setListTour,
  setTour,
  clearListData,
  clearTour,
  setFilter,
  clearTourInList,
  setStaticDataFilter,
  clearStaticDataFilter,
  setListZone,
  clearListZone,
  updateTour
} = TourSlice.actions

export const fetchTourById = (id: number): AppThunk => async (dispatch) => {
  try {
    const tour = await getTourById(id)
    dispatch(setTour(tour))
  } catch (error) {
    handleError(error)
  }
}

export const fetchListTour = (
  page: number,
  filter: TourFilterData
): AppThunk => async (dispatch) => {
  try {
    const listTour = await getPageTourFilter(page, filter)
    dispatch(setListTour(listTour))
  } catch (error) {
    handleError(error)
  }
}

export const fetchAllDataStaticFilter = (): AppThunk => async (dispatch) => {
  try {
    const data = await getAllDataFilter()
    dispatch(setStaticDataFilter(data))
  } catch (error) {
    handleError(error)
  }
}

export const fetchAllZoneType = (type: string | undefined): AppThunk => async (
  dispatch
) => {
  try {
    if (type === 'national' || type === 'international') {
      const data = await getAllZoneByType(type)
      dispatch(setListZone(data))
    }
  } catch (error) {
    handleError(error)
  }
}
export const getMapOption = (state: RootState) =>
  state.tour.listAllMap?.map((map) => ({
    label: map.map_maker,
    value: map.map_maker || '',
  }))

export const getDateRangeOption = (state: RootState) =>
  state.tour.listDateRange?.map((map) => ({
    label: `Thời gian ${map.date_range} ngày`,
    value: map.date_range
  }))
export const getDateStart = (state: RootState) =>
  state.tour.listAllDateStart?.map((map) => ({
    label: `Ngày khởi hành ${map.date_start}`,
    value: map.date_start || '',
  }))
export const getZoneOption = (state: RootState) =>
  state.tour.zone.map((map) => ({
    label: map.zone,
    value: map.zone || '',
  }))

export default TourSlice.reducer
