import { handleError } from 'utils/handleError';
import axios from "axios"
import { toast } from "react-toastify"

export default async function getLocation(
  callBack: (location: { lat: number; lon: number; zone: string }) => void
) {
  try {
    const { data } = await axios.get('http://ip-api.com/json/')
    const { lat, lon, city } = data
    if (!navigator.geolocation) {
      toast.warn('Trình duyệt của bạn không hỗ trợ vị trí.')
      callBack({
        lat,
        lon,
        zone: city,
      })
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        callBack({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          zone: city,
        })
      },
      () => {
        toast.warn(
          'Bạn đã không chấp nhận cho cúng tôi truy cập vị trí của bạn nó sẽ có thể không chính xách một vài thông tin hãy làm mới trang để chấp nhận'
        )
        callBack({
          lat,
          lon,
          zone: city,
        })
      }
    )
  } catch (error) {
    handleError(error)
  }
}
