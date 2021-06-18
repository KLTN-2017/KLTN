import React, { useState } from 'react'
import DatePicker from 'react-date-picker'
import { TourDetail } from 'api/interface/tour'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { book } from '../../../utils/bookTour'
import { useDispatch} from 'react-redux'
import {addNum} from '../../components/Order/orderSlice'
interface Props {
  data: TourDetail
}
const Info = ({ data }: Props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [dateBook, setDateBook] = useState<Date>(new Date())
  const bookTour = () => {
    if (localStorage.getItem("role")) {
      toast.warn('You must login ')
      history.push('/login')
    }
    else {
     const result = book({
       item_id: 'T'+data.id,
       order_date: `${
        dateBook.getDate() > 9 ? dateBook.getDate() : '0' + dateBook.getDate()
      }-${
        dateBook.getMonth() > 9
          ? dateBook.getMonth()
          : '0' + dateBook.getMonth()
      }-${dateBook.getFullYear()}`,
       img: data.img,
       title: data.title,
       count: parseInt(data.price),
     })
      
      if (result) dispatch(addNum())
    }
  }
  return (
    <div className="detail-info">
      <div className="info">
        <h3>{data.title}</h3>
        <ul>
          <li>
            <label>Mã tour: </label> T-{data.id}
          </li>
          <li>
            <label>Thời gian: </label> {data.date_range} Ngày
          </li>
          <li>
            <label>Khởi hành: </label> {data.date_start}
          </li>
          <li>
            <label>Vận chuyển: </label> xe du lich
          </li>
          <li>
            <label>Xuất phát: </label> {data.map_maker}
          </li>
        </ul>
      </div>
      <div className="book-tour">
        <p>Giá chỉ từ: {data.price} VNĐ</p>
        <DatePicker
          value={dateBook}
          onChange={(e) => setDateBook(Array.isArray(e) ? e[0] : e)}
          minDate={new Date()}
        />
        <button onClick={bookTour}>ĐẶT TOUR</button>
      </div>
    </div>
  )
}

export default Info
