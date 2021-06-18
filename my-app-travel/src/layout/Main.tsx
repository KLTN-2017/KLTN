import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import Header from '../components/header/Header'
import Menu from '../components/menu/Menu'
import Slide from '../components/slideshow/Slide'
import Banner from '../components/banner/Banner'
import SearchBar from '../components/searchBar/searchBar'
import Footer from '../components/footer/Footer'
import ScrollToTop from 'react-scroll-up'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Chat from 'components/chat/Chat'
interface LayoutChild {
  children: JSX.Element[] | JSX.Element | string
}
const Layout = ({ children }: LayoutChild) => {
  const { path } = useRouteMatch()
  console.log(path)
  return (
    <div className="App">
      <Header />
      <Menu />
      <div className="slide">
        <Slide />
        <div className="search">
          {(path !== '/thoi-tiet' &&  path !== '/gioi-thieu') && <SearchBar />}
        </div>
      </div>
      {path === '/' && <Banner />}
      <div className="body">{children}</div>
      
      <div className="app-footer">
        <Footer />
      </div>
      <ScrollToTop showUnder={160}>
        <i className="fab fa-autoprefixer"></i>
      </ScrollToTop>
      <Chat />
    </div>
  )
}

export default Layout
