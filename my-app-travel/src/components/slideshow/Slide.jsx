import React from 'react'
import Slider from 'react-slick'
import './slide.css'
const Slide = () => {
  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    autoplay: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  }
  return (
    <Slider {...settings}>
      <div>
        <h3>
          <img
            src="https://pacificislandliving.com/wp-content/uploads/2020/02/destination-kiribati.jpg"
            alt={'slide1'}
          />
        </h3>
      </div>
      <div>
        <h3>
          <img
            src="https://pystravel.vn/uploads/posts/avatar/1591263433.jpg"
            alt={'slide1'}
          />
        </h3>
      </div>
      <div>
        <h3>
          <img
            src="https://bloganchoi.com/wp-content/uploads/2020/06/bien-muii-nai.jpg"
            alt={'slide1'}
          />
        </h3>
      </div>
      <div>
        <h3>
          <img
            src="https://pacificislandliving.com/wp-content/uploads/2020/02/destination-kiribati.jpg"
            alt={'slide1'}
          />
        </h3>
      </div>
      <div>
        <h3>
          <img
            src="https://pacificislandliving.com/wp-content/uploads/2020/02/destination-kiribati.jpg"
            alt={'slide1'}
          />
        </h3>
      </div>
      <div>
        <h3>
          <img
            src="https://pystravel.vn/uploads/posts/avatar/1591263433.jpg"
            alt={'slide1'}
          />
        </h3>
      </div>
      <div>
        <h3>
          <img
            src="https://bloganchoi.com/wp-content/uploads/2020/06/bien-muii-nai.jpg"
            alt={'slide1'}
          />
        </h3>
      </div>
      <div>
        <h3>
          <img
            src="https://pacificislandliving.com/wp-content/uploads/2020/02/destination-kiribati.jpg"
            alt={'slide1'}
          />
        </h3>
      </div>
    </Slider>
  )
}
export default Slide
