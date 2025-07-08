import axios from 'axios';
import { useState, useEffect } from "react";

function IndividualBlog() {
    const id = localStorage.getItem("selectedBlog");
    const [blog, setBlog] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/blog/${id}`)
            .then(response => {
                setBlog(response.data);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
            });
    }, []);

    return (
        <div style={{ padding: "2%" }}>
            <div style={{
                borderRadius: "5px",
                border: "2px solid rgb(92, 9, 9)",
                padding: "2%",
                marginBottom: "2%"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>{blog.title}</h3>
                    <h5>UserId: {blog.userid}</h5>
                </div>
                <hr />
                <p>{blog.contents}</p>
            </div>
        </div>
    );
}

export default IndividualBlog;
