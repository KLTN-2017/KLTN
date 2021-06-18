import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from '../page/Home/Home'
import PageTour from '../page/Tour/Tour'
import News from '../page/News/News'
import Introduce from '../page/Introduce/Introduce'
import Car from '../page/Car/Car'
import Hotel from '../page/Hotel/Hotel'
import User from '../page/User/User'
import Login from '../page/Login/Login'
import NotFound from '../page/NotFound/NotFound'
import System from '../page/System/System'
import Order from '../page/Order/Order'
import { checkShowActionHome } from '../utils/checkActionHome'

const RouteApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        {checkShowActionHome('Tour') && (
          <Route path="/du-lich">
            <PageTour />
          </Route>
        )}
        {checkShowActionHome('Car') && (
          <Route path="/theu-xe">
            <Car />
          </Route>
        )}
        {checkShowActionHome('Hotel') && (
          <Route path="/khach-san">
            <Hotel />
          </Route>
        )}
        {checkShowActionHome('News') && (
          <Route path="/tin-tuc">
            <News />
          </Route>
        )}
        {checkShowActionHome('Introduce') && (
          <Route path="/gioi-thieu">
            <Introduce />
          </Route>
        )}
        {checkShowActionHome('Order') && (
          <Route path="/hoa-don">
            <Order />
          </Route>
        )}
        {(checkShowActionHome('Customer') ||
          checkShowActionHome('Role') ||
          checkShowActionHome('Permission') ||
          checkShowActionHome('Employee')) && (
          <Route path="/nhan-su">
            <User />
          </Route>
        )}
        {checkShowActionHome('System') && (
          <Route path="/he-thong">
            <System />
          </Route>
        )}

        <Route path="/dang-nhap">
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
