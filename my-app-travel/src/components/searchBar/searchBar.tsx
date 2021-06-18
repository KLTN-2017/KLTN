import { RootState } from 'app/rootReducer'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import {
  fetchSearchTour,
  setSearchUser,
  fetchSearchCar,
  fetchSearchHotel,
  fetchSearchNews
} from '../../page/components/Tour/TourSlice'
import './search.scss'
import Speed from './Speed'
import delayFetchData from 'utils/debounce'
const SearchBar = () => {
  const { path } = useRouteMatch()
  const history = useHistory()
  const dispatch = useDispatch()
  const refSearch = useRef<HTMLInputElement | null>(null)
  const listTourSearch = useSelector(
    (state: RootState) => state.tour.tourSearch
  )
  const search = useSelector((state: RootState) => state.tour.search)
  const [isFetch, setIsFetch] = useState(false)
  const [focus, setFocus] = useState<boolean>(false)
  const fetchData = (search: string) => {
    switch (path) {
      case '/du-lich':
        dispatch(fetchSearchTour(search))
        break
      case '/theu-xe':
        dispatch(fetchSearchCar(search))
        break
      case '/khach-san':
        dispatch(fetchSearchHotel(search))
        break
      case '/tin-tuc':
        dispatch(fetchSearchNews(search))
        break
      default:
        break
    }
  }
  useEffect(() => {
    delayFetchData({
      search,
      fetchData: (search: string) => fetchData(search),
      setFetch: (value: boolean) => setIsFetch(value),
      isFetch,
    })
  }, [search.trim(), dispatch])
  const speedCheck =
    'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  
  const keyPressSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search !== '' && path === '/du-lich') {
      dispatch(setSearchUser(search))
      setFocus(false)
      history.push(`/tim-kiem`)
    }
  }
  const listSearch = listTourSearch.map((tour) => (
    <Link to={`${path}/${tour.id}`} key={tour.id}>
      {tour.title}
    </Link>
  ))
  const setText = (text: string) => {
    setFocus(true)
    refSearch.current?.focus()
    dispatch(setSearchUser(text))
  }
  return (
    <div className="search-bar">
      <div className="location">
        <div>
          <span>Hotel or Destination</span>
          <input
            ref={refSearch}
            type="text"
            placeholder="where are you going?"
            value={search}
            onChange={(e) => dispatch(setSearchUser(e.target.value))}
            onKeyPress={keyPressSearch}
            onFocus={() => setFocus(true)}
            onBlur={() =>
              setTimeout(() => {
                setFocus(false)
              }, 500)
            }
          />
        </div>
      </div>
     {speedCheck && <Speed setText={(text: string)=> setText(text)} />}
      {listTourSearch.length > 0 && search !== '' && focus === true && (
        <ul className="list-search">{listSearch}</ul>
      )}
    </div>
  )
}

export default SearchBar
