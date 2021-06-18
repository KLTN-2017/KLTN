import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DataStore {
  tab: number
  login: boolean
  loading: boolean
}
const initialState: DataStore = {
  tab: 0,
  login: false,
  loading: false,
}
const rootSlice = createSlice({
  name: 'rootSlice',
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<number>) {
      state.tab = action.payload
    },
    setloading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
  },
})
export const { setTab, setloading } = rootSlice.actions

export default rootSlice.reducer
