function Quizes({ quizzes = [], setQuizzes, onQuizClick, websocket }) {

    function startQuiz(e, quizId) {
        e.stopPropagation();
        if (websocket) {
            websocket.send(JSON.stringify({ type: "start", quizId }));  
        } else {
            console.error("WebSocket is not connected");
        }
    }

    if (!quizzes.length) {
        return <p>No quizzes yet.</p>;
    }

    return (
        <div>
            {quizzes.map((quiz, index) => (
                <div
                    key={index}
                    onClick={() => onQuizClick(quiz)}
                    style={{
                        border: "2px solid rgb(92, 9, 9)",
                        borderRadius: "5px",
                        padding: "10px",
                        margin: "10px",
                        cursor: "pointer"
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3>{quiz.title}</h3>
                    </div>
                    <hr />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button
                            onClick={(e) => startQuiz(e, quiz.title)}
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
                            Start Quiz
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Quizes;
