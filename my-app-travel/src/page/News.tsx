import React from 'react'
import Layout from '../layout/Main'
import ListNews from './components/News/ListNews'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import NewsDetail from './components/News/NewsDetail'
import './style/news.scss'
const News = () => {
const { path } = useRouteMatch()
  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
            <ListNews />
        </Route>
        <Route  path={`${path}/:newsId`}>
          <NewsDetail />
        </Route>
      </Switch>
    </Layout>
  )
}

export default News
