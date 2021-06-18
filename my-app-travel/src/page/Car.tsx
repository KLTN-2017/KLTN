import React, { useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../layout/Main'
import ListCar from './components/Car/ListCar'
import CarDetails from './CarDetail'
import './style/car.scss'
const PageCar = () => {
  useEffect(() => {
    document.title = 'Thêu xe du lich'
  }, [])
  const { path } = useRouteMatch()
  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <div className="body-car">
            <ListCar />
          </div>
        </Route>
        <Route exact path={`${path}/:carId`}>
          <CarDetails />
        </Route>
      </Switch>
    </Layout>
  )
}

export default PageCar
