import { notification } from 'antd'

export const handleError = (error: any) => {
  // console.log(error.response.data.error, error.response.status)
  if (error.response) {
    const status = error.response.status
    if (
      status === 401 
    ) {
      notification.error({
        message: 'phiên làm việc của bạn đã hết',
      })
      setTimeout(
        () => (window.location.href = 'http://localhost:3000/dang-nhap'),
        2000
      )
    }
    if (status === 400 || status === 404)
      notification.warn({
        message: error.response.data.error,
      })
    else
      notification.error({
        message: error.response.data.error,
      })
  } else
    notification.error({
      message: 'Lỗi !',
      description:
        'Có vẻ hệ thống chúng tôi bị lỗi hoặc bạn không có kêt nối internet vui lòng kiểm tra lại !',
    })
}
