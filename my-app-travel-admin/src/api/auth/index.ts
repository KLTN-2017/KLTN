import { axiosApi } from '../axios'
import { handleError } from '../../utils/handleError'
import { setUser, clearUser } from '../../utils/localStorage'

export const login = async (
  res: any,
  callBack: () => void,
  setLoading: (loading: boolean) => void
): Promise<void> => {
  try {
    setLoading(true)
     const { data } = await axiosApi.post('/api-auth-admin/login-google', {
       tokenId: res.tokenId,
     })
    setTimeout(() => {
      setLoading(false)
      callBack()
    }, 3000)
    console.log(data)
    setUser(data.username, data.action)
  } catch (error) {
    setLoading(false)
    handleError(error)
  }
}

export const logout = async (callback: () => void) => {
  try {
    await axiosApi.post('/api-auth/logout')
    clearUser()
    callback()
  } catch (error) {
    handleError(error)
  }
}

export const checkLogin = async (callback: () => void) => {
  try {
    await axiosApi.post('/api-auth-admin/check-login')
  } catch (error) {
    handleError(error)
  }
}
