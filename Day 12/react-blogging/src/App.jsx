import { useState } from 'react'

function App() {
  const [todo, setTodo] = useState([])
  const [count, setCount] = useState(0);

  function addTodo(){
    setCount(count+1);
    setTodo([...todo, {
      count : count,
      title : "added" 
    }]);
  }

  return (

    <div>
      <button onClick={addTodo}>Add</button>
      {todo.map(function(to){
        return <Todo title = {to.title} count = {to.count}></Todo> 
      })}
    </div>
  )   
}

function Todo(props){
  return<div>
    <h1>{props.title}</h1>
    <h3>{props.count}</h3>
  </div>
}


export default App
