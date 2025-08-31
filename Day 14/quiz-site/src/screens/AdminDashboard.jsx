import axios from "axios";
import Quizes from './Quizes';
import AddQuestion from './AddQuestion';
import { useState, useEffect } from 'react';
import { useQuizes } from "../hooks/useQuizes";

function AdminDashboard() {
    const [quizzes, setQuizzes] = useQuizes();
    const [title, setTitle] = useState("");
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [websocket, setWebsocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3000');
        ws.onopen = () => console.log('WebSocket connected');
        ws.onmessage = (event) => console.log('Message:', event.data);
        setWebsocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    function handleSubmit() {
        if (!title.trim()) {
            alert("Title cannot be empty");
            return;
        }

        axios.post("http://localhost:3000/createQuiz", {
            title,
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((response) => {
            setQuizzes(prev => [...prev, response.data.quiz]);
            alert(response.data.msg);
        }).catch(err => {
            alert(err.response?.data || "Failed to create quiz");
        });
    }

    function handleQuizClick(quiz) {
        setSelectedQuiz(quiz); 
    }

   return (
    <div style={{ padding: "2%" }}>
        {!selectedQuiz ? (
            <>
                <h2>Create New Quiz</h2>
                <div style={{ display: "flex", flexDirection: "column", width: "400px", gap: "15px" }}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                    <button
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: "rgb(92, 9, 9)",
                            color: "white",
                            padding: "10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        Create Quiz
                    </button>
                </div>

                <Quizes
                    quizzes={quizzes}
                    setQuizzes={setQuizzes}
                    onQuizClick={handleQuizClick}
                    websocket={websocket}
                />
            </>
        ) : (
            <>
                <button
                    onClick={() => setSelectedQuiz(null)}
                    style={{
                        backgroundColor: "rgb(92, 9, 9)",
                        color: "white",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginBottom: "20px"
                    }}
                >
                    ← Go Back to Quizzes
                </button>

                <AddQuestion quiz={selectedQuiz} websocket={websocket} />
            </>
        )}
    </div>
);

}

export default AdminDashboard;
