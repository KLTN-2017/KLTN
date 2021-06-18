import { rateHotel } from './../../../api/carResApi/hotel';
import { ZonehHotel } from './../../../api/interface/hotel'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { RootState } from 'app/rootReducer'
import {
  getHotelById,
  getHotelStar,
  getHotelZone,
  getFilterHotel,
  getRelationById,
} from '../../../api/carResApi/hotel'
import {
  Hotel,
  HotelDetail,
  FilterHotel,
  filterHotelDefault,
  MoneyHotel,
  StarHotel,
} from '../../../api/interface/hotel'
import { handleError } from 'utils/handleError'
import { toast } from 'react-toastify';

interface DataStore {
  data: Hotel[]
  hotel: HotelDetail | null
  count: number
  pageCurrent: number
  filter: FilterHotel
  star: StarHotel[]
  zone: ZonehHotel[]
  relation: {
    data: Hotel[]
    status: 'nodata' | 'loading' | 'success' | 'rest'
  }
  loading: boolean
}
const initialState: DataStore = {
  data: [],
  hotel: null,
  count: 0,
  pageCurrent: 1,
  filter: filterHotelDefault,
  star: [],
  zone: [],
  relation: {
    data: [],
    status: 'rest',
  },
  loading: false
}
const hotelSlice = createSlice({
  name: 'hotelSlice',
  initialState,
  reducers: {
    setListHotel(state, action: PayloadAction<Hotel[]>) {
      state.data = action.payload
      state.loading = false
    },
    setHotel(state, action: PayloadAction<HotelDetail>) {
      state.hotel = action.payload
    },
    clearListHotel(state) {
      state.data = []
    },
    clearHotel(state) {
      state.hotel = null
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.pageCurrent = action.payload
    },
    setFilter(
      state,
      action: PayloadAction<ZonehHotel | MoneyHotel | StarHotel>
    ) {
      state.pageCurrent = 1
      state.filter = { ...state.filter, ...action.payload }
    },
    clearFilter(state) {
      state.filter = filterHotelDefault
    },
    setStar(state, action: PayloadAction<StarHotel[]>) {
      state.star = action.payload
    },
    clearStar(state) {
      state.star = []
    },
    setZone(state, action: PayloadAction<ZonehHotel[]>) {
      state.zone = action.payload
    },
    clearZone(state) {
      state.zone = []
    },
    setRelation(state, action: PayloadAction<Hotel[]>) {
      state.relation.data = action.payload
      if (action.payload) state.relation.status = 'success'
      else state.relation.status = 'nodata'
    },
    clearRelation(state) {
      state.relation.data = []
      state.relation.status = 'rest'
    },
    setStatus(state) {
      state.relation.status = 'loading'
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setRateHotel(state, action: PayloadAction<string>) {
      state.hotel = Object.assign({}, state.hotel, { rate: action.payload })
    },
  },
})
export const {
  setListHotel,
  setHotel,
  clearListHotel,
  clearHotel,
  setCount,
  setPage,
  setFilter,
  clearFilter,
  setStar,
  setZone,
  clearStar,
  clearZone,
  setRelation,
  clearRelation,
  setStatus,
  setLoading,
  setRateHotel
} = hotelSlice.actions
export const fetchPageHotel = (
  filter: FilterHotel,
  page: number
): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const data = await getFilterHotel(filter, page)
    dispatch(setListHotel(data.rows))
    dispatch(setCount(data.count || 0))
  } catch (error) {
    dispatch(setLoading(false))
    handleError(error)
  }
}
export const fetchHotelById = (id: number): AppThunk => async (dispatch) => {
  try {
    const data = await getHotelById(id)
    dispatch(setHotel(data))
  } catch (error) {
    handleError(error)
  }
}

export const fetchRelationlById = (id: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setStatus())
    const data = await getRelationById(id)
    dispatch(setRelation(data))
  } catch (error) {
    handleError(error)
  }
}

export const fetchListZoneHotel = (): AppThunk => async (dispatch) => {
  try {
    const data = await getHotelZone()
    dispatch(setZone(data))
  } catch (error) {
    handleError(error)
  }
}
export const fetchListStarHotel = (): AppThunk => async (dispatch) => {
  try {
    const data = await getHotelStar()
    dispatch(setStar(data))
  } catch (error) {
    handleError(error)
  }
}

export const postRateHotel = (
  id: string,
  rate: number,
  rateString: string
): AppThunk => async (dispatch) => {
  try {
    await rateHotel(id, rate)
    dispatch(setRateHotel(rateString))
    toast.success('Cảm ơn bạn đã đánh giá!')
  } catch (error) {
    handleError(error)
  }
}

export const selectOptionZoneHotel = (state: RootState) =>
  state.hotel.zone.map((type) => ({
    label: type.location,
    value: type.location,
  }))

export const selectOptionStarHotel = (state: RootState) =>
  state.hotel.star.map((type) => ({
    label: `Chất lương ${type.star} sao`,
    value: type.star,
  }))

export default hotelSlice.reducer
