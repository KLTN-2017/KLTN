import { getActionLocalStorage } from './localStorage'
export const checkShowAction = (typeCheck: string): boolean => {
  const listAction = getActionLocalStorage()
  return listAction.some((action) => action === typeCheck)
}
