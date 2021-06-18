import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { checkShowActionHome } from 'utils/checkActionHome'
import './menu.css'
const Menu = () => {
  const tab = useSelector((state: RootState) => state.tab.tab)
  const [menu, setMenu] = useState<string>('fas fa-bars')
  const menuItems = [
    {
      title: 'Home',
      path: '/',
      name: ''
    },
    {
      title: 'Du lịch',
      path: '/du-lich',
      name: 'Tour'
    },
    {
      title: 'Khách sạn',
      path: '/khach-san',
      name: 'Hotel'
    },
    {
      title: 'Thêu xe',
      path: '/theu-xe',
      name: 'Car'
    },
    {
      title: 'Nhân sự',
      path: '/nhan-su',
      name: 'Employee'
    },
    {
      title: 'Hóa đơn',
      path: '/hoa-don',
      name: 'Order'
    },
    {
      title: 'Tin tức',
      path: '/tin-tuc',
      name: 'News'
    },
    {
      title: 'Hệ thống',
      path: '/he-thong',
      name: 'System'
    },
    {
      title: 'Giới thiệu',
      path: '/gioi-thieu',
      name: 'Introduce'
    },
  ]
  const ulElement = menuItems.map((data, index) => (
    checkShowActionHome(data.name) && <li key={index}>
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
        <ul>{ulElement}</ul>
      </nav>
    </div>
  )
}
export default Menu
