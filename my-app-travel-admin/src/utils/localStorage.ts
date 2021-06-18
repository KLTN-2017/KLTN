export const setUser = (name: string, action: string[]) => {
  localStorage.setItem('user', name)
  localStorage.setItem('action', JSON.stringify(action))
}

export const clearUser = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('action')
}

export const getActionLocalStorage = (): string[] => {
  return JSON.parse(localStorage.getItem('action') || '[]')
}
