const mongoose = require('mongoose')
const baseMessageSchema = require('./baseSchema')
const BaseMessage = mongoose.model('message', baseMessageSchema)


const addMessage = async (key, message, email, id) => {
  try {
      const ispush = await BaseMessage.exists({ id: id });
    if(ispush)
     BaseMessage.updateOne(
       { id: id },
       { $push: { message: { key, author: email, comments: { content: message } } } }
     ).then((res) => console.log("ok-update"));
        
    else BaseMessage.create({
      id,
      message: [
        {
          key,
          author: email,
          comments: {
            content: message,
          },
        },
      ],
    }).then((res) => console.log("ok-create"));
} catch (error) {
  console.log(error)
}
}

const addMessageReply = async (id , key, mail, contentReply) => {
  try {
      
     BaseMessage.updateOne(
       { id: id, "message.key": key },
       { $push: { "message.$.comments.reply": { email: mail, content: contentReply } } }
     ).then((res) => console.log("ok-reply"));
    
} catch (error) {
  console.log(error)
}
}

const getListMessage = async (id) =>{
  try{
    const listComment = await BaseMessage.findOne({id})
    if(listComment) return listComment.message
    return []
  } catch(error) {
    throw new Error("Đã xảy ra sự cố getlist comment")
  }
}

const addLikeComment = (id, key, type) => {
  const data = type === "like" ? { "message.$.like": 1 } : { "message.$.heart": 1 };
  BaseMessage.updateOne(
    { id: id, "message.key": key },
    {$inc: data}
  ).then(() => console.log("ok-", type));
}




module.exports = {
    addMessage,
    getListMessage,
  addMessageReply,
    addLikeComment
}
