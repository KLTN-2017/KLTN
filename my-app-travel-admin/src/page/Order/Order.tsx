import React, { useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../../layout/Main'
import { setTab } from 'app/rootSlice'
import { useDispatch } from 'react-redux'
import { checkShowAction } from '../../utils/checkAction'
import ListOrder from './components/ListOrder'
import NotFound from '../NotFound/NotFound'
const Order = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTab(5))
  }, [dispatch])
  const { path } = useRouteMatch()
  return (
    <Layout>
      <Switch>
            {  checkShowAction('getPageOrder') && <Route path={path} exact>
                  <ListOrder />
        </Route>}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  )
}

export default Order
