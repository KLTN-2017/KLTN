const { io } = require("../server");
const {
  addMessage,
  addMessageReply,
  addLikeComment,
} = require("../mongodb/baseMessage");


io.on("connect", (socket) => {
    socket.on("order-item", (data, email) => {
      const title = data.map(order => order.title)
    socket.broadcast.emit("user-by", email, title.join(" - "));
    });
  
  
  socket.on("join-room", (rooms) => {
    socket.join(rooms);
  });


  socket.on("leave-room", (rooms) => {
      socket.leave(rooms)
  });

  socket.on('comment', (key, message, email, id) => {
    socket.to(id).emit('comment-user', key, message, email)
    addMessage(key,message, email, id);
  })


  socket.on('reply-comment',(id, key, mail, contentReply) =>{
    addMessageReply(id , key, mail, contentReply)
    socket.to(id).emit('reply-user', key, mail, contentReply)
  })


  socket.on("like-heart-commnet", (id, key, type) => {
    addLikeComment(id, key, type)
    socket.to(id).emit("user-like-heart-commnet",key, type)
  });


  socket.on("disconnect", () => console.log(`User is disconnect ${socket.id}`));
});
