import React, { useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../../layout/Main'
import ListHotel from './components/ListHotel'
import CreateHotel from './CreateHotel'
import UpdateHotel from './UpdateHotel'
import './hotel.scss'
import { setTab } from 'app/rootSlice'
import { useDispatch } from 'react-redux'
import { checkShowAction } from '../../utils/checkAction'
import NotFound from '../NotFound/NotFound'
const News = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTab(2))
  }, [dispatch])
  const { path } = useRouteMatch()
  return (
    <Layout>
      <Switch>
        <Route path={path} exact>
          <ListHotel />
        </Route>
        {checkShowAction('createHotel') && (
          <Route path={`${path}/tao-khach-san`}>
            <CreateHotel />
          </Route>
        )}
        {checkShowAction('updateHotel') && (
          <Route path={`${path}/update/:hotelId`}>
            <UpdateHotel />
          </Route>
        )}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  )
}

export default News
