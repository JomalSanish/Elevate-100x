import { useNavigate } from "react-router-dom";

function Landing() {    
    const navigate = useNavigate();

    function goToAdminSignin() {
        navigate("/AdminSignin");
    }

    function goToUserSignin() {
        navigate("/UserSignin");
    }
    return (
        <div style={{padding: "2%", display: "flex", flexDirection: "column", gap: "10px"}} >
            <h3>Select User Type</h3>
            <button onClick={goToUserSignin} style={{
                        backgroundColor: "rgb(92, 9, 9)",
                        color: "aliceblue",
                        borderRadius: "5px",
                        padding: "10px",
                        border: "none",
                        width: "100px",
                    }}>User</button>
            <button onClick={goToAdminSignin} style={{
                        backgroundColor: "rgb(92, 9, 9)",
                        color: "aliceblue",
                        borderRadius: "5px",
                        padding: "10px",
                        border: "none",
                        width: "100px",
                    }}>Admin</button>
        </div>
    );
}

export default Landing;
