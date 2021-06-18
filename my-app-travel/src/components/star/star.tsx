import React from 'react'
import './star.scss'
interface Props {
  star: number
}
const Star = ({ star }: Props) => {
  const array = []
  for (let i = 0; i < star; i++) {
    array.push(i)
  }
  const html = array.map((value, index) => (
    <i className="fas fa-star" key={index}></i>
  ))
  return <div className="list-star">{html}</div>
}

export default Star
