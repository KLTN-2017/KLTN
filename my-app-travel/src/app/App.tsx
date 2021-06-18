import React, { useEffect } from 'react'
import RouteApp from './RouteApp'
import socket from './socket'
import './App.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '../components/loadingOverlay/LoadingAll'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './rootReducer'
import { setLocation } from './rootSlice'
import getLocation from 'utils/geolocation'

const App = () => {
  const loading = useSelector((state: RootState) => state.tab.loading)
  const location = useSelector((state: RootState) => state.tab.location)
  const dispatch = useDispatch()

  useEffect(() => {
    if (location.zone === '')
      getLocation((location: { lat: number; lon: number; zone: string }) =>
        dispatch(setLocation(location))
      )
  }, [location.zone, dispatch])
  useEffect(() => {
    socket.connect()
  }, [])
  useEffect(() => {
    socket.on('user-by', (email: string, title: string) => {
           toast.warning(`🦄 ${email} - ${title}`, {
             position: 'top-center',
             autoClose: 3000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
           })
    })
  }, [])
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouteApp />
      { loading && <Loading />}
    </div>
  )
}

export default App
