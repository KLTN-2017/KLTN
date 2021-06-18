import React, { useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Layout from '../../layout/Main'
import CreateNews from './CreateNews'
import UpdateNews from './UpdateNews'
import ListNews from './ListNews'
import './news.scss'
import { setTab } from 'app/rootSlice'
import { useDispatch } from 'react-redux'
import { checkShowAction } from '../../utils/checkAction'
import NotFound from '../NotFound/NotFound'
const News = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTab(6))
  }, [dispatch])
  const { path } = useRouteMatch()
  return (
    <Layout>
      <Switch>
        <Route path={path} exact>
          <ListNews />
        </Route>
        {checkShowAction('createNews') && (
          <Route path={`${path}/tao-tin`}>
            <CreateNews />
          </Route>
        )}
        {checkShowAction('updateNews') && (
          <Route path={`${path}/update/:newsId`}>
            <UpdateNews />
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
