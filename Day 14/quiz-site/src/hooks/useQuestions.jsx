import { useEffect, useState } from "react";
import axios from "axios";

export function useQuestions(quizId) {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (!quizId) return;

        axios.get(`http://localhost:3000/viewQuestions/${quizId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(res => {
            if (Array.isArray(res.data)) {
                setQuestions(res.data);
            } else {
                setQuestions([res.data]);
            }
        }).catch(err => {
            console.error("Failed to fetch questions:", err);
        });
    }, [quizId]);

    return [questions, setQuestions];
}

