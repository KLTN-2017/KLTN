import React from 'react'
import { Link } from 'react-router-dom'

const HomeUser = () => {
  return (
    <div className="home-user">
      <h1>Quản trị nhân sự</h1>
      <div className="list-manage">
        <Link to="/nhan-su/khach-hang">
          <div className="customer">
            <i className="fas fa-users"></i>
            <span>KHÁCH HÀNG</span>
          </div>
        </Link>
        <Link to="nhan-su/nhan-vien">
          <div className="employee">
            <i className="fas fa-users-cog"></i>
            <span>NHÂN VIÊN</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default HomeUser
