import React from 'react'
import './header.scss'
import { logout } from '../../api/auth/index'
import { useHistory } from 'react-router-dom'
import { getAllActionOfUserCurrent } from '../../api/rolePermission/index'
import { useDispatch } from 'react-redux'
import { setloading } from 'app/rootSlice'
const Header = () => {
  const userName = localStorage.getItem('user')
  const dispatch = useDispatch()
  const history = useHistory()
  const reloadAction = async () => {
    dispatch(setloading(true))
    await getAllActionOfUserCurrent(() => dispatch(setloading(false)))
  }
  return (
    <div className="header">
      <div className="phone">
        Hotline: <a href="tel:+84837536630">190061709</a>
      </div>
      <div className="space"></div>
      <div className="info-user-shop">
        {userName && (
          <>
            <i className="fas fa-user-alt">
              <ul className="dropdown-user-info">
                <li onClick={() => logout(() => history.push('/dang-nhap'))}>
                  Logout
                </li>
                <li onClick={reloadAction}>Reload Action</li>
              </ul>
            </i>
            <span>{userName}</span>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
