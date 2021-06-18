import React, { useEffect } from 'react'
import Layout from '../../layout/Main'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ListCar from './components/ListCar'
import CreateCar from './CreateCar'
import UpdateCar from './UpdateCar'
import './car.scss'
import { setTab } from 'app/rootSlice'
import { useDispatch } from 'react-redux'
import { checkShowAction } from '../../utils/checkAction'
import NotFound from '../NotFound/NotFound'
const CarPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTab(3))
  }, [dispatch])
  const { path } = useRouteMatch()
  return (
    <Layout>
      <Switch>
        <Route path={path} exact>
          <ListCar />
        </Route>
        {checkShowAction('createCar') && (
          <Route path={`${path}/create`}>
            <CreateCar />
          </Route>
        )}
        {checkShowAction('updateCar') && (
          <Route path={`${path}/update/:carId`}>
            <UpdateCar />
          </Route>
        )}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  )
}

export default CarPage
