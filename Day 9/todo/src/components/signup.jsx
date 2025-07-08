import axios from 'axios';
function Signup(){

    function signup(){
        axios.post("http://localhost:3000/signup",{
            username : document.getElementById("username").value,
            name : document.getElementById("name").value,
            password : document.getElementById("password").value
        })
        .then(function(res){
            alert(res.data);
            window.location = "/signin"
        }
        )
    }
    return(
        <div>
            <input id="username" type="text" placeholder="username"/>
            <input id="name" type="text" placeholder="name"/>
            <input id="password" type="text" placeholder="password"/>
            <button onClick={signup}>Signup</button>
        </div>
    )
}

export default Signup;