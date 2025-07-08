let token = "";
let num = 0;

function signup() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }).then(response => response.text())
        .then(data => {
            alert(data);
            window.location.href = "index.html";
        })
}

function signin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "userfound") {
                token = data.token;
                localStorage.setItem("token", token);
                window.location.href = "todo.html";
            }
            else if (data.status === "incorrectpassword") {
                alert("The password is incorrect!")
            }
            else {
                alert("User doesn't exists!")
            }
        })
}

function logedin() {
    token = localStorage.getItem("token");
    fetch("http://localhost:3000/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
    })
        .then((response) => response.json())
        .then(data => {
            if (data.length > 0) {
                num = Math.max(...data.map(item => item.num));
            }
            const listContainer = document.getElementById("todo-list");
            listContainer.innerHTML = "";
            data.forEach(element => {
                var newdiv = document.createElement("div");
                newdiv.innerHTML = `<br><div  id="${element.num}"style="display: flex;"><button onClick=remove(this)>*</button><h4>${element.newentry}</h4></div>`;
                listContainer.appendChild(newdiv);
            });
        })
}


function add() {
    let token = localStorage.getItem("token");
    let task = document.getElementById("todo").value.trim();
    if (task === "") {
        alert("Enter something");
        return;
    }
    num += 1;
    document.getElementById("todo").value = ""

    fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "token": token
        },
        body: JSON.stringify({
            "num": num,
            "newentry": task
        })
    })
        .then((response) => response.json())
        .then(data => {
            if (data.length > 0) {
                num = Math.max(...data.map(item => item.num));
            }
            const listContainer = document.getElementById("todo-list");
            listContainer.innerHTML = "";
            data.forEach(element => {
                var newdiv = document.createElement("div");
                newdiv.innerHTML = `<br><div  id="${element.num}"style="display: flex;"><button onClick=remove(this)>*</button><h4>${element.newentry}</h4></div>`;
                listContainer.appendChild(newdiv);
            });
        })
}

function remove(button) {
    let token = localStorage.getItem("token");
    button.parentElement.remove();
    fetch("http://localhost:3000", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "token": token
        },
        body: JSON.stringify({
            "id": button.parentElement.id
        })
    });
}
