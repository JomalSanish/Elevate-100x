import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminSignup() {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const navigate = useNavigate();

    function signup() {
        if (!usernameInput.trim() || !passwordInput.trim()) {
            alert("Invalid inputs");
            return;
        }

        axios.post("http://localhost:3000/adminSignup", {
            username: usernameInput,
            password: passwordInput
        })
            .then(function (res) {
                alert("Signup successful! Please sign in.");
                navigate("/AdminSignin");
            })
            .catch(function (err) {
                alert(err.response?.data || "Signup failed");
            });
    }

    function goToSignin() {
        navigate("/AdminSignin");
    }

    return (
        <div style={{ padding: "2%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "2%" }}>
                <h2>Signup</h2>
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
                    onClick={signup}
                    style={{
                        backgroundColor: "rgb(92, 9, 9)",
                        color: "aliceblue",
                        borderRadius: "5px",
                        padding: "10px",
                        border: "none"
                    }}>
                    Signup
                </button>
                <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                <p>Already have an account?</p>
                <button
                    onClick={goToSignin}
                    style={{
                        backgroundColor: "rgb(92, 9, 9)",
                        color: "aliceblue",
                        width: "70px",
                        height: "30px",
                        marginLeft: "10px",
                        borderRadius: "5px",
                    }}>
                    Signin
                </button>
                </div>
            </div>
        </div>
    );
}

export default AdminSignup;
