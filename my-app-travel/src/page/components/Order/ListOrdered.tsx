
import { getUrlpay } from 'api/order'
import { RootState } from 'app/rootReducer'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleError } from 'utils/handleError'
import { deleteHistoryOrder, fetchlistHistoryOrder } from './orderSlice'
interface Props {
    book: string
}
const ListOrdered = ({book}: Props) => {
    const dispatch = useDispatch()
    useEffect(() => {
      if (book === 'history') dispatch(fetchlistHistoryOrder())
    }, [dispatch, book])
  
    const status = useSelector((state: RootState) => state.order.login)
      const listHitoryBook = useSelector(
        (state: RootState) => state.order.historyBook
      )
const clickPay = async (
  title: string,
  count: string,
  type: string,
  id: string,
  types: string
) => {
  try {
    const url = await getUrlpay(title, count, type.slice(0, 1), id, types)
    window.open(url, '_self')
  } catch (error) {
    handleError(error)
  }
}
  const htmlHistory =
    status === true ? (
      listHitoryBook.map((order, index) => (
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
              {order.count > 0
                ? order.count.toLocaleString() + ' VND'
                : 'Liên hệ'}
            </p>
            <p>
              <i className="fas fa-gem"></i>
              {order.pay_date ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </p>
          </div>
          {!order.pay_date && (
            <div className="clear">
              <i
                onClick={() =>
                  dispatch(deleteHistoryOrder(order.id, order.title))
                }
                className="fas fa-times"
              ></i>
              <img
                onClick={() =>
                  clickPay(
                    order.title,
                    order.count.toString(),
                    order.item_id,
                    order.id,
                    'momo'
                  )
                }
                src="https://minelayloi.com/wp-content/uploads/2018/04/a-400x332.jpg"
                alt="momo.png"
              />
              <img
                onClick={() =>
                  clickPay(
                    order.title,
                    order.count.toString(),
                    order.item_id,
                    order.id,
                    'vnpay'
                  )
                }
                src="https://downloadlogomienphi.com/sites/default/files/logos/download-logo-vector-vnpayqr-noqr-mien-phi.jpg"
                alt="Vnpay.png"
              />
              <img
                onClick={() =>
                  clickPay(
                    order.title,
                    order.count.toString(),
                    order.item_id,
                    order.id,
                    'zalopay'
                  )
                }
                src="https://cdn.chanhtuoi.com/uploads/2020/10/zalo-pay.jpg"
                alt="Zalopay.png"
              />
            </div>
          )}
        </li>
      ))
    ) : (
      <Link to="/login">Bạn cần đăng nhập để xem chi tiết</Link>
    )
    return <>{listHitoryBook ? htmlHistory : 'Bạn chưa đặt sản phẩm nào cả'}</>
}

export default ListOrdered
