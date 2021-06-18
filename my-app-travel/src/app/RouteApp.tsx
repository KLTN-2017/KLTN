import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from '../page/Home'
import PageTour from '../page/Tour'
import PageCar from '../page/Car'
import PageHotel from '../page/Hotel'
import Login from '../page/Login'
import Order from '../page/Order'
import News from '../page/News'
import Introduce from '../page/Intoduce'
import SearchTour from '../page/SearchTour'
import CheckCode from '../page/CheckCode'
import Weather from '../page/Weather'
import NotFound from '../page/NotFound'
const RouteApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/du-lich">
          <PageTour />
        </Route>
        <Route path="/theu-xe">
          <PageCar />
        </Route>
        <Route path="/khach-san">
          <PageHotel />
        </Route>
        <Route path="/order-item">
          <Order />
        </Route>
        <Route path="/tin-tuc">
          <News />
        </Route>
        <Route path="/gioi-thieu">
          <Introduce />
        </Route>
        <Route path="/tim-kiem">
          <SearchTour />
        </Route>
        <Route path="/thoi-tiet">
          <Weather />
        </Route>
        <Route path="/check-code">
          <CheckCode />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}

export default RouteApp
