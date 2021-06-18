import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from 'app/rootReducer'
import  {
  fetchPageCar,
  clearListCar,
  clearListTypeCar,
  clearListNumberSit,
  clearListYear,
  setpage,
} from './carSlice'
import PageNation from '../../../components/PageNation/PageNation'
import FilterCar from './FiterCar'
import ReactLoading from 'react-loading'
import './listCar.scss'
import Nodata from '../../../components/Nodata/Nodata'
const ListCar = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: RootState) => state.car.data)
  const total = useSelector((state: RootState) => state.car.count)
  const filter = useSelector((state: RootState) => state.car.filter)
  const page = useSelector((state: RootState) => state.car.pageCurrent)
  const loading = useSelector((state: RootState) => state.car.loading)
  useEffect(() => {
    dispatch(fetchPageCar(filter, page))
    return function () {
      dispatch(clearListCar())
    }
  }, [dispatch, page, filter])
  useEffect(() => {
    return function () {
      dispatch(clearListTypeCar())
      dispatch(clearListNumberSit())
      dispatch(clearListYear())
    }
  }, [dispatch])
  const html = data?.map((value, index) => (
    <div key={index} className="item-car" title={value.title}>
      <Link to={`/theu-xe/${value.id}`}>
        <div className="img-car">
          <p className="contact">{value.price.toLocaleString()} VND</p>
          <img src={value.src} alt={value.title} />
        </div>
        <div className="info-car">
          <h3>{value.title.toUpperCase().slice(0, 33)}...</h3>
          <hr />
          <div className="info-car-detail">
            <span>
              <i className="fas fa-user-friends"></i>
              {value.cartype}
            </span>
            <span>
              <i className="fas fa-car"></i>
              {value.brand.slice(0, 7)}
            </span>
            <span>
              <i className="far fa-calendar-alt"></i>
              {value.vehiclelife}
            </span>
            <span>Xem chi tiết</span>
          </div>
        </div>
      </Link>
    </div>
  ))
  return (
    <>
      <div className="img-logo">
        <h1>Danh sách xe cho thêu du lịch</h1>
        <img
          src="https://media.autoexpress.co.uk/image/private/s--ym5V-M14--/v1606771333/autoexpress/2020/11/best-sports-cars.jpg"
          alt="logo-car"
        />
      </div>
      <div className="title-list">
        <div className="title-list-car">
          Xe du lịch – Phòng vận chuyển công ty Du Lịch Việt cung cấp và mang
          đến cho quý khách dịch vụ cho thuê xe du lịch, thuê xe dịch vụ với giá
          cực tốt. Chúng tôi cho thuê xe đời mới, thuê xe hoa, thuê xe Land
          Cruiser, thuê xe Audi A4, thuê xe Audi A6, cho thuê xe Audi R8, thuê
          xe A8, thuê xe Q5, thuê xe Q7. Hay dịch vụ thuê xe đám cưới, thuê xe
          Sienna, thuê xe Sedona, thuê xe Limousine, thuê xe Universe, thuê xe
          Limousine dcar, E200, E250, S400, S450, S500 từ 4 đến 47 chỗ của tất
          cả các hãng.
        </div>
        <div className="filter-car">
          <FilterCar />
        </div>
      </div>
      <div className="list-car">
        {data.length > 0 ? (
          html
        ) : (
         loading === true ?  <div className="loading">
            <ReactLoading type="spin" color="blue" height={100} width={75} />
          </div> : <Nodata alert="Không tìm thấy xe" />
        )}
        {total && (
          <PageNation
            total={total}
            current={page}
            change={(page: number) => {
              dispatch(setpage(page))
            }}
          />
        )}
      </div>
    </>
  )
}

export default ListCar
