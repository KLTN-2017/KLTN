import React from 'react'
import './index.css'
import { Tour } from '../../api/interface/tour'
import LazyLoad from 'react-lazyload'
import Slider from 'react-slick'
import useSettingSlide from 'useHook/useSettingSlide'
import { Link } from 'react-router-dom'
import RateStatic from 'components/rate/RateStatic'
interface Props {
  data: Tour[]
}

const Slide = ({ data }: Props) => {
 
  const settings = useSettingSlide()
  return (
    <Slider {...settings}>
      {data.map((value, index) => (
        <Link to={`/du-lich/${value.id}`} key={index}>
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
              <RateStatic
                value={value.rate ? parseFloat(value.rate.split('-')[0]) : 5}
              />
            </div>
          </div>
        </Link>
      ))}
    </Slider>
  )
}

export default Slide
