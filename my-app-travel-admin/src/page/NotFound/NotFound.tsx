import React, { useEffect } from 'react'
import { setTab } from 'app/rootSlice'
import { useDispatch } from 'react-redux'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'
const CarPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTab(-1))
  }, [dispatch])
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  )
}

export default CarPage
