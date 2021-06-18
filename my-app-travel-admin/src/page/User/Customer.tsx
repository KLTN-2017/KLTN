import { fectListPageCustomer, clearListCustomer } from './userSlice'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { RootState } from 'app/rootReducer'
import LoadingComponent from '../../components/loading/Loading'
import PageNation from '../../components/PageNation/PageNation'
import { checkShowAction } from '../../utils/checkAction'
const Customer = () => {
  const dispatch = useDispatch()
  const [page, setpage] = useState<number>(1)
  const listCustomer = useSelector(
    (state: RootState) => state.user.listCustomer
  )
  useEffect(() => {
    dispatch(fectListPageCustomer(page.toString()))
    return () => {
      dispatch(clearListCustomer())
    }
  }, [dispatch, page])
  const htmlData = listCustomer.rows.map((user) => (
    <div className="customer" key={user.id}>
      <span className="medium">{user.id}</span>
      <span className="medium">{user.username}</span>
      <span className="medium">{user.email}</span>
      <span className="medium">{user.date_of_birth?.slice(0,10)}</span>
      <span className="medium">{user.phone}</span>
      {checkShowAction('deleteCustomer') && (
        <span className="medium">
          <i className="fas fa-trash-alt"></i>
        </span>
      )}
    </div>
  ))
  return (
    <div className="list-customer">
      <h1>DANH SÁCH KHÁCH HÀNG</h1>
      {listCustomer.rows.length > 0 ? (
        <>
          <div className="title-customer">
            <span className="medium">id</span>
            <span className="medium">Tên đăng nhập</span>
            <span className="medium">Địa chỉ email</span>
            <span className="medium">Sinh nhật</span>
            <span className="medium">Số ĐT</span>
            {checkShowAction('deleteCustomer') && <span>Xóa</span>}
          </div>
          {htmlData}
          <PageNation
            total={listCustomer.count}
            current={page}
            change={setpage}
          />
        </>
      ) : (
        <LoadingComponent title="Loading list customer" />
      )}
    </div>
  )
}

export default Customer
