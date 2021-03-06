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
            <span>Xem chi ti???t</span>
          </div>
        </div>
      </Link>
    </div>
  ))
  return (
    <>
      <div className="img-logo">
        <h1>Danh s??ch xe cho th??u du l???ch</h1>
        <img
          src="https://media.autoexpress.co.uk/image/private/s--ym5V-M14--/v1606771333/autoexpress/2020/11/best-sports-cars.jpg"
          alt="logo-car"
        />
      </div>
      <div className="title-list">
        <div className="title-list-car">
          Xe du l???ch ??? Ph??ng v???n chuy???n c??ng ty Du L???ch Vi???t cung c???p v?? mang
          ?????n cho qu?? kh??ch d???ch v??? cho thu?? xe du l???ch, thu?? xe d???ch v??? v???i gi??
          c???c t???t. Ch??ng t??i cho thu?? xe ?????i m???i, thu?? xe hoa, thu?? xe Land
          Cruiser, thu?? xe Audi A4, thu?? xe Audi A6, cho thu?? xe Audi R8, thu??
          xe A8, thu?? xe Q5, thu?? xe Q7. Hay d???ch v??? thu?? xe ????m c?????i, thu?? xe
          Sienna, thu?? xe Sedona, thu?? xe Limousine, thu?? xe Universe, thu?? xe
          Limousine dcar, E200, E250, S400, S450, S500 t??? 4 ?????n 47 ch??? c???a t???t
          c??? c??c h??ng.
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
          </div> : <Nodata alert="Kh??ng t??m th???y xe" />
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
