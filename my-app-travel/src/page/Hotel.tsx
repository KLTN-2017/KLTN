import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../layout/Main'
import ListHotel from './components/Hotel/ListHotel'
import HotelDetail from './HotelDetail'
import './style/hotel.scss'
const PageCar = () => {
  const { path } = useRouteMatch()
  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <div className="body-hotel">
            <ListHotel />
          </div>
        </Route>
        <Route exact path={`${path}/:hotelId`}>
          <HotelDetail />
        </Route>
      </Switch>
    </Layout>
  )
}

export default PageCar
