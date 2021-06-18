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
const interNationalTourSlice = createSlice({
  name: 'internationalTourSlice',
  initialState,
  reducers: {
    setListInterNationalTour(state, action: PayloadAction<Tour[]>) {
      state.data = action.payload
      state.loading = false
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading  = action.payload
    }
  },
})
export const { setListInterNationalTour, setLoading } = interNationalTourSlice.actions
export const fetchTourInterNational = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const { data } = await getTourByType('international', 1)
    dispatch(setListInterNationalTour(data))
  } catch (error) {
    dispatch(setLoading(false))
    handleError(error)
  }
}
export default interNationalTourSlice.reducer
