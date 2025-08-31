import axios from 'axios';
function Signin(){

    function signin(){
        axios.post("http://localhost:3000/signin",{
            username : document.getElementById("username").value,
            password : document.getElementById("password").value
        })
        .then(function (res){
                localStorage.setItem("token",res.data);
                window.location = "/dashboard"
            }
        )
        .catch(function(err){
            alert(err.response.data)
        })
    }
    return(
        <div>
            <input id="username" type="text" placeholder="username"/>
            <input id="password" type="text" placeholder="password"/>
            <button onClick={signin}>signin</button>
        </div>
    )
}

export default Signin;

