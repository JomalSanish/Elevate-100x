import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateBlog() {
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const navigate = useNavigate();

    function handleSubmit() {
        if (!title.trim() || !contents.trim()) {
            alert("Title and contents cannot be empty");
            return;
        }

        axios.post("http://localhost:3000/createBlog", {
            title,
            contents
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(() => {
            alert("Blog created successfully!");
            navigate("/dashboard");
        }).catch(err => {
            alert(err.response?.data || "Failed to create blog");
        });
    }

    return (
        <div style={{ padding: "2%" }}>
            <h2>Create New Blog</h2>

            <div style={{ display: "flex", flexDirection: "column", width: "400px", gap: "15px" }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                />

                <textarea
                    placeholder="Contents"
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                    rows={6}
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                ></textarea>

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
                    Post Blog
                </button>
            </div>
        </div>
    );
}

export default CreateBlog;
