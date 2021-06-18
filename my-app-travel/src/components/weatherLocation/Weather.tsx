import { RootState } from 'app/rootReducer'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './style.scss'
const Weather = () => {
    const location = useSelector((state: RootState) => state.tab.location)
    const [weather, setWeather] = useState<any>({})
    useEffect(() => {
      async function getWeather() {
        const { data } = await axios(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=67d617eeb7fc160e06a64507fe4b7fe9`
        )
        setWeather(data)
        }
        getWeather()
            const interVal = setInterval(() => getWeather(), 10 * 60 * 1000)
        return () => clearInterval(interVal)
        
    }, [location])
    const htmlData = (
      <>
        <h1>
          {weather.name} - {weather.sys?.country}
        </h1>

        {weather.weather && (
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt={'icon'}
          />
        )}
        <p>
          {(parseFloat(weather.main?.temp || 0) - 273.5).toFixed(2)}{' '}
          <sup>&deg;C</sup>
        </p>
        <p>
          {(parseFloat(weather.main?.temp_min || 0) - 273.5).toFixed(2)}{' '}
           -{' '}
          {(parseFloat(weather.main?.temp_max || 0) - 273.5).toFixed(2)}{' '}
          <sup>&deg;C</sup>
        </p>
        <p>{weather.weather && weather.weather[0].main}</p>
        <p>{weather.weather && weather.weather[0].description}</p>
      </>
    )
    return (
      <div className="weather-user">
        {location.zone && (
          <>
            <h1>Thời tiết hiện tại của khu vực bạn</h1>
            <div className="detail">{htmlData}</div>
          </>
        )}
      </div>
    )
}

export default Weather