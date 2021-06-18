import socket from 'app/socket'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import timeToCurrent from 'utils/timeTocurrent'
import { CommentItem, Reply } from '../../api/interface/comment'
interface Props {
  listReply: Reply[]
  setIdReply: (key: number) => void
  keyComment: number
  id: string
  setListComment: (listData: CommentItem[]) => void
  listCommnets: CommentItem[]
}
const ReplyUser = ({
  listReply,
  setIdReply,
  keyComment,
  id,
  listCommnets,
  setListComment,
}: Props) => {
  const [contentReply, setContentReply] = useState<string>('')
  const cancelReply = () => {
    setIdReply(0)
    setContentReply('')
  }
  const sendReply = () => {
    if (contentReply) {
      socket.emit(
        'reply-comment',
        id,
        keyComment,
        'abc@gmail.com',
        contentReply
      )
      const newListComment = listCommnets.map((commentItem) => {
        if (commentItem.key !== keyComment) return commentItem
        else {
          return {
            key: commentItem.key,
            author: commentItem.author,
            comments: {
              content: commentItem.comments.content,
              reply: [
                ...commentItem.comments.reply,
                { email: 'abc@gmail.com', content: contentReply, date: new Date().toString()},
              ],
            },
            date: commentItem.date,
          }
        }
      })
      setListComment(newListComment)
      setContentReply('')
    } else toast.warn('Vui lòng nhập bình luận của bạn')
  }
  return (
    <div className="list-reply">
      <ul className="list-reply-item">
        {listReply.map((item, index) => (
          <li key={index} className="item-relpy">
            <div className="avatar-date">
              <span className="avatar">{item.email.slice(0,3).toUpperCase()}</span>
              <span className="auth">{item.email}</span>
              <span className="time">{timeToCurrent(item.date)}</span>
            </div>
            <p className="content-reply">{item.content}</p>
          </li>
        ))}
        <li>
          <textarea
            className="reply-user"
            value={contentReply}
            onChange={(e) => setContentReply(e.currentTarget.value)}
          ></textarea>
          <div className="action">
            <button onClick={sendReply}>Send</button>
            <button onClick={cancelReply}>Cancel</button>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default ReplyUser
