import { combineReducers } from '@reduxjs/toolkit'

import rootTabReducer from './rootSlice'

import tourReducer from '../page/Tour/tourSlice'
import newsReducer from '../page/News/newsSlice'
import carReducer from '../page/Car/carSlice'
import hotelReducer from '../page/Hotel/hotelSlice'
import userReducer from '../page/User/userSlice'
import bannerReducer from '../components/slideshow/slideSlice'
import systemReducer from '../page/System/systemSlice'
import orderReducer from '../page/Order/orderSlice'
const rootReducer = combineReducers({
  tab: rootTabReducer,
  tour: tourReducer,
  news: newsReducer,
  car: carReducer,
  hotel: hotelReducer,
  user: userReducer,
  banner: bannerReducer,
  system: systemReducer,
  order: orderReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
