import React, { useEffect, useState } from 'react'
import { fetchPageHotel, clearListHotel } from '../hotelSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import PageNation from '../../../components/PageNation/PageNation'
import { Link } from 'react-router-dom'
import ItemHotel from './ItemHotel'
import LoadingComponent from '../../../components/loading/Loading'
import FilterHotel from '../components/FilterHotel'
import { checkShowAction } from '../../../utils/checkAction'
const ListHotel = () => {
  const [page, setPage] = useState<number>(1)
  const filter = useSelector((state: RootState) => state.hotel.filter)
  const listData = useSelector((state: RootState) => state.hotel.listData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPageHotel(filter, page))
    return function () {
      dispatch(clearListHotel())
    }
  }, [dispatch, filter, page])
  const htmlData = listData.rows.map((hotel) => (
    <ItemHotel hotel={hotel} key={hotel.id} />
  ))
  console.log('aciton create hotel', checkShowAction('createHotel'))
  return (
    <div className="list-hotel">
      <FilterHotel />
      <span className="create-hotel">
        {checkShowAction('createHotel') && (
          <Link to="/khach-san/tao-khach-san">
            <i className="fas fa-plus-circle"></i>
          </Link>
        )}
      </span>
      {listData.rows.length > 0 ? (
        <>
          <PageNation
            total={listData.count}
            current={page}
            change={(e) => setPage(e)}
          />
          <div className="list-item">{htmlData}</div>
          <PageNation
            total={listData.count}
            current={page}
            change={(e) => setPage(e)}
          />
        </>
      ) : (
        <LoadingComponent title="Loading list hotel..." />
      )}
    </div>
  )
}

export default ListHotel
