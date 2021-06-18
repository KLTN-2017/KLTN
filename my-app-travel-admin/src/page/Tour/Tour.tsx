import React, { useEffect } from 'react'
import Layout from '../../layout/Main'
import ListTour from './components/ListTour'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import CreateTour from './CreateTour'
import UpdateTour from './UpdateTour'
import './tour.scss'
import { setTab } from 'app/rootSlice'
import { useDispatch } from 'react-redux'
import { checkShowAction } from '../../utils/checkAction'
import NotFound from '../NotFound/NotFound'
const TourPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTab(1))
  }, [dispatch])
  const { path } = useRouteMatch()
  return (
    <Layout>
      <Switch>
        <Route path={path} exact>
          <ListTour />
        </Route>
        {checkShowAction('createTour') && (
          <Route path={`${path}/create`}>
            <CreateTour />
          </Route>
        )}
        {checkShowAction('updateTour') && (
          <Route path={`${path}/update/:tourId`}>
            <UpdateTour />
          </Route>
        )}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  )
}

export default TourPage
