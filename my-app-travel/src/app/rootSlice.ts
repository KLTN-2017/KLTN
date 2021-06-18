import { AppThunk } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login, loginGoogle, loginFacebook } from '../api/auth/index'
import { AuthData } from '../api/interface/auth'
import { toast } from 'react-toastify'
interface DataStore {
  tab: number
  user: {
    email: string | undefined
    role: string | undefined
    id: number | undefined | null
  }
  login: boolean,
  location: {
    lat: number,
    lon: number,
    zone: string
  },
  loading: boolean

}
const initialState: DataStore = {
  tab: 0,
  user: {
    email: '',
    role: '',
    id: null,
  },
  login: false,
  location: {
    lat: 0,
    lon: 0,
    zone: ''
  },
  loading: false
}
const rootSlice = createSlice({
  name: 'rootSlice',
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<number>) {
      state.tab = action.payload
    },
    setLogin(
      state,
      action: PayloadAction<{
        email: string | undefined
        role: string | undefined
        id: number | undefined
      }>
    ) {
      state.login = true
      state.user = action.payload
    },
    setLogout(state) {
      state.login = false
      state.user.id = null
      state.user.role = ''
      state.user.email = ''
    },
    setLocation(state, action: PayloadAction<{lat: number, lon: number, zone: string}>) {
      state.location = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }

  },
})
export const { setTab, setLogin, setLogout, setLocation, setLoading } = rootSlice.actions

export const userLogin = async (data: AuthData, callback: ()=> void)=> {
  try {
    const result = await login(data)
    if (result.auth === 'ok')
    {
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: result.id ? result.id.toString() : '',
          role: result.role ? result.role : '',
          email: result.email ? result.email : '',
        })
      )
      callback()
    }
  } catch (error) {
    toast.error(error.response.data.auth)
  }
}

export const userLoginGoogle = (
  res: any,
  callback: () => void,
):AppThunk => async (dispatch)=> {
  try {
    dispatch(setLoading(true))
    const result = await loginGoogle(res)
    if (result.auth === 'ok') {
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: result.id ? result.id.toString() : '',
          role: result.role ? result.role : '',
          email: result.email ? result.email : '',
        })
      )
      dispatch(setLoading(false))
      callback()
    }
  } catch (error) {
    dispatch(setLoading(false))
    console.log(error)
    toast.error(error.message)
  }
}


export const userLoginFaceBook = (res: any, callback: () => void):AppThunk => async(dispatch) => {
  try {
    dispatch(setLoading(true))
    const result = await loginFacebook(res)
    if (result.auth === 'ok') {
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: result.id ? result.id.toString() : '',
          role: result.role ? result.role : '',
          email: result.email ? result.email : '',
        })
      )
      callback()
    }
    dispatch(setLoading(false))
  } catch (error) {
    dispatch(setLoading(false))
    toast.error(error.response.data.auth)
  }
}




export default rootSlice.reducer
