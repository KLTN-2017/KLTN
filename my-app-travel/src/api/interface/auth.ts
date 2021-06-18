export interface AuthData {
  email: string
  password: string
}

export interface AuthResult {
  auth: string
  email?: string
  id?: number
  role?: string
  error?: string
}
export interface CreateUser {
  email: string
  passwd: string
}