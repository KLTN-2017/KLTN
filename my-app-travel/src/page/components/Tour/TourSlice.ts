import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import {
  getTourById,
  getAllDataFilter,
  getAllZoneByType,
  getPageTourFilter,
  getTourRelationById,
  rateTour,
  getSearchTour
} from '../../../api/tourApi/index'
import {
  Tour,
  TourDetail,
  Map,
  DateRange,
  DateStart,
  Zone,
  ListDataStatic,
  Filter,
  TourFilterData,
} from '../../../api/interface/tour'
import { RootState } from 'app/rootReducer'
import { handleError } from 'utils/handleError'
import { toast } from 'react-toastify'
import { getSearchCar } from '../../../api/carResApi/car'
import { getSearchHotel } from '../../../api/carResApi/hotel'
import {getSearchNews} from '../../../api/news/index'
interface DataStore {
  data: Tour[]
  tour: TourDetail | null
  count: number
  listAllDateStart: DateStart[]
  listAllMap: Map[]
  listDateRange: DateRange[]
  zone: Zone[]
  filter: {
    type: string | undefined
    zone: string | undefined
    price: string | undefined
    date_start: string | undefined
    map_maker: string | undefined
    date_range: number | undefined
  }
  page: number
  relation: {
    data: Tour[]
    status: 'loading' | 'nodata' | 'rest' | 'success'
  }
  loading: boolean
  tourSearch: { id: string, title: string }[]
  search: string
}
const initialState: DataStore = {
  data: [],
  tour: null,
  count: 0,
  listAllDateStart: [],
  listAllMap: [],
  listDateRange: [],
  zone: [],
  filter: {
    type: 'all',
    zone: '',
    price: '',
    date_start: '',
    map_maker: '',
    date_range: 0,
  },
  page: 1,
  relation: {
    data: [],
    status: 'rest',
  },
  loading: true,
  tourSearch: [],
  search: ''
}
const TourSlice = createSlice({
  name: 'TourSlice',
  initialState,
  reducers: {
    setListTour(state, action: PayloadAction<Tour[]>) {
      state.loading = false
      state.data = action.payload
    },
    setTour(state, action: PayloadAction<TourDetail>) {
      state.tour = action.payload
    },
    clearListTour(state) {
      state.data = []
    },
    clearTour(state) {
      state.tour = null
      state.relation.data = []
      state.relation.status = 'rest'
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload
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
    setFilter(state, action: PayloadAction<Filter>) {
      state.page = 1
      state.filter = { ...state.filter, ...action.payload }
    },
    clearFilter(state) {
      state.filter = {
        type: 'all',
        zone: '',
        price: '',
        date_start: '',
        map_maker: '',
        date_range: 0,
      }
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setRelationTour(state, action: PayloadAction<Tour[]>) {
      state.relation.data = action.payload
    },
    setStatus(
      state,
      action: PayloadAction<'loading' | 'nodata' | 'rest' | 'success'>
    ) {
      state.relation.status = action.payload
    },
    setRateTour(state, action: PayloadAction<string>) {
      state.tour = Object.assign({}, state.tour, { rate: action.payload })
    },
    setTourSearch(state, action: PayloadAction<{ id: string, title: string }[]>) {
     state.tourSearch = action.payload 
    },
    clearSearchTour(state) {
      state.tourSearch = []
    },
    setSearchUser(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setLoading(state) {
      state.loading = false
    }
  },
})

export const {
  setListTour,
  setTour,
  clearListTour,
  clearTour,
  setCount,
  setFilter,
  setListZone,
  setStaticDataFilter,
  clearFilter,
  clearListZone,
  clearStaticDataFilter,
  setPage,
  setRelationTour,
  setStatus,
  setRateTour,
  setTourSearch,
  clearSearchTour,
  setSearchUser,
  setLoading
} = TourSlice.actions
export const fetchTourById = (id: number): AppThunk => async (dispatch) => {
  try {
    const data = await getTourById(id)
    dispatch(setTour(data))
  } catch (error) {
    handleError(error)
  }
}

export const fetchSearchTour = (q: string): AppThunk => async (dispatch) => {
  try {
    const data = await getSearchTour(q)
    dispatch(setTourSearch(data))
  } catch (error) {
    handleError(error)
  }
}



///////
export const fetchSearchCar = (q: string): AppThunk => async (dispatch) => {
  try {
    const data = await getSearchCar(q)
    dispatch(setTourSearch(data))
  } catch (error) {
    handleError(error)
  }
}
//////
export const fetchSearchHotel = (q: string): AppThunk => async (dispatch) => {
  try {
    const data = await getSearchHotel(q)
    dispatch(setTourSearch(data))
  } catch (error) {
    handleError(error)
  }
}

////
export const fetchSearchNews = (q: string): AppThunk => async (dispatch) => {
  try {
    const data = await getSearchNews(q)
    dispatch(setTourSearch(data))
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

export const fetchPageTourFilter = (
  page: number,
  filter: TourFilterData
): AppThunk => async (dispatch) => {
  try {
    // dispatch(setPage(1))
    const data = await getPageTourFilter(page, filter)
    dispatch(setListTour(data.rows))
    dispatch(setCount(data.count))
  } catch (error) {
    dispatch(setLoading())
    handleError(error)
  }
}

export const fetchRelationTourById = (id: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setStatus('loading'))
    const data = await getTourRelationById(id)
    dispatch(setRelationTour(data))
    dispatch(setStatus('success'))
  } catch (error) {
    handleError(error)
  }
}


export const postRateTour = (
  id: string,
  rate: number,
  rateString: string
): AppThunk => async (dispatch) => {
  try {
    await rateTour(id, rate)
    dispatch(setRateTour(rateString))
    toast.success('Cảm ơn bạn đã đánh giá!')
  } catch (error) {
    handleError(error)
  }
}

export const getMapOption = (state: RootState) =>
  state.tour.listAllMap?.map((map) => ({
    label: map.map_maker,
    value: map.map_maker,
  }))

export const getDateRangeOption = (state: RootState) =>
  state.tour.listDateRange?.map((map) => ({
    label: `Thời gian ${map.date_range} ngày`,
    value: map.date_range,
  }))
export const getDateStart = (state: RootState) =>
  state.tour.listAllDateStart?.map((map) => ({
    label: `Ngày khởi hành ${map.date_start}`,
    value: map.date_start,
  }))
export const getZoneOption = (state: RootState) =>
  state.tour.zone.map((map) => ({
    label: map.zone,
    value: map.zone,
  }))

export default TourSlice.reducer
