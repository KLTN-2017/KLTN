import React from 'react'
import { Hotel } from '../../../api/interface/hotel'
import { Link } from 'react-router-dom'
import confirm from 'react-alert-confirm'
import { Rate } from 'antd'
import { deleteHotelByid } from '../hotelSlice'
import { useDispatch } from 'react-redux'
import { checkShowAction } from '../../../utils/checkAction'
interface Props {
  hotel: Hotel
}
const ItemHotel = ({ hotel }: Props) => {
  const dispatch = useDispatch()
  const confirmDeleteHotel = (id: string, title: string) => {
    confirm({
      title: `Bạn có chắc muốn xóa`,
      content: <p>{title}</p>,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => dispatch(deleteHotelByid(id, title)),
    })
  }
  return (
    <div className="item-hotel">
      <img src={hotel.img} alt={hotel.title} />
      <div className="info-hotel">
        <h2>{hotel.title}</h2>
        <span>
          <i className="fas fa-map-marker-alt"></i>
          {hotel.location}
        </span>
        <span>
          <i className="fas fa-money-bill-wave"></i>
          {hotel.pirce} VND
        </span>
        <span>
          <Rate disabled defaultValue={parseInt(hotel.star)} />
        </span>
      </div>
      <div className="action">
        {checkShowAction('updateHotel') && (
          <Link to={`/khach-san/update/${hotel.id}`}>
            <i className="fas fa-edit"></i>
          </Link>
        )}
        {checkShowAction('deleteHotel') && (
          <i
            onClick={() => confirmDeleteHotel(hotel.id, hotel.title)}
            className="fas fa-trash-alt"
          ></i>
        )}
      </div>
    </div>
  )
}

export default ItemHotel
