import React from 'react'
import './index.css'
const ProvinceNational = () => {
  return (
    <div className="province-national">
      <h1>THIÊN ĐƯỜNG DU LỊCH TRONG NƯỚC</h1>
      <div className="img">
        <img
          src="https://cdn.baogiaothong.vn/files/tuan.phuc/2017/05/05/cau-ham-rong-lich-su-duoc-xay-dung-nhu-the-nao-9-103359.jpg"
          alt={'Thanh Hoa'}
          className="img-big"
          loading="lazy"
        />
        <div className="img-small">
          <img
            src="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/ho-guom.jpg"
            alt="Ha noi"
            loading="lazy"
          />
          <img
            src="http://divui.com/blog/wp-content/uploads/2018/10/111111.jpg"
            alt="Da Nang"
          />
          <img
            src="http://divui.com/blog/wp-content/uploads/2018/10/111111.jpg"
            alt="Da Nang"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

export default ProvinceNational
