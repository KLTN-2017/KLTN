import React from 'react'

import './banner.css'
const Banner = () => {
  return (
    <div className="banner">
      <div className="sub-banner" title="Dulich">
        <i className="fas fa-people-carry"></i>
        <p>DU LICH</p>
      </div>
      <div className="sub-banner">
        <i className="fas fa-car"></i>
        <p>THEU XE</p>
      </div>
      <div className="sub-banner">
        <i className="fas fa-hotel"></i>
        <p>KHACH SAN</p>
      </div>
      <div className="sub-banner">
        <i className="fas fa-fighter-jet"></i>
        <p>VE MAY BAY</p>
      </div>
    </div>
  )
}

export default Banner
