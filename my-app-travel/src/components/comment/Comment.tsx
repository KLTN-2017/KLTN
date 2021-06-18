import socket from 'app/socket'
import React, { useEffect, useState } from 'react'
import './comment.scss'
import { CommentItem } from 'api/interface/comment'
import getComment from '../../api/comment/index'
import UserCommnet from './UserComment'
import ListCommented from './ListCommented'
interface Props {
  id: string
}
const Comment = ({ id }: Props) => {
  const [listCommnets, setListComment] = useState<CommentItem[]>([])
  useEffect(() => {
    socket.on('comment-user', (key: number, message: string, email: string) => {
      setListComment([
        {
          key,
          author: email,
          comments: { content: message, reply: [] },
          date: new Date().toString(),
        },
        ...listCommnets,
      ])
    })
  }, [listCommnets])

   useEffect(() => {
     socket.on('reply-user', (key: number, email: string, message: string) => {
       const newListComment = listCommnets.map((commentItem) => {
         if (commentItem.key !== key) return commentItem
         else {
           return {
             key: commentItem.key,
             author: commentItem.author,
             comments: {
               content: commentItem.comments.content,
               reply: [
                 ...commentItem.comments.reply,
                 {
                   email,
                   content: message,
                   date: new Date().toString(),
                 },
               ],
             },
             date: commentItem.date,
           }
         }
       })
       setListComment(newListComment)
     })
   }, [listCommnets])

  useEffect(() => {
    async function getComments() {
      const comments = await getComment(id)
      setListComment(comments)
    }
    if (id) getComments()
  }, [id])


  return (
    <div className="list-chat">
      <h2>Hãy để lại nhận xét của bạn nào !</h2>
      <UserCommnet
        id={id}
        listCommnets={listCommnets}
        setListComment={setListComment}
      />
      <ListCommented
        listCommnets={listCommnets}
        id={id}
        setListComment={setListComment}
      />
    </div>
  )
}

export default Comment
