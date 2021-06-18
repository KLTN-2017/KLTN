import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import './style.scss'
import { HomeOutlined } from '@ant-design/icons'
interface Props {
  data: { name: string; link: string }[]
}
const BreadCrumb = ({ data }: Props) => {
  const listItem = data.map((path, index) => (
    <Breadcrumb.Item key={index}>
      <Link to={`${path.link}`}>{path.name}</Link>
    </Breadcrumb.Item>
  ))
  return (
    <div className="bread-crumb">
      <HomeOutlined />
      <Breadcrumb separator=">">{listItem}</Breadcrumb>
    </div>
  )
}
export default BreadCrumb
