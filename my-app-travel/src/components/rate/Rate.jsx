import React from 'react'
import StarRatings from 'react-star-ratings'

const RateStar = (props) => {
    return (
      <StarRatings
        rating={props.value}
        starRatedColor="yellow"
        changeRating={(star) => props.change(star)}
        name="rating"
        starDimension="30px"
        starSpacing="5px"
      />
    )
}

export default RateStar