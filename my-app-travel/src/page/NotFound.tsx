import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './style/notFound.scss'
const NotFound = () => {
    const history = useHistory()
  return (
    <div className="notfound-page">
      <div className="content">
        <h1>404</h1>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/ha-uet-gateway.appspot.com/o/logo.png?alt=media"
          alt="logo"
        />
              <p>OPPS! PAGE NOT FOUND</p>
              <div className="detail">
                  Bạn đã truy cập vào đường link không tồn tại hoặc có thể do hệ thống có chút sự cố vui lòng quay lại trang chủ!
              </div>
              <div className="to-home-back">
                  <Link to="/">TRANG CHỦ</Link>
                  <button onClick={()=> history.goBack()}>QUAY LẠI</button>
              </div>
      </div>
    </div>
  )
}

export default NotFound
