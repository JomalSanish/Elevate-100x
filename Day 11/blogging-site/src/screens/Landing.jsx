import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/allBlogs')
            .then(response => {
                setBlogs(response.data);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
            });
    }, []);

    function goToSignup() {
        navigate("/signin");
    }
    function openIndividualBlog(blog) {
        localStorage.setItem("selectedBlog", JSON.stringify(blog.id));
        navigate("/blog");
    }

    return (
        <div style={{padding: "2%"}} >
            <div style={{ display: "flex", justifyContent: "space-between"}}>
                <h2>Blogs</h2>
                <button onClick={goToSignup} style={{
                    backgroundColor: "rgb(92, 9, 9)",
                    color: "aliceblue",
                    width: "70px",
                    height: "30px",
                    borderRadius: "5px"
                }}>
                    Signin
                </button>
            </div>

            <div>
                {blogs.map((blog, index) => (
                    <div onClick={() => openIndividualBlog(blog)} key={index} style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                        marginBottom: "10px"
                    }}>
                        <h3>{blog.title}</h3>
                        <p>{blog.contents}</p>
                        <i>Userid: {blog.userid}</i>
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default Landing;
