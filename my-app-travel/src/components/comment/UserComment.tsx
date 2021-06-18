import socket from 'app/socket'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { validateEmail } from 'utils/validateEmail'
import { CommentItem } from '../../api/interface/comment'
interface Props {
  listCommnets: CommentItem[]
  setListComment: (listData: CommentItem[]) => void
  id: string
}

const UserCommnet = ({ listCommnets, setListComment, id }: Props) => {
  const [comment, setComment] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const sendMessage = () => {
    if (comment && email) {
      if (validateEmail(email)) {
        const key = new Date().getTime()
        socket.emit('comment', key, comment, email, `${id}`)
        setListComment([
          {
            key,
            author: email,
            comments: { content: comment, reply: [] },
            date: new Date().toString(),
          },
          ...listCommnets,
        ])
        setComment('')
      }
      else toast.warn('Email không đúng định dạng vui lòng nhập lại !')
    } else toast.warn('Vui lòng viết bình luận và nhập email của bạn !')
  }
  return (
    <>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button onClick={sendMessage}>Send comment</button>
      <input
        placeholder="Email cua ban"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </>
  )
}

export default UserCommnet
