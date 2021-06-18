import { Spin } from 'antd'
import React from 'react'
import './loading.scss'
interface Props {
  title: string
}
const LoadingComponent = ({ title }: Props) => {
  return (
    <div className="loading">
      <Spin tip={title} size="large"></Spin>
    </div>
  )
}

export default LoadingComponent
