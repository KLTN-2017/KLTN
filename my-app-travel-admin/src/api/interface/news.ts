export interface NewsCreate {
  title: string
  img: string
  location: string
  content: string
}

export interface News extends NewsCreate {
  id: number
  view: number
  rate: string
  user_id: string
  createdat: string
}

export interface NewsDetail extends News {
  updatedat: string
}

export interface Result {
  success: boolean
}

export interface NewsGet {
  id: number
  title: string
  img: string
  location: string
  view: number
  rate: string
  createdat: string
}

export interface GetResult {
  count: number
  rows: NewsGet[]
}
