import { randomPasswd } from '../../utils/randomPasswd'
export interface Customer {
  id: string
  username: string
  name?: string
  email: string
  date_of_birth?: string
  phone?: string
}

export interface Employee {
  id: string
  username: string
  name: string
  email: string
  date_of_birth: string
  phone: string
  join_date: string
  role: string
  sex: boolean
}

export interface ListCustomer {
  rows: Customer[]
  count: number
}
export interface ListEmployee {
  rows: Employee[]
  count: number
}

export interface EmployeeCreate {
  username: string
  email: string
  role: string
  passwd: string
  name: string
  join_date: string
  sex: boolean
}

export const defaultValueEmployeeCreate = {
  username: '',
  email: '',
  passwd: randomPasswd(),
  role: '',
  name: '',
  sex: true,
  join_date: new Date().toString(),
}
