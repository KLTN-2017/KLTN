export const setListTourSeen = (tourId: string) => {
    let listTourSeen = JSON.parse(localStorage.getItem('tours') || '[]')
    if (!listTourSeen.includes(tourId)) {
      if (listTourSeen.length > 0) listTourSeen = listTourSeen.slice(0, 9)
      listTourSeen.unshift(tourId)
        const newListSeenTour = JSON.stringify(listTourSeen)
        localStorage.setItem('tours', newListSeenTour)
    }
}

export const getListIdTourSeen = () => {
  let listTourSeen = JSON.parse(localStorage.getItem('tours') || '[]')
  return listTourSeen.map((id: string) => parseInt(id))
}

export const setListCarSeen = (carId: string) => {
  let listCarSeen = JSON.parse(localStorage.getItem('cars') || '[]')
  if (!listCarSeen.includes(carId)) {
      if(listCarSeen.length > 10 ) listCarSeen = listCarSeen.slice(0,9)
      listCarSeen.unshift(carId)
      const newListSeenCar = JSON.stringify(listCarSeen)
      localStorage.setItem('cars', newListSeenCar)
  }
}

export const getListIdCarSeen = () => {
  let listCarSeen = JSON.parse(localStorage.getItem('cars') || '[]')
  return listCarSeen.map((id: string) => parseInt(id))
}

export const setListHotelSeen = (hotelId: string) => {
  let listHotelSeen = JSON.parse(localStorage.getItem('hotels') || '[]')
  if (!listHotelSeen.includes(hotelId)) {
      if(listHotelSeen.length > 10)listHotelSeen = listHotelSeen.slice(0,9)
      listHotelSeen.unshift(hotelId)
      const newListSeenHotel = JSON.stringify(listHotelSeen)
      localStorage.setItem('hotels', newListSeenHotel)
  }
}