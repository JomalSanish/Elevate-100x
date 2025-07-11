import { useNavigate } from "react-router-dom";


function Questions({ questions = [], setQuestions, websocket }) {

    const navigate = useNavigate();

    function handleQuizClick(quiz) {
        localStorage.setItem("selectedQuiz", JSON.stringify(quiz));
        navigate("/AddQuestion");
    }

    function sendQuestion(e, questionObj) {
        e.stopPropagation();
        if (websocket) {
            websocket.send(JSON.stringify(questionObj));
        } else {
            console.error("WebSocket is not connected");
        }
    }

    if (!questions.length) {
        return <p>No questions yet.</p>;
    }

    return (
        <div>
            {questions.map((q, index) => (
                <div
                    key={index}
                    style={{
                        border: "2px solid rgb(92, 9, 9)",
                        borderRadius: "5px",
                        padding: "10px",
                        margin: "10px",
                        cursor: "pointer"
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3>{q.question.question}</h3>
                    </div>
                    <ul>
                        {q.options.map((opt) => (
                            <li key={opt.id}>{opt.option}</li>
                        ))}
                    </ul>
                    <hr />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button
                            onClick={(e) => sendQuestion(e, q)}
                            style={{
                                width: "100px",
                                height: "40px",
                                backgroundColor: "rgb(92, 9, 9)",
                                color: "wheat",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            Send Question
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default Questions;
