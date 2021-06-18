import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchListOrderCustomer,
  clearListData,
  updateListOrderCustomer,
} from '../orderSlice'
import { RootState } from 'app/rootReducer'
import PageNation from '../../../components/PageNation/PageNation'
import ModalFilter from '../components/ModalFIlter'
import { Button, DatePicker, Empty } from 'antd'
import './listOrder.scss'
import { DefaultFilterOrder, FilterOrder } from 'api/interface/order'
import ChartOrder from './ChartOrder'
const ListOrder = () => {
  const [showChart, setShowChart] = useState<boolean>(false)
  const [page, setpage] = useState<number>(1)
  const [isShow, setShow] = useState<boolean>(false)
  const filter = useSelector((state: RootState) => state.order.filter)
  const listOrder = useSelector((state: RootState) => state.order.listOrder)
  const [filterCurrent, setCurrentFilter] = useState<FilterOrder>(
    DefaultFilterOrder
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchListOrderCustomer(page, filter))
    return () => {
      dispatch(clearListData())
    }
  }, [dispatch, page, filter])
  const changePayDate = (id: string, date: any, dateString: string) => {
    dispatch(updateListOrderCustomer(id, dateString))
  }
  const dataFilter = (
    <div className="filter-value">
      {Object.values(filterCurrent).some((value) => value !== '') && (
        <div>
          <h3>Giá trị bộ lọc </h3>
          {filterCurrent.type && <p></p>}
          {filterCurrent.user_id && (
            <p>Email khách hàng: {filterCurrent.user_id}</p>
          )}
          {filterCurrent.type && <p>Loại đơn hàng: {filterCurrent.type}</p>}
          {filterCurrent.isPay && (
            <p>Hình thức thanh toán: {filterCurrent.isPay}</p>
          )}
        </div>
      )}
    </div>
  )
  const htmlData = listOrder.rows.map((order) => (
    <div className="item-order" key={order.id}>
      <span>{order.id}</span>
      <span>{order.user_id}</span>
      <span>{order.item_id}</span>
      <img src={order.img} alt={order.title} />
      <span className="big">{order.title}</span>
      <span className="medium">{order.order_date.slice(0, 10)}</span>
      <span className="medium">
        {order.pay_date ? (
          order.pay_date.slice(0, 10)
        ) : (
          <DatePicker
            onChange={(e, date) => changePayDate(order.id, e, date)}
            defaultValue={undefined}
          />
        )}
      </span>
      <span className="medium">{order.count.toLocaleString()} VND</span>
      <span>{order.pay_method}</span>
    </div>
  ))
  htmlData.unshift(
    <div className="item-order title">
      <span>id</span>
      <span>UserId</span>
      <span>ItemId</span>
      <span className="medium">Ảnh</span>
      <span className="big">Nội dung</span>
      <span className="medium">Ngày đặt</span>
      <span className="medium">Ngày thanh toán</span>
      <span className="medium">Giá tiền</span>
      <span>Hình thức</span>
    </div>
  )
  return (
    <div className="list-order">
      <h1>Danh sách hóa đơn </h1>
      <Button
        onClick={()=> setShowChart(true)}
        type="primary"
      >Xem biểu đồ</Button>
      <p>Tổng doanh thu: {listOrder.sum?.toLocaleString()} VND</p>
      <p>Tổng số đơn hàng: {listOrder.count?.toLocaleString()}</p>
      <div className="filter">
        <i className="fas fa-print"></i>
        <i
          onClick={() => setShow(true)}
          className="fas fa-align-justify"
          title="Lọc order"
        ></i>
      </div>
      {dataFilter}

      {listOrder.count === 0 && listOrder.loading === false ? (
        <Empty />
      ) : (
        <div className="body">
          {htmlData}
          <PageNation
            total={listOrder.count}
            current={page}
            change={setpage}
            pagSize={30}
          />
        </div>
      )}
      <ChartOrder isShow={showChart} setShowChart={setShowChart} />
      <ModalFilter
        isShow={isShow}
        setShow={setShow}
        setFilterMain={setCurrentFilter}
      />
    </div>
  )
}

export default ListOrder
