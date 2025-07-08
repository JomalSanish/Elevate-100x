import { useNavigate } from "react-router-dom";
import axios from "axios";

function Blogs({ blogs = [], setBlogs }) {
    const navigate = useNavigate();

    function handleBlogClick(blog) {
        localStorage.setItem("selectedBlog", JSON.stringify(blog));
        navigate("/blog");
    }

    async function handleDelete(e, id) {
        e.stopPropagation();
        const token = localStorage.getItem("token");

        try {
            const res = await axios.delete(`http://localhost:3000/blog/${id}`, {
                headers: {
                    token: token
                }
            });

            alert(res.data);

            if (setBlogs) {
                setBlogs(prev => prev.filter(blog => blog.id !== id));
            }
        } catch (err) {
            alert(err.response?.data || "Delete failed");
        }
    }

    if (!blogs.length) {
        return <p>No blogs yet.</p>;
    }

    return (
        <div>
            {blogs.map((blog, index) => (
                <div
                    key={index}
                    onClick={() => handleBlogClick(blog)}
                    style={{
                        border: "2px solid rgb(92, 9, 9)",
                        borderRadius: "5px",
                        padding: "10px",
                        margin: "10px",
                        cursor: "pointer"
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3>{blog.title}</h3>
                        <h5>UserId: {blog.userid}</h5>
                    </div>
                    <hr />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p>{blog.content || blog.contents}</p>
                        <button
                            onClick={(e) => handleDelete(e, blog.id)}
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
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Blogs;
