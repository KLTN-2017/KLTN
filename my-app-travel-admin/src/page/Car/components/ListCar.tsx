import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import PageNation from '../../../components/PageNation/PageNation'
import { Link } from 'react-router-dom'
import { fetchPageCar, clearListCar } from '../carSlice'
import CarItems from './CarItems'
import FiterCar from './FilterCar'
import LoadingComponent from '../../../components/loading/Loading'
import { checkShowAction } from '../../../utils/checkAction'
const ListTour = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(1)
  const filter = useSelector((state: RootState) => state.car.filter)
  const data = useSelector((state: RootState) => state.car.listData)
  useEffect(() => {
    dispatch(fetchPageCar(filter, page))
    return function () {
      dispatch(clearListCar())
    }
  }, [dispatch, filter, page])

  const htmlData = data.rows.map((car) => <CarItems car={car} key={car.id} />)
  return (
    <div className="list-car">
      <div className="header-car">
        <button>Chọn tất cả</button>
        <button>Xóa</button>
        {checkShowAction('createCar') && (
          <Link to="/theu-xe/create">
            <button>Tạo mới</button>
          </Link>
        )}
      </div>
      <FiterCar />
      {data.rows.length > 0 ? (
        <>
          <PageNation
            total={data.count}
            current={page}
            change={(e) => setPage(e)}
          />
          <div className="list-item">{htmlData}</div>
          <PageNation
            total={data.count}
            current={page}
            change={(e) => setPage(e)}
          />
        </>
      ) : (
        <LoadingComponent title="Loading list car" />
      )}
    </div>
  )
}

export default ListTour
