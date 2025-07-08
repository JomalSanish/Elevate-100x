import { useEffect, useState } from "react";
import axios from "axios";

export function useBlogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/blogs", {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(res => {
            setBlogs(res.data);
        }).catch(err => {
            console.error("Failed to fetch user blogs:", err);
        });
    }, []);

    return [blogs, setBlogs];
}
