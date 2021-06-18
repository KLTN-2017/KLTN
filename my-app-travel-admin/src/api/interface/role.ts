export interface Role {
  role: string
}

export interface ResultRole {
  all_role: Role[]
}

export interface RolePermission {
  role: string
  permission: string
}
