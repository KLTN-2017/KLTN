import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchListTour, clearTourInList, clearListData } from '../tourSlice'
import { RootState } from 'app/rootReducer'
import { useState } from 'react'
import PageNation from '../../../components/PageNation/PageNation'
import { deleteTourById } from '../../../api/tourApi/index'
import { notification } from 'antd'
import { Link } from 'react-router-dom'
import HtmlData from './listTour/HtmlData'
import FilterTour from './listTour/FiterTour'
import LoadingComponent from '../../../components/loading/Loading'
import { checkShowAction } from '../../../utils/checkAction'
const ListTour = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(1)
  const [listChecked, setListChecked] = useState<string[]>([])
  const filter = useSelector((state: RootState) => state.tour.filter)
  const data = useSelector((state: RootState) => state.tour.listData.rows)
  const countPage = useSelector((state: RootState) => state.tour.listData.count)
  useEffect(() => {
    dispatch(fetchListTour(page, filter))
    return function () {
      dispatch(clearListData())
    }
  }, [dispatch, filter, page])

  const deleteTour = async (id: string, title: string) => {
    await deleteTourById(parseInt(id))
    dispatch(clearTourInList(id))
    notification.success({
      message: `Xóa thành công tour:  ${title}`,
    })
  }

  return (
    <div className="list-tour">
      <div className="header-tour">
        {checkShowAction('createTour') && (
          <Link to="/du-lich/create">
            <i className="fas fa-plus-circle"></i>
          </Link>
        )}
        <FilterTour />
      </div>
      {data.length > 0 ? (
        <>
          <PageNation
            total={countPage}
            current={page}
            change={(e) => setPage(e)}
          />
          <div className="list-item">
            <HtmlData
              data={data}
              deleteTour={deleteTour}
              listChecked={listChecked}
              setListChecked={setListChecked}
            />
          </div>
          <PageNation
            total={countPage}
            current={page}
            change={(e) => setPage(e)}
          />
        </>
      ) : (
        <LoadingComponent title="Loading list tour..." />
      )}
    </div>
  )
}

export default ListTour
