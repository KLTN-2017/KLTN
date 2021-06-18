import React, { useEffect, useState } from 'react'
import Layout from '../layout/Main'
import './style/weather.scss'
import { getSearchCity } from '../api/weather/index'
import { useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { WeatherItem } from '../api/interface/weather'
import {getWeatherByCity, getWeatherByLocation} from '../utils/getWeather'
const Weather = () => {
  const [city, setCity] = useState<string>('')
  const [citySearch, setCitySearch] = useState<string>('')
  const [focus, setFocus] = useState<boolean>(false)
  const [isFetch, setIsFetch] = useState(false)
  const location = useSelector((state: RootState) => state.tab.location)
  const [weatherCity, setWeatherCity] = useState<WeatherItem[]>([])
  const [listCity, setListCity] = useState<{ name: string; origin: string }[]>(
    []
  )
  useEffect(() => {
    async function getWeather() {
     await getWeatherByLocation(location, (data) => setWeatherCity(data))
    }
    if (city === '' && citySearch === '') getWeather()
  }, [location, city, citySearch])



  useEffect(() => {
    async function getWeather() {
      await getWeatherByCity(citySearch, (data) => setWeatherCity(data))
    }
    if(citySearch)getWeather()
  }, [citySearch])


  useEffect(() => {
    let myVar: any
    function myFunction() {
      myVar = city
        ? setTimeout(async () => {
            const data = await getSearchCity(city)
            setListCity(data || [])
            setIsFetch(false)
          }, 1000)
        : setListCity([])
    }
    function myStopFunction() {
      clearTimeout(myVar)
    }
    if (isFetch) {
      myStopFunction()
      myFunction()
    } else {
      setIsFetch(true)
      myFunction()
    }
    return () => {
      myStopFunction()
    }
  }, [city])
  const htmlWeather = weatherCity.map((item, index) => (
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
  ))

  const htmlCityDropDown = listCity.map((city, index) => (
    <li key={index} onClick={() => {
      setCitySearch(city.origin)
      setCity(city.name)
    }}>{city.name.toUpperCase()}</li>
  ))
  return (
    <Layout>
      <div className="weather-info">
        <h1>Thông tin thời tiết</h1>
        <div className="search-city">
          <input
            placeholder="Enter city name of location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setTimeout(() => setFocus(false), 500)}
          />
          <div className="drop-down-city">
            {focus && <ul>{htmlCityDropDown}</ul>}
          </div>
        </div>
        <h2>Dự bào thới tiết 5 ngày tới cho: {(citySearch.toUpperCase()) || location.zone}</h2>
        <div className="list-item-weather">
          {weatherCity.length > 0 && htmlWeather}
        </div>
      </div>
    </Layout>
  )
}

export default Weather
