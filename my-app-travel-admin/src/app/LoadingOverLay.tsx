import { Spin } from 'antd'
import React from 'react'
const LoadingOverLay = () => {
  return (
    <div className="loading-overlay">
      <Spin tip="Vui lòng đợi trong giây lát" size="large"></Spin>
    </div>
  )
}

export default LoadingOverLay
