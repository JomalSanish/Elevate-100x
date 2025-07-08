import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [usernameInput, setUsernameInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const navigate = useNavigate();

    function signup() {
        if (!usernameInput.trim() || !nameInput.trim() || !passwordInput.trim()) {
            alert("Invalid inputs");
            return;
        }
        axios.post("http://localhost:3000/signup", {
            username: usernameInput,
            name: nameInput,
            password: passwordInput
        })
            .then(function (res) {
                alert(res.data);
                navigate("/signin");
            }
            )
            .catch(function (err) {
                alert(err.response.data)
            })
    }
    return (
        <div>
            <input value={usernameInput} onChange={(event) => setUsernameInput(event.target.value)} placeholder="username" />
            <input value={nameInput} onChange={(event) => setNameInput(event.target.value)} placeholder="name" />
            <input value={passwordInput} onChange={(event) => setPasswordInput(event.target.value)} placeholder="password" />
            <button onClick={signup}>Signup</button>
        </div>
    )
}

export default Signup;