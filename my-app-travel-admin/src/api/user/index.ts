import { axiosApi } from '../axios'
import { ListCustomer, ListEmployee, EmployeeCreate } from '../interface/user'

export const getPageCustomer = async (page: string): Promise<ListCustomer> => {
  try {
    const { data } = await axiosApi.get(`api-user/page/${page}?role=CUSTOMER`)
    return data
  } catch (error) {
    throw error
  }
}

export const getPageEmployee = async (page: string): Promise<ListEmployee> => {
  try {
    const { data } = await axiosApi.get(`api-user/page-employee/${page}`)
    return data
  } catch (error) {
    throw error
  }
}

export const updateRoleOfEmployee = async (
  id: string,
  role: string
): Promise<void> => {
  await axiosApi.put(`api-user/role-of-user/${id}`, { role })
}

export const deleteEmployee = async (id: string): Promise<void> => {
  await axiosApi.delete(`api-user/delete-employee/${id}`)
}

export const createEmployee = async (user: EmployeeCreate): Promise<string> => {
  const { data } = await axiosApi.post(`api-user/`, user)
  return data.id
}


export const getAllIdEmailCustomer = async (): Promise<{id: string, email: string}[]> => {
  try {
    const { data } = await axiosApi.get(`api-user/customer/id-email`)
    return data
  } catch (error) {
    throw error
  }
}
