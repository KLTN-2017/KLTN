import { CommentItem } from 'api/interface/comment'
import socket from 'app/socket'
import React, { useCallback, useEffect, useState } from 'react'
import timeToCurrent from 'utils/timeTocurrent'
import ReplyUser from './Reply'
interface Props {
  listCommnets: CommentItem[]
  id: string
  setListComment: (listData: CommentItem[]) => void
}
const ListCommented = ({ listCommnets, id, setListComment }: Props) => {
  const [idReply, setIdReply] = useState<number>()
  const changeListComment = useCallback(
    (key: number, type: 'like' | 'heart') => {
      const newListComment = listCommnets.map((commentItem) => {
        if (commentItem.key !== key) return commentItem
        else {
          return {
            ...commentItem,
            [type]: (commentItem[type] || 0) + 1,
          }
        }
      })
      setListComment(newListComment)
    },
    [listCommnets, setListComment]
  )
  const likeOrHeartComment = (key: number, type:  "like" | "heart") => {
    socket.emit('like-heart-commnet', id, key, type)
    changeListComment(key, type)
  }
  useEffect(() => {
    socket.on('user-like-heart-commnet', (key: number, type: "like" | "heart") => {
      changeListComment(key, type)
    })
  }, [changeListComment])
  const htmlComment = listCommnets.map((comments, index) => (
    <li key={index}>
      <div className="date-auth">
        <span className="avatar">{comments.author.slice(0,3).toUpperCase()}</span>
        <span className="auth"> {comments.author}</span>
        <span className="date"> {timeToCurrent(comments.date)}</span>
      </div>
      <p className="content-comment">
        {comments.comments.content}
        <div className="like">
          <span className="reply" onClick={() => setIdReply(comments.key)}>
            Trả lời
          </span>
          <i
            onClick={() => likeOrHeartComment(comments.key, 'like')}
            className="far fa-thumbs-up"
            title="Thích"
          >
            <sub>{comments.like}</sub>
          </i>
          <i
            onClick={() => likeOrHeartComment(comments.key, 'heart')}
            className="fas fa-heart"
            title="Tim"
          >
            <sub>{comments.heart}</sub>
          </i>
        </div>
        {comments.comments.reply.length > 0 && (
          <div className="count-reply" onClick={() => setIdReply(comments.key)}>
            {comments.comments.reply.length} phản hồi
          </div>
        )}
      </p>
      {idReply === comments.key && (
        <ReplyUser
          listCommnets={listCommnets}
          listReply={comments.comments.reply}
          setIdReply={setIdReply}
          keyComment={comments.key}
          id={id}
          setListComment={setListComment}
        />
      )}
    </li>
  ))
  return <ul className="list-comments">{htmlComment}</ul>
}
export default ListCommented
