import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../layout/Main'
import BodyTour from './components/Tour/BodyTour'
import TourDetails from './TourDetail'
import './style/tour.scss'
const PageTour = () => {
  const { path } = useRouteMatch()
  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <div className="body-tour">
            <BodyTour title="Danh sách tour du lịch" />
          </div>
        </Route>
        <Route exact path={`${path}/:tourId`}>
          <TourDetails />
        </Route>
      </Switch>
    </Layout>
  )
}

export default PageTour
