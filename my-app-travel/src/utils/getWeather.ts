import { WeatherItem } from "api/interface/weather"
import axios from "axios"

export async function getWeatherByLocation( {lat, lon}:{lat:number, lon: number}, callBack: (data: WeatherItem[]) => void): Promise<void> {
  const { data } = await axios(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=67d617eeb7fc160e06a64507fe4b7fe9`
  )
  const listWeather = data.list.map((item: any) => ({
    time: item.dt_txt,
    icon: item.weather[0].icon,
    temp: item.main.temp,
    temp_max: item.main.temp_max,
    tem_min: item.main.temp_min,
    main: item.weather[0].main,
    description: item.weather[0].description,
    clouds: item.clouds.all,
    wind: item.wind.speed,
  }))
  callBack(listWeather)
}

export async function getWeatherByCity(city: string, callBack: (data: WeatherItem[]) => void): Promise<void> {
  const { data } = await axios(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=67d617eeb7fc160e06a64507fe4b7fe9`
  )
  const listWeather = data.list.map((item: any) => ({
    time: item.dt_txt,
    icon: item.weather[0].icon,
    temp: item.main.temp,
    temp_max: item.main.temp_max,
    tem_min: item.main.temp_min,
    main: item.weather[0].main,
    description: item.weather[0].description,
    clouds: item.clouds.all,
    wind: item.wind.speed,
  }))
  callBack(listWeather)
}
