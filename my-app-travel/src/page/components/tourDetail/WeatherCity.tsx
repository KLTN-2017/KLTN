import React from 'react'
import { WeatherItem } from "api/interface/weather"
import { useEffect, useState } from "react"
import { getWeatherByCity } from "utils/getWeather"
import Slider from 'react-slick'
import useWindowSize from '../../../useHook/widthBrowser'
interface Props {
    city: string
}
const WeatherCity = ({ city }: Props) => {
    const [weatherCity, setWeatherCity] = useState<WeatherItem[]>([])
    useEffect(() => {
      async function getWeather() {
        await getWeatherByCity(city || '', (data) => setWeatherCity(data))
      }
      if (city) getWeather()
    }, [city])

    const htmlWeather = weatherCity.length > 0 ? weatherCity.map((item, index) => (
      <div key={index} className="item">
        <p className="main">
          {item.main} - {item.description}
        </p>
        <img
          src={`http://openweathermap.org/img/w/${item.icon}.png`}
          alt={item.icon}
        />
        <p className="temp">
          {(item.temp - 273.5).toFixed(2)}
          <sup>&deg;C</sup>
        </p>
        <p className="temp">
          {(item.temp_max - 273.5).toFixed(2)} -{' '}
          {(item.tem_min - 273.5).toFixed(2)}
          <sup>&deg;C</sup>
        </p>
        <p className="cloud-wind"> clouds: {item.clouds}</p>
        <p className="cloud-wind">wind: {item.wind}</p>
        <p className="time">{item.time}</p>
      </div>
    )) : <h1>Hệ thống chưa cập nhật được thành phố hiện tại</h1>
     const [width] = useWindowSize()
     const countSlide = width > 1700 ? 4 : width > 800 ? 3 : 1
     const settings = {
       dots: false,
       infinite: true,
    //    centerMode: width > 1700,
       speed: 200,
       slidesToShow: countSlide,
       slidesToScroll: countSlide,
     }
    return (
      <div className="list-item-weather">
        {weatherCity.length > 0 && (
          <h1>Dự báo thời tiết 5 ngày tới cho khu vực: {city.toUpperCase()}</h1>
        )}
        <Slider {...settings}>{htmlWeather}</Slider>
      </div>
    )
}

export default WeatherCity

