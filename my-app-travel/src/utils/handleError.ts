import { toast } from 'react-toastify'

export const handleError = (error: any) => {
  if (error.response) {
    const status = error.response.status
      if (status === 401)
        
      toast.warn(
        error.response.data.error
      )
    else
      toast.error(
        error.response.data.error,
      )
  } else
    toast.error(
     
        'Có vẻ hệ thống chúng tôi bị lỗi hoặc bạn không có kêt nối internet vui lòng kiểm tra lại !',
    )
}
