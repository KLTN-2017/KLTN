import { notification } from 'antd'
import { Permission } from './../interface/permission'
import { axiosApi } from '../axios'
import { Role, RolePermission } from '../interface/role'
import { handleError } from '../../utils/handleError'

export const getListPermission = async (): Promise<{ name: string }[]> => {
  try {
    const { data } = await axiosApi.get(`/api-permission`)
    return data.rows
  } catch (error) {
    throw error
  }
}

export const getListRole = async (): Promise<Role[]> => {
  try {
    const { data } = await axiosApi.get(`/api-role-permission/all-role`)
    return data.all_role
  } catch (error) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    }
    throw error
  }
}

export const createRolePermission = async (
  listData: RolePermission[]
): Promise<void> => {
  try {
    await axiosApi.post(`/api-role-permission`, listData)
  } catch (error) {
    throw error
  }
}

export const createPermission = async (
  listData: Permission[]
): Promise<void> => {
  try {
    await axiosApi.post(`/api-permission`, listData)
  } catch (error) {
    throw error
  }
}

export const deletePermission = async (permission: string): Promise<void> => {
  try {
    await axiosApi.delete(`/api-permission/${permission}`)
  } catch (error) {
    throw error
  }
}

export const deleteRole = async (role: string): Promise<void> => {
  try {
    await axiosApi.delete(`/api-role-permission/${role}`)
  } catch (error) {
    throw error
  }
}

export const getAllActionOfRole = async (
  role: string
): Promise<{ permission: string }[]> => {
  try {
    const { data } = await axiosApi.get(
      `/api-role-permission/permission-of-role/${role}`
    )
    return data
  } catch (error) {
    throw error
  }
}

export const getAllActionOfUserCurrent = async (
  callBack: () => void
): Promise<void> => {
  try {
    const { data } = await axiosApi.get(`/api-role-permission/re-fect-action`)
    const listAction = data.map(
      (action: { permission: string }) => action.permission
    )
    localStorage.setItem('action', JSON.stringify(listAction))
    notification.success({
      message: `Chúng tôi đã cập nhật lại quyền cho bạn`,
    })
    callBack()
  } catch (error) {
    callBack()
    handleError(error)
  }
}
