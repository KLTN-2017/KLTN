import { setTab } from 'app/rootSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../layout/Main'
import ActionRoute from './components/ListActionRoute'
import './system.scss'
const System = () => {
const dispatch = useDispatch()
useEffect(() => {
  dispatch(setTab(7))
}, [dispatch])
  return <Layout>
    <ActionRoute />
  </Layout>
}

export default System
