import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [websocket,setWebsocket] = useState(null)

  useEffect(()=>{

    const ws = new WebSocket('ws://localhost:3000')

    ws.onopen = function(){
    console.log('connected to server')
  }

  ws.onmessage = function(event){
    console.log(event.data)
  }

  setWebsocket(ws)

  return function cleanup() {
    if (ws) {
      ws.close();
      console.log('WebSocket connection closed');
    }
  }

  },[])

  function startQuiz() {
    if (websocket) {
      websocket.send("start")
    } else {
      console.error("WebSocket is not connected");
    }
  }



  return (
    <div>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  )
}

export default App
