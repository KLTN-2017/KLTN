import React from 'react'
import StarRatings from 'react-star-ratings'

const RateStatic = (props) => {
  return (
    <StarRatings
      rating={props.value}
      starRatedColor="yellow"
      name="rating"
      starDimension={props.size || "20px"}
      starSpacing={props.space || "2px"}
    />
  )
}

export default RateStatic
