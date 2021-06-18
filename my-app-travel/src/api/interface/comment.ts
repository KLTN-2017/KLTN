export interface Reply {
  email: string
  content: string
  like?: number
  heart?: number
  date: string
}
export interface CommentItem {
  key: number
  author: string
  comments: {
    content: string
    reply: Reply[]
  }
  like?: number
  heart?: number
  date: string
}