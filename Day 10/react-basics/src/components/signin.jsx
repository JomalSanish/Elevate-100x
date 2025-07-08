import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signin() {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const navigate = useNavigate();

    function signin() {
        if (!usernameInput.trim() || !passwordInput.trim()) {
            alert("Invalid inputs");
            return;
        }
        axios.post("http://localhost:3000/signin", {
            username: usernameInput,
            password: passwordInput
        })
            .then(function (res) {
                localStorage.setItem("token", res.data);
                navigate("/dashboard");
            }
            )
            .catch(function (err) {
                alert(err.response.data)
            })
    }

    function goToSignup() {
        navigate("/signup");
    }

    return (
        <div>
            <input value={usernameInput} onChange={(event) => setUsernameInput(event.target.value)} placeholder="username" />
            <input value={passwordInput} onChange={(event) => setPasswordInput(event.target.value)} placeholder="password" />
            <button onClick={signin}>signin</button>
            <p>
                Don't have an account?{" "}
                <button onClick={goToSignup}>
                    Signup
                </button>
            </p>
        </div>
    )
}

export default Signin;