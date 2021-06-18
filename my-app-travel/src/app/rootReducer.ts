import { combineReducers } from '@reduxjs/toolkit'

import topTourReducer from '../page/components/Home/topTour/topTourSlice'
import tourNationalReducer from '../page/components/Home/tourNational/tourNationalSlice'
import tourInterNationalReducer from '../page/components/Home/tourInterNational/tourInterNationalSlice'
import tourAllReducer from '../page/components/Tour/TourSlice'
import carReducer from '../page/components/Car/carSlice'
import hotelReducer from '../page/components/Hotel/hotelSlice'
import orderReducer from '../page/components/Order/orderSlice'
import rootTabReducer from './rootSlice'
import newsReducer from '../page/components/News/newsSlice'
const rootReducer = combineReducers({
  topTour: topTourReducer,
  tourNational: tourNationalReducer,
  tourInterNational: tourInterNationalReducer,
  tour: tourAllReducer,
  car: carReducer,
  hotel: hotelReducer,
  tab: rootTabReducer,
  order: orderReducer,
  news: newsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
