import React, { useEffect } from 'react'
import Layout from '../../layout/Main'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import './user.scss'
import HomeUser from './conponent/HomeUser'
import Employee from './Employee'
import Customer from './Customer'
import { checkShowActionHome } from '../../utils/checkActionHome'
import NotFound from '../NotFound/NotFound'
import { setTab } from 'app/rootSlice'
import { useDispatch } from 'react-redux'
const PersonPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTab(4))
  }, [dispatch])
  const { path } = useRouteMatch()
  return (
    <Layout>
      <Switch>
        <Route path={path} exact>
          <HomeUser />
        </Route>
        {(checkShowActionHome('Role') ||
          checkShowActionHome('Employee') ||
          checkShowActionHome('Permission')) && (
          <Route path={`${path}/nhan-vien`}>
            <Employee />
          </Route>
        )}
        {checkShowActionHome('Customer') && (
          <Route path={`${path}/khach-hang`}>
            <Customer />
          </Route>
        )}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  )
}

export default PersonPage
