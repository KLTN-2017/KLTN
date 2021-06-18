import React, { useEffect } from 'react'
import RouteApp from './RouteApp'
import LoadingOverLay from './LoadingOverLay'
import socket from './socket'
import 'antd/dist/antd.css'
import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './rootReducer'
const App = () => {
  const loading = useSelector((state: RootState) => state.tab.loading)
  useEffect(() => {
    socket.connect()
  }, [])
  useEffect(() => {
    socket.on('user-by', () => {})
  }, [])
  return (
    <div className="App">
      <RouteApp />
      {loading && <LoadingOverLay />}
    </div>
  )
}

export default App
