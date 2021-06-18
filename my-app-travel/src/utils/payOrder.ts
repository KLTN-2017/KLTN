import { payOrder } from "api/order"
import { toast } from "react-toastify"

interface Params {
    setLoading: (isLoading: boolean) => void
    pushRoute: (path: string) => string
    titleSucess: string
    dataPay: { id: string, method: 'ZALOPAY' | 'MOMO' | 'VNPAY' }
    callBack: () => void
}
async function payOrderUser({setLoading, pushRoute, titleSucess, dataPay, callBack}: Params) {
  setLoading(true)
  await payOrder(dataPay.id, dataPay.method)
  setLoading(false)
  pushRoute('/order-item')
  toast.success(titleSucess,
    {
      autoClose: false,
    }
  )
  callBack()
}
export default payOrderUser
