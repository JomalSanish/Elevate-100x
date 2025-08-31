import { useEffect, useState } from "react";
import axios from "axios";

export function useQuizes() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/viewQuizes", {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(res => {
            setQuizzes(res.data);
        }).catch(err => {
            console.error("Failed to fetch user quizzes:", err);
        });
    }, []);

    return [quizzes, setQuizzes];
}
