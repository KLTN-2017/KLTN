import { getActionLocalStorage } from './localStorage'
export const checkShowActionHome = (typeCheck: string): boolean => {
  const listAction = getActionLocalStorage()
  return listAction.some((action) => action.includes(typeCheck))
}
