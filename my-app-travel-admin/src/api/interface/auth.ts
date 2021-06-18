export interface AuthData {
  username: string
  password: string
}

export interface AuthResult {
  auth: string
  username?: string
  id?: number
  role?: string
  error?: string
}
