export interface Type {
  brand: string | undefined
}
export interface NumberSit {
  cartype: string | undefined
}
export interface Year {
  vehiclelife: string | undefined
}
export type StateFilter = Type & NumberSit & Year
export const stateFilter = {
  brand: '',
  cartype: '',
  vehiclelife: '',
}

export type Filter = Type | NumberSit | Year
