import { handleError } from './../../utils/handleError';
import { axiosApi } from '../axios'
import { AuthData, AuthResult, CreateUser } from '../interface/auth'

export const login = async (dataAuth: AuthData): Promise<AuthResult> => {
    const { data } = await axiosApi.post('/api-auth/login', dataAuth)
    return data
}

export const logout = async () => {
   await axiosApi.post('/api-auth/logout')
}

export const loginGoogle = async (res: any): Promise<AuthResult> => {
  const { data } = await axiosApi.post('api-auth/login-google', {
    tokenId: res.tokenId,
  })
  return data
}

export const loginFacebook = async (res: any): Promise<AuthResult> => {
  const { data } = await axiosApi.post('api-auth/login-facebook', {
    accessToken: res.accessToken,
    id: res.id,
  })
  return data
}

export const register = async (user: CreateUser): Promise<AuthResult> => {
  const { data } = await axiosApi.post('/api-auth/create-user',user )
  return data
}

export const checkCode = async (code : string, callBack: ()=> void): Promise<void> => {
  try {
    await axiosApi.post('/api-auth/check-code-user', {code})
    callBack()
  } catch (error) {
    handleError(error)
  }
}