export interface ActionRoute {
    link: string
    method: string
    action: string
    status: string
}

export const defaultActionRoute =  {
  link: '',
  method: 'GET',
  action: '',
  status: 'on'
}