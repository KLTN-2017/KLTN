import { RootState } from 'app/rootReducer'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearBook, getOrderLocalStorage } from 'utils/bookTour'
import { clearOrderByTitle, setListBook } from './orderSlice'

const ListOrder = () => {
   
  const dispatch = useDispatch()
   useEffect(() => {
     const listBook = getOrderLocalStorage()
     dispatch(setListBook(listBook))
   }, [dispatch])
   const listData = useSelector((state: RootState) => state.order.listBook)
    const clearBookOrder = (item_id: string,title: string) => {
    clearBook(item_id,title)
    dispatch(clearOrderByTitle(item_id))
  }
    const html = listData.map((order, index) => (
    <li key={index} className="order-item">
      <img src={order.img} alt={order.title} />
      <div className="info-order">
        <p className="title">{order.title}</p>
        <p>
          <i className="fas fa-globe-africa"></i>
          {order.item_id}
        </p>
        <p>
          <i className="far fa-calendar-check"></i>
          {order.order_date}
        </p>
        <p>
          <i className="fas fa-money-bill-wave"></i>
          {order.count > 0 ? order.count.toLocaleString() + ' VND' : 'Liên hệ'}
        </p>
      </div>
      <div className="clear">
        <i
          onClick={() => clearBookOrder(order.item_id, order.title)}
          className="fas fa-times"
        ></i>
      </div>
    </li>
  ))
    return (
        <>
            {html}
        </>
    )
}

export default ListOrder