import { handleError } from './../../utils/handleError'
import { Permission } from './../../api/interface/permission'
import { ListCustomer, ListEmployee, Employee, EmployeeCreate } from './../../api/interface/user'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import {
  getPageCustomer,
  getPageEmployee,
  updateRoleOfEmployee,
  deleteEmployee,
  createEmployee,
} from '../../api/user/index'
import {} from '../../utils/handleError'
import {
  getListPermission,
  getListRole,
  createRolePermission,
  createPermission,
  deletePermission,
  deleteRole,
  getAllActionOfRole,
} from '../../api/rolePermission/index'
import { Role, RolePermission } from '../../api/interface/role'
import { notification } from 'antd'
import { setloading } from '../../app/rootSlice'

import {validateEmail} from '../../utils/validateEmail'

interface DataStore {
  listCustomer: ListCustomer
  listEmployee: ListEmployee
  listPermission: { name: string }[]
  listRole: Role[]
  listActionOfRole: { permission: string }[]
  role: string
}

const initialState: DataStore = {
  listCustomer: {
    rows: [],
    count: 0,
  },
  listEmployee: {
    count: 0,
    rows: [],
  },
  listPermission: [],
  listRole: [],
  listActionOfRole: [],
  role: '',
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setListCustomer(state, action: PayloadAction<ListCustomer>) {
      state.listCustomer = action.payload
    },
    clearListCustomer(state) {
      state.listCustomer = {
        rows: [],
        count: 0,
      }
    },
    setListEmployee(state, action: PayloadAction<ListEmployee>) {
      state.listEmployee = action.payload
    },
    clearListEmployee(state) {
      state.listEmployee = {
        rows: [],
        count: 0,
      }
    },
    addEmployeeToList(state, action: PayloadAction<Employee>) {
      state.listEmployee.rows = [...state.listEmployee.rows, action.payload]
      state.listEmployee.count += 1
    },
    setListPermission(state, action: PayloadAction<{ name: string }[]>) {
      state.listPermission = action.payload
    },
    addToListPermission(state, action: PayloadAction<Permission[]>) {
      state.listPermission = [...state.listPermission, ...action.payload]
    },
    removeListPermission(state, action: PayloadAction<string>) {
      state.listPermission = state.listPermission.filter(
        (per) => per.name !== action.payload
      )
    },
    clearListPermission(state) {
      state.listPermission = []
    },
    setListRole(state, action: PayloadAction<Role[]>) {
      state.listRole = action.payload
    },
    addRole(state, action: PayloadAction<Role>) {
      state.listRole = [...state.listRole, action.payload]
    },
    removeRole(state, action: PayloadAction<string>) {
      state.listRole = state.listRole.filter(
        (role) => role.role !== action.payload
      )
    },
    clearListRole(state) {
      state.listRole = []
    },
    setListActionOfRole(
      state,
      action: PayloadAction<{ permission: string }[]>
    ) {
      state.listActionOfRole = action.payload
    },
    clearListActionOfRole(state) {
      state.listActionOfRole = []
    },
    setRole(state, action: PayloadAction<string>) {
      state.role = action.payload
    },
    clearRole(state) {
      state.role = ''
    },
    changeRoleOfListEmployee(
      state,
      action: PayloadAction<{ id: string; role: string }>
    ) {
      state.listEmployee.rows = state.listEmployee.rows.map((employee) =>
        employee.id === action.payload.id
          ? { ...employee, role: action.payload.role }
          : employee
      )
    },
    clearEmployOfList(state, action: PayloadAction<string>) {
      state.listEmployee.rows = state.listEmployee.rows.filter(
        (employee) => employee.id !== action.payload
      )
      state.listEmployee.count -= 1
    },
  },
})

export const {
  setListCustomer,
  setListEmployee,
  clearListCustomer,
  clearListEmployee,
  setListPermission,
  clearListPermission,
  setListRole,
  addRole,
  removeRole,
  clearListRole,
  addToListPermission,
  removeListPermission,
  setListActionOfRole,
  clearListActionOfRole,
  setRole,
  clearRole,
  changeRoleOfListEmployee,
  clearEmployOfList,
  addEmployeeToList
} = userSlice.actions

export const fectListPageCustomer = (page: string): AppThunk => async (
  dispatch
) => {
  try {
    const listCustomer = await getPageCustomer(page)
    dispatch(setListCustomer(listCustomer))
  } catch (error) {
    handleError(error)
  }
}

export const fectListPageEmployee = (page: string): AppThunk => async (
  dispatch
) => {
  try {
    const listEmployee = await getPageEmployee(page)
    dispatch(setListEmployee(listEmployee))
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

export const fectListRole = (): AppThunk => async (dispatch) => {
  try {
    const listRole = await getListRole()
    dispatch(setListRole(listRole))
  } catch (error) {
    handleError(error)
  }
}

export const createNewRole = (
  listData: RolePermission[],
  callBack: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(setloading(true))
    await createRolePermission(listData)
    dispatch(addRole({ role: listData[0].role }))
    dispatch(setloading(false))
    callBack()
    notification.success({
      message: `Tạo thành công ${listData[0].role}`,
    })
  } catch (error) {
    dispatch(setloading(false))
    notification.error({
      message: `Lỗi tạo chức vụ ${listData[0].role}`,
    })
    handleError(error)
  }
}

export const updateRole = (
  listData: RolePermission[],
  callBack: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(setloading(true))
    await createRolePermission(listData)
    dispatch(setloading(false))
    callBack()
    notification.success({
      message: `Cập nhật thành công ${listData[0].role}`,
    })
  } catch (error) {
    dispatch(setloading(false))
    notification.error({
      message: `Lỗi cập nhật chức vụ ${listData[0].role}`,
    })
    handleError(error)
  }
}

export const createNewPermission = (
  listData: Permission[],
  callBack: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(setloading(true))
    await createPermission(listData)
    dispatch(addToListPermission(listData))
    dispatch(setloading(false))
    callBack()
    notification.success({
      message: `Tạo thành công`,
    })
  } catch (error) {
    dispatch(setloading(false))
    notification.error({
      message: `Lỗi tạo các quyền`,
    })
    handleError(error)
  }
}

export const deleteRoleApi = (role: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setloading(true))
    await deleteRole(role)
    dispatch(removeRole(role))
    notification.success({
      message: `Xóa thành công chức vụ`,
      description: role,
    })
    dispatch(setloading(false))
  } catch (error) {
    dispatch(setloading(false))
    notification.error({
      message: `Lỗi xóa chức vụ ${role}`,
    })
    handleError(error)
  }
}

export const deletePermissionApi = (permission: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setloading(true))
    await deletePermission(permission)
    dispatch(removeListPermission(permission))
    dispatch(setloading(false))
    notification.success({
      message: `Xóa thành công quyền`,
      description: permission,
    })
  } catch (error) {
    dispatch(setloading(false))
    notification.error({
      message: `Lỗi xóa quyền ${permission}`,
    })
    handleError(error)
  }
}

export const fectListPermissionOfRole = (role: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setloading(true))
    const listPermissionOfRole = await getAllActionOfRole(role)
    dispatch(setListActionOfRole(listPermissionOfRole))
    dispatch(setRole(role))
    dispatch(setloading(false))
  } catch (error) {
    setloading(false)
    handleError(error)
  }
}

export const changeRoleOfUser = (role: string, id: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setloading(true))
    await updateRoleOfEmployee(id, role)
    dispatch(changeRoleOfListEmployee({ id, role }))
    dispatch(setloading(false))
    notification.success({
      message: 'Cập nhật thành công',
    })
  } catch (error) {
    dispatch(setloading(false))
    handleError(error)
  }
}

export const deleteEmloyeeOfList = (
  id: string,
  name: string
): AppThunk => async (dispatch) => {
  try {
    dispatch(setloading(true))
    await deleteEmployee(id)
    dispatch(clearEmployOfList(id))
    dispatch(setloading(false))
    notification.success({
      message: `Xóa thành công ${name}`,
    })
  } catch (error) {
    dispatch(setloading(false))
    handleError(error)
  }
}


export const addEmloyeeToListDb = (employee: EmployeeCreate, callBack: () => void): AppThunk => async (dispatch) => {
  try {

    if (!(employee.username && employee.email && employee.role && employee.name))
      notification.warn({
        message: 'Bạn cần điền đủ thông tin',
      })
    else if (!validateEmail(employee.email))
      notification.warn({
        message: 'Email không hợp lệ',
      })
    else {
      dispatch(setloading(true))
      const id = await createEmployee(employee)
      dispatch(
        addEmployeeToList({ ...employee, id, date_of_birth: '', phone: '' })
      )
      dispatch(setloading(false))
      notification.success({
        message: `Tạo thành công nhân viên ${employee.name}`,
        description: `password: ${employee.passwd}`,
        duration: 10
      })
      callBack()
    }

  } catch (error) {
    dispatch(setloading(false))
    handleError(error)
  }
}

export default userSlice.reducer
