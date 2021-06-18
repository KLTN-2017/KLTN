import { handleError } from './../../../../utils/handleError';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { getTourByType } from '../../../../api/tourApi/index'
import { Tour } from '../../../../api/interface/tour'
interface InitialState {
  data: Tour[]
  loading: boolean
}
const initialState: InitialState = {
  data: [],
  loading: false,
}
const nationalTourSlice = createSlice({
  name: 'nationalTourSlice',
  initialState,
  reducers: {
    setListNationalTour(state, action: PayloadAction<Tour[]>) {
      state.data = action.payload
      state.loading = false
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  },
})
export const { setListNationalTour, setLoading } = nationalTourSlice.actions
export const fetchTourNational = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const { data } = await getTourByType('national', 1)
    dispatch(setListNationalTour(data))
  } catch (error) {
    dispatch(setLoading(false))
    handleError(error)
  }
}
export default nationalTourSlice.reducer
