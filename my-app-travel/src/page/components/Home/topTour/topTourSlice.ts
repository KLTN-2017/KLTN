import { handleError } from './../../../../utils/handleError';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { getTopTour } from '../../../../api/tourApi/index'
import { Tour } from '../../../../api/interface/tour'
interface InitialState {
  data: Tour[]
  loading: boolean
}
const initialState: InitialState = {
  data: [],
  loading: false
}
const topTourSlice = createSlice({
  name: 'topTourSlice',
  initialState,
  reducers: {
    setListTopTour(state, action: PayloadAction<Tour[]>) {
      state.data = action.payload
      state.loading = false
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  },
})
export const { setListTopTour, setLoading } = topTourSlice.actions
export const fetchTopTour = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const data = await getTopTour()
    dispatch(setListTopTour(data.data))
  } catch (error) {
    dispatch(setLoading(false))
    handleError(error)
  }
}
export default topTourSlice.reducer
