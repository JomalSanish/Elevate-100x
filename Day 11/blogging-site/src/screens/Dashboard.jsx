import { useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import Blogs from "./Blogs";

function Dashboard() {
    const [blogs, setBlogs] = useBlogs();
    const navigate = useNavigate();

    function goToCreateBlog() {
        navigate("/createBlog");
    }

    return (
        <div style={{ padding: "2%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "2%" }}>
                <h2>Welcome Back</h2>
                <button
                    onClick={goToCreateBlog}
                    style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "rgb(92, 9, 9)",
                        color: "wheat",
                        fontSize: "large",
                        borderRadius: "5px"
                    }}
                >
                    +
                </button>
            </div>

            <div>
                <Blogs blogs={blogs} setBlogs={setBlogs} />
            </div>
        </div>
    );
}

export default Dashboard;
