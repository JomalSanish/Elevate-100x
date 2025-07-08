import axios from 'axios';
import { useState, useEffect } from "react";


function Dashboard() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:3000/todo", {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then((res) => {
                setTodos(res.data); 
            })
            .catch((err) => {
                console.error("Error fetching todos:", err);
            });
    }, []);




    function createTodo() {
        let token = localStorage.getItem("token");
        axios.post("http://localhost:3000/create-todos", {
            todo: document.getElementById('todo').value
        }, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then(function (res) {
                setTodos(prev => [...prev, res.data]);
document.getElementById('todo').value = '';

            }
            )
    }


    return (
        <div>
            <input id="todo" type="text" placeholder="Enter todo" />
            <button onClick={createTodo}>Add</button>
            <div style={{ marginTop: "20px" }}>
                <h3>Your Todos:</h3>
                    {todos.map((todoItem, index) => (
                        <li key={todoItem.id || index}>
                            {typeof todoItem === "object" ? todoItem.todo : todoItem}
                        </li>
                    ))}
            </div>
        </div>
    )


}

export default Dashboard;

