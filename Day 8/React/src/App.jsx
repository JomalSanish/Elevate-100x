import { useState } from 'react'
import './App.css'

const count = 0;

function Box(props){
  const [color,setColor] = useState(props.color)

  return(
  <div onClick={()=> setColor("white")} onDoubleClick={()=> setColor(props.color)} style={{background : color, width: "50px", height : "50px", color : "black"}}>{props.text}</div>
)}

function App() {
  return (
      <div>
        <Box color='green' text='h'></Box>
        <Box color='red' text='e'></Box>
        <Box color='orange' text='l'></Box>
        <Box color='blue' text='l'></Box>
        <Box color='pink' text='o'></Box>
      </div>
  )
}

export default App
