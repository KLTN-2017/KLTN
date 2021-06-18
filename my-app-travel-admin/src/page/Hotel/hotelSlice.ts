import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { RootState } from 'app/rootReducer'
import {
  getHotelById,
  getHotelStar,
  getHotelZone,
  getFilterHotel,
  deleteHotel,
} from '../../api/carResApi/hotel'
import {
  HotelDetail,
  FilterHotel,
  filterHotelDefault,
  MoneyHotel,
  StarHotel,
  ZonehHotel,
  ListHotelFilter,
} from '../../api/interface/hotel'

import { notification } from 'antd'
import { handleError } from '../../utils/handleError'
interface DataStore {
  listData: ListHotelFilter
  hotel: HotelDetail | null
  filter: FilterHotel
  star: StarHotel[]
  zone: ZonehHotel[]
}
const initialState: DataStore = {
  listData: {
    rows: [],
    count: 0,
  },
  hotel: null,
  filter: filterHotelDefault,
  star: [],
  zone: [],
}
const hotelSlice = createSlice({
  name: 'hotelSlice',
  initialState,
  reducers: {
    setListHotel(state, action: PayloadAction<ListHotelFilter>) {
      state.listData = action.payload
    },
    setHotel(state, action: PayloadAction<HotelDetail>) {
      state.hotel = action.payload
    },
    clearListHotel(state) {
      state.listData = {
        rows: [],
        count: 0,
      }
    },
    clearHotelOfList(state, action: PayloadAction<string>) {
      state.listData.rows = state.listData.rows.filter(
        (hotel) => hotel.id !== action.payload
      )
      state.listData.count -= 1
    },
    clearHotel(state) {
      state.hotel = null
    },
    setFilter(
      state,
      action: PayloadAction<ZonehHotel | MoneyHotel | StarHotel>
    ) {
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
  },
})
export const {
  setListHotel,
  setHotel,
  clearListHotel,
  clearHotel,
  setFilter,
  clearFilter,
  setStar,
  setZone,
  clearStar,
  clearZone,
  clearHotelOfList,
} = hotelSlice.actions
export const fetchPageHotel = (
  filter: FilterHotel,
  page: number
): AppThunk => async (dispatch) => {
  try {
    const data = await getFilterHotel(filter, page)
    dispatch(setListHotel(data))
  } catch (error) {
    handleError(error)
  }
}
export const fetchHotelById = (id: string): AppThunk => async (dispatch) => {
  try {
    const data = await getHotelById(id)
    dispatch(setHotel(data))
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

export const deleteHotelByid = (id: string, title: string): AppThunk => async (
  dispatch
) => {
  try {
    await deleteHotel(id)
    dispatch(clearHotelOfList(id))
    notification.success({
      message: 'Xóa thành công',
      description: title,
    })
  } catch (error) {
    notification.error({
      message: 'Lỗi xóa khách sạn',
      description: title,
    })
    console.log(error)
  }
}

export const selectOptionZoneHotel = (state: RootState) =>
  state.hotel.zone.map((type) => ({
    label: type.location ? type.location : '',
    value: type.location ? type.location : '',
  }))

export const selectOptionStarHotel = (state: RootState) =>
  state.hotel.star.map((type) => ({
    label: `Chất lương ${type.star} sao`,
    value: type.star,
  }))

export default hotelSlice.reducer
