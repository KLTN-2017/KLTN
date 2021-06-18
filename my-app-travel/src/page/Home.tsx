import React from 'react'
import TopTour from './components/Home/topTour/TopTour'
import TourNational from './components/Home/tourNational/TourNational'
import ProvinceNational from './components/Home/provinceNational/index'
import TourInterNational from './components/Home/tourInterNational/TourInterNational'
import Layout from '../layout/Main'
import Weather from '../components/weatherLocation/Weather'
const HomePage = () => {
  return (
    <Layout>
      <TopTour />
      <TourNational />
      <ProvinceNational />
      <TourInterNational />
      <Weather />
    </Layout>
  )
}

export default HomePage
