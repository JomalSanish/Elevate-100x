import axios from 'axios';
import { useState } from "react";
import { useQuestions } from "../hooks/useQuestions";
import Questions from './Questions';

function AddQuestion({ quiz, websocket }) {
    const [questions, setQuestions] = useQuestions(quiz.id);
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [answer, setAnswer] = useState("");

    function handleSubmit() {
        if (!question.trim() || !answer.trim() || options.some(opt => !opt.trim())) {
            alert("All fields are required");
            return;
        }

        axios.post(`http://localhost:3000/addQuestion/${quiz.id}`, {
            question,
            options,
            answer
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(() => {
             const formattedQuestion = {
            question: { question }, // wrap it in an object
            options: options.map((opt, idx) => ({
                id: idx + 1, // generate an id
                option: opt
            })),
            answer
        };

            setQuestions(prev => [...prev, formattedQuestion]);
            alert("Question added successfully");
        }).catch(err => {
            alert(err.response?.data || "Failed to create question");
        });
    }

    return (
        <div style={{ padding: "2%" }}>
            <h2>Create New Question for "{quiz.title}"</h2>
            <div style={{ display: "flex", flexDirection: "column", width: "400px", gap: "15px" }}>
                <input
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                {options.map((opt, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={opt}
                        onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                        }}
                        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                ))}
                <input
                    type="text"
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
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
                    Create Question
                </button>
            </div>

            <Questions questions={questions} setQuestions={setQuestions} websocket={websocket} />
        </div>
    );
}

export default AddQuestion;
