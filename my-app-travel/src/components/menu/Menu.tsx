import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import './menu.css'
const Menu = () => {
  const tab = useSelector((state: RootState) => state.tab.tab)
  const [menu, setMenu] = useState<string>('fas fa-bars')
  const menuItems = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Du lịch',
      path: '/du-lich',
    },
    {
      title: 'Khách sạn',
      path: '/khach-san',
    },
    {
      title: 'Thêu xe',
      path: '/theu-xe',
    },
    {
      title: 'Tin tức',
      path: '/tin-tuc',
    },
    {
      title: 'Thời tiết',
      path: '/thoi-tiet',
    },
    {
      title: 'Giới thiệu',
      path: '/gioi-thieu',
    },
  ]
  const ulElement = menuItems.map((data, index) => (
    <li key={index} >
      <Link to={data.path} className={tab === index ? 'active' : ''}>
        {data.title}
      </Link>
    </li>
  ))
  const changeMenu = () => {
    menu === 'fas fa-bars' ? setMenu('fa fa-times') : setMenu('fas fa-bars')
  }
  return (
    <div>
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className={menu} onClick={changeMenu}></i>
        </label>
        <label className="logo">
          <Link to="/">VietTravelUet</Link>
        </label>
        <ul>
          {ulElement}
        </ul>
      </nav>
    </div>
  )
}
export default Menu
