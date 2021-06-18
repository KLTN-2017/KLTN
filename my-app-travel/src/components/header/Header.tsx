import React, { useEffect, useState } from 'react'
import './header.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import {
  setNum,
  subNum,
  setListBook,
  clearOrderByTitle,
} from '../../page/components/Order/orderSlice'
import { getOrderLocalStorage, clearBook } from '../../utils/bookTour'
import { Link } from 'react-router-dom'
import {logout} from '../../api/auth/index'
const Header = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setNum(getOrderLocalStorage().length))
    dispatch(setListBook(getOrderLocalStorage()))
  }, [dispatch])
  const jsonUser = localStorage.getItem('user')
  const user = jsonUser ? JSON.parse(jsonUser) : null
  const [users, setUser] = useState(user)
  const num = useSelector((state: RootState) => state.order.numBook)
  const clearOrder = (item_id: string, title: string) => {
    clearBook(item_id, title)
    dispatch(subNum())
    dispatch(clearOrderByTitle(title))
  }
  const html = () => {
    const data = getOrderLocalStorage()
    return data.map((order, index) => (
      <li key={index}>
        <img src={order.img} alt={'img'} />
        <p>{order.title}</p>
        <i
          onClick={() => clearOrder(order.item_id, order.title)}
          className="fas fa-times"
        ></i>
      </li>
    ))
  }
  const logoutUser = async () => {
    await logout()
    localStorage.removeItem('user')
    setUser(null)
    window.location.reload()
  }
  return (
    <div className="header">
      <div className="phone">
        Hotline: <a href="tel:+84837536630">190061709</a>
      </div>
      <div className="space"></div>
      <div className="info-user-shop">
         
          <i className="fas fa-user-alt">
            <ul className="dropdown-user-info">
              {users ? (
                <>
                  <li>{users.email}</li>
                  <li>{users.role}</li>
                <li onClick={logoutUser}>
                    Logout
                  </li>
                </>
              ) : (
                <li><Link to="/login">Login</Link></li>
              )}
            </ul>
          </i>
        
        <Link to="/order-item">
          <i className="fas fa-cart-plus">
            {num > 0 && <span>{num}</span>}
            <ul className="list-cart">{html()}</ul>
          </i>
        </Link>
      </div>
    </div>
  )
}

export default Header
