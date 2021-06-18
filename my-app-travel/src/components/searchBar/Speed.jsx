import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const Speed = (porps) => {
  const history = useHistory()
  const param = useParams()
  var speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
  var recognition = new speechRecognition()
  const [isListening, setListening] = useState(false)
  const speedCheck =
    'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  const startSpeed = () => {
    if (speedCheck) {
      recognition.start()
      setListening(true)
    } else toast.warning('Trình duyệt của bạn không hỗ trợ giọng nói')
  }
  const stopSpeed = () => {
    recognition.stop()
    setListening(false)
  }
  const handleClickSpeed = () => {
    if (isListening) stopSpeed()
    else startSpeed()
  }
  recognition.onresult = (event) => {
    porps.setText(event.results[0][0].transcript)
  }
  recognition.onspeechend = () => {
    stopSpeed()
    if (param !== '/tim-kiem') setTimeout(() => history.push('/tim-kiem'), 2000)
  }
  return (
    <div className="speed-to-text">
      {speedCheck && (
        <img
          onClick={handleClickSpeed}
          title="Tìm kiếm bằng giọng nói"
          src={
            isListening
              ? 'https://firebasestorage.googleapis.com/v0/b/ha-uet-gateway.appspot.com/o/mic.png?alt=media'
              : 'https://cdn3.iconfinder.com/data/icons/multimedia-ver-3-glyph/32/mute_mic_microphone_audio_sound-512.png'
          }
          alt="mic"
        />
      )}
    </div>
  )
}

export default Speed
