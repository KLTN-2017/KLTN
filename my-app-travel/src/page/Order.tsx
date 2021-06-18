import React, { useEffect, useState } from 'react'
import './style/order.scss'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../layout/Main'
import { useHistory } from 'react-router-dom'
import { submitBookOrder } from '../api/order/index'
import { clearListBook } from './components/Order/orderSlice'
import { RootState } from 'app/rootReducer'
import { BookCreate } from 'api/interface/order'
import { payOrder } from '../api/order/index'
import { toast } from 'react-toastify'
import { setLoading } from 'app/rootSlice'
import useQuery from 'useHook/useQuery'
import ListOrder from './components/Order/ListOrder'
import ListOrdered from './components/Order/ListOrdered'
const Order = () => {
  let query = useQuery()
  const history = useHistory()
  const dispatch = useDispatch()
  const [book, setBook] = useState<string>('now')
  const listData = useSelector((state: RootState) => state.order.listBook)
  const listHitoryBook = useSelector(
    (state: RootState) => state.order.historyBook
  )
  const failPay = (title: string) => {
    history.push('/order-item')
    toast.error(title, {
      autoClose: false,
    })
    setBook('history')
  }
  const payOrderUser = async (id: string, method:string) => {
    dispatch(setLoading(true))
    await payOrder(id, method)
    dispatch(setLoading(false))
    history.push('/order-item')
    toast.success(
      `Thanh toán thành công với ${method} vui lòng kiểm tra email của bạn`,
      {
        autoClose: false,
      }
    )
    setBook('history')
  }

  useEffect(() => {
    async function payOrderMomo() {
      await payOrderUser(query.get('orderId')?.split('-')[0] || '', 'MOMO')
    }
    async function payOrderVnpay() {
      await payOrderUser(query.get('vnp_OrderInfo')?.split('-')[0] || '', 'VNPAY')
      
    }
    async function payOrderZaloPay() {
      await payOrderUser(
        query.get('apptransid')?.split('_')[1].split('-')[0] || '', 'ZALOPAY')
    }

    if (query.get('errorCode') === '0' && query.get('orderId')) payOrderMomo()
    else if (query.get('errorCode') && query.get('errorCode') !== '0')
      failPay(`Lỗi thanh toán với Momo ${query.get('localMessage')}`)
    else if (
      query.get('vnp_ResponseCode') === '00' &&
      query.get('vnp_OrderInfo')
    )
      payOrderVnpay()
    else if (
      query.get('vnp_ResponseCode') &&
      query.get('vnp_ResponseCode') !== '00'
    )
      failPay('Lỗi thanh toán với VNpay')
    else if (query.get('appid') === '554' && query.get('status') === '1')
      payOrderZaloPay()
    else if (query.get('appid') === '554' && query.get('status') !== '1')
      failPay('Lỗi thanh toán với Viettel Pay')
  }, [dispatch])

  const bookTour = async (
    listOrder: BookCreate[],
    callback: () => void,
    callbackOk: () => void
  ) => {
    await submitBookOrder(listOrder, callback, callbackOk)
  }
  const sum =
    book === 'now'
      ? listData.map((order) => order.count).reduce((a, b) => a + b, 0)
      : listHitoryBook.map((order) => order.count).reduce((a, b) => a + b, 0)
  const changeType = () => {
    const type = book === 'now' ? 'history' : 'now'
    setBook(type)
  }
  return (
    <Layout>
      <div className="order-details">
        <h1>{book === 'now' ? 'Danh sách đặt hàng:' : 'Lịch sử mua hàng.'}</h1>
        <p>Giá trị tổng đơn hàng: {sum.toLocaleString()} VND</p>
        <div className="status-order">
          <button onClick={changeType}>
            {book !== 'now' ? 'Danh sách đặt hàng:' : 'Lịch sử mua hàng.'}
          </button>
        </div>
        {book === 'now' ? (
          <ListOrder />
        ) : <ListOrdered book={book} />}
        {listData.length > 0 && book === 'now' && (
          <div className="book">
            <button
              onClick={() =>
                bookTour(
                  listData,
                  () => history.push('/login'),
                  () => dispatch(clearListBook())
                )
              }
            >
              Đặt sản phẩm
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Order
