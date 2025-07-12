import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserSignin() {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const navigate = useNavigate();

    function signin() {
        if (!usernameInput.trim() || !passwordInput.trim()) {
            alert("Invalid inputs");
            return;
        }
        axios.post("http://localhost:3000/UserSignin", {
            username: usernameInput,
            password: passwordInput
        })
            .then(function (res) {
                localStorage.setItem("token", res.data);
                navigate("/UserDashboard");
            })
            .catch(function (err) {
                alert(err.response.data);
            });
    }

    function goToSignup() {
        navigate("/UserSignup");
    }

    return (
        <div style={{padding: "2%"}}>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "2%" }}>
                <h2>Signin</h2>
                
            </div>

            <div style={{ display: "flex", flexDirection: "column", width: "300px", gap: "10px" }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <button
                    onClick={signin}
                    style={{
                        backgroundColor: "rgb(92, 9, 9)",
                        color: "aliceblue",
                        borderRadius: "5px",
                        padding: "10px",
                        border: "none"
                    }}
                >
                    Signin
                </button>
                <div style={{ display: "flex",alignItems: "center", marginTop: "10px"}}>
                <p>Don't have an account:</p>
                <button
                    onClick={goToSignup}
                    style={{
                        backgroundColor: "rgb(92, 9, 9)",
                        color: "aliceblue",
                        width: "70px",
                        height: "30px",
                        marginLeft: "10px",
                        borderRadius: "5px",
                    }}
                >
                    Signup
                </button>
                </div>
            </div>
        </div>
    );
}

export default UserSignin;
