import React from 'react'
import { Car } from '../../../api/interface/car'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import confirm from 'react-alert-confirm'
import { deleteCarOfList } from '../carSlice'
import { useDispatch } from 'react-redux'
import { checkShowAction } from '../../../utils/checkAction'
interface Props {
  car: Car
}
const CarItems = ({ car }: Props) => {
  const dispatch = useDispatch()
  const confirmDeleteCar = (id: number, title: string) => {
    confirm({
      title: `Bạn có chắc muốn xóa`,
      content: <p>{title}</p>,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => dispatch(deleteCarOfList(id, title)),
    })
  }
  return (
    <div className="car-tems">
      <LazyLoad height={300}>
        <img src={car.src} alt={car.title} />
      </LazyLoad>
      <div className="info-car">
        <h2>{car.title}</h2>
        <p>
          <i className="fas fa-air-freshener"></i>
          {car.brand}
        </p>
        <p>
          <i className="fas fa-users"></i>
          {car.cartype}
        </p>
        <p>
          <i className="far fa-calendar-alt"></i>
          {car.vehiclelife}
        </p>
      </div>
      <div className="action">
        {checkShowAction('updateCar') && (
          <Link to={`/theu-xe/update/${car.id}`}>
            <i className="fas fa-edit"></i>
          </Link>
        )}
        {checkShowAction('deleteCar') && (
          <i
            onClick={() => confirmDeleteCar(parseInt(car.id), car.title)}
            className="fas fa-trash-alt"
          ></i>
        )}
      </div>
    </div>
  )
}

export default CarItems
