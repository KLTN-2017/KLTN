import { Tour } from 'api/interface/tour'
import { RootState } from 'app/rootReducer'
import Slide from 'components/slideCommon'
import React from 'react'
import { useSelector } from 'react-redux'

interface Props {
  tourRelation: Tour[]
}

const TourRelation = ({ tourRelation }: Props) => {
  const status = useSelector((state: RootState) => state.tour.relation.status)
    return (
      <div className="list-tour-relation">
        {status === 'loading' ? (
          <h1>Loading realation tour for you ....</h1>
        ) : (
          <Slide data={tourRelation} />
        )}
      </div>
    )
}


export default TourRelation