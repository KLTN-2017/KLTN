import { notification } from 'antd'
import { handleError } from './../../utils/handleError'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAllActionRoute, addActionRoute } from 'api/system'
import { AppThunk } from 'app/store'
import { ActionRoute } from '../../api/interface/actionRoute'
import { getListPermission } from 'api/rolePermission'
import { setloading } from 'app/rootSlice'
interface InitialState {
  listActionRoute: ActionRoute[]
  count: number
  listPermission: { name: string }[]
}

const initialState: InitialState = {
  listActionRoute: [],
  count: 0,
  listPermission: [],
}

const systemSlice = createSlice({
  name: 'systemSlice',
  initialState,
  reducers: {
    setListActionRoute(state, action: PayloadAction<ActionRoute[]>) {
      state.listActionRoute = action.payload
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload
    },
    clearAction(state) {
      state.count = 0
      state.listActionRoute = []
    },
    setListPermission(state, action: PayloadAction<{ name: string }[]>) {
      state.listPermission = action.payload
    },
    clearListPermission(state) {
      state.listPermission = []
    },
    addRouteToList(state, action: PayloadAction<ActionRoute>) {
      state.listActionRoute = [...state.listActionRoute, action.payload]
    },
  },
})

export const {
  setCount,
  setListActionRoute,
  clearAction,
  setListPermission,
  addRouteToList,
} = systemSlice.actions
export const fetchListActionRoute = (): AppThunk => async (dispatch) => {
  try {
    const listdata = await getAllActionRoute()
    dispatch(setListActionRoute(listdata))
    dispatch(setCount(listdata.length))
  } catch (error) {
    handleError(error)
  }
}

export const fectListPermission = (): AppThunk => async (dispatch) => {
  try {
    const listPermission = await getListPermission()
    dispatch(setListPermission(listPermission))
  } catch (error) {
    handleError(error)
  }
}

export const createRouteAction = (
  routeAction: ActionRoute,
  callBack: () => void
): AppThunk => async (dispatch) => {
  try {
      if (routeAction.action && routeAction.link && routeAction.method) {
        dispatch(setloading(true))
        await addActionRoute(routeAction)
        dispatch(addRouteToList(routeAction))
        dispatch(setloading(false))
        notification.success({
          message: 'Tạo thành công',
          description: routeAction.link,
        })
        callBack()
      }
      else notification.warn({
          message: 'Bạn chưa điền đủ thông tin'
      })
  } catch (error) {
    dispatch(setloading(false))
    handleError(error)
  }
}

export default systemSlice.reducer
