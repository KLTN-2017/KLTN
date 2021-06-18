import io from 'socket.io-client'
const URL = 'http://192.168.0.113:9999'
const socket = io(URL, {
  autoConnect: false,
  transports: ['websocket'],
  withCredentials: true,
})

socket.onAny((event, ...args) => {
  console.log(event, args)
})

export default socket
