import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/header/Header'
import Menu from '../components/menu/Menu'
import Slide from '../components/slideshow/Slide'
import Footer from '../components/footer/Footer'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { BackTop, Button } from 'antd'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import BreadCrumb from '../components/Breadcrumb/ Breadcrumb'
interface LayoutChild {
  children: JSX.Element[] | JSX.Element | string
}
const Layout = ({ children }: LayoutChild) => {
  const { pathname } = useLocation()
  const arrayLink = pathname.split('/')
  const data = arrayLink.map((path, index) => ({
    name: path ? path : 'Home',
    link: arrayLink.slice(0, index + 1).join('/'),
  }))
  return (
    <div className="App">
      <Header />
      <Menu />
      <div className="slide">
        <Slide />
      </div>
      <BreadCrumb data={data} />
      <div className="body">{children}</div>
      <div className="app-footer">
        <Footer />
      </div>
      <BackTop>
        <Button type="primary">
          <VerticalAlignTopOutlined
            style={{ fontSize: '20px', color: '#fff' }}
          />
        </Button>
      </BackTop>
    </div>
  )
}

export default Layout
