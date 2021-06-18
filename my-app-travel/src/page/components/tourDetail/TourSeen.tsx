import { Tour } from 'api/interface/tour'
import { RootState } from 'app/rootReducer'
import RateStatic from 'components/rate/RateStatic'
import Slide from 'components/slideCommon'
import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazyload'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleError } from 'utils/handleError'
import { getTourByListId } from '../../../api/tourApi/index'
interface Props {
  listTourId: number[]
}

const TourSeen = ({ listTourId }: Props) => {
  const [tourSeen, setTourSeen] = useState<Tour[]>([])
  const status = useSelector((state: RootState) => state.tour.relation.status)
  useEffect(() => {
    async function getTourSeen() {
      try {
        const listTourSeen = await getTourByListId(listTourId)
        setTourSeen(listTourSeen)
      } catch (error) {
        handleError(error)
      }
    }
    if (listTourId.length > 0)getTourSeen()
  }, [listTourId])

  const htmlData =
    tourSeen.length > 0 ? (
      tourSeen.map((value: Tour, index: number) => (
        <Link to={`/du-lich/${value.id}`}>
          <div key={index} className="tour" title={value.title}>
            <div className="img-location">
              <LazyLoad height={300}>
                <img
                  className="img"
                  src={value.img}
                  alt={value.title}
                  loading="lazy"
                />
              </LazyLoad>
              <p className="location">{value.map_maker}</p>
            </div>
            <div className="content">
              <p className="title-tour">{value.title.slice(0, 50)}...</p>
              <p className="note">
                <i className="far fa-bell"></i>
                {value.note_attack}
              </p>
              <div className="wrapp">
                <div>
                  <p>
                    <i className="far fa-calendar-alt"></i>
                    {value.date_start}
                  </p>
                  <p>
                    <i className="far fa-clock"></i>
                    {value.date_range}
                  </p>
                </div>
                <div>
                  <p>
                    <i className="fas fa-user-friends"></i>
                    {value.number_sit}
                  </p>
                  <p>
                    <i className="fas fa-dollar-sign"></i>
                    {value.price}
                  </p>
                </div>
              </div>
            </div>
            <div className="rate">
              <RateStatic value={parseInt(value.rate.split('-')[0])} />
            </div>
          </div>
        </Link>
      ))) : ''
      
  return (
    <div className="list-tour-relation">
      {status === 'loading' ? (
        <h1>Loading seen tour for you ....</h1>
      ) : (
        tourSeen.length > 3 ? <Slide data={tourSeen} /> : <>{htmlData}</>
      )}
    </div>
  )
}

export default TourSeen
