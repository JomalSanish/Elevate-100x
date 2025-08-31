const { response } = require("express");

function home() {
    fetch("http://localhost:3000/allBlogs", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("displayArea");
            container.innerHTML = "";
            data.forEach(element => {
                var newdiv = document.createElement("div");
                newdiv.innerHTML = `<div onClick = "blog(${element.id})" id='${element.id}' style="border-radius: 5px;border: 2px solid rgb(92, 9, 9); padding: 2%; margin-bottom: 2%;">
                <div style="display: flex; justify-content: space-between "><h3>${element.title}</h3><h5>UserId: ${element.userid}</h5></div><hr><p>${element.content}</p></div>`;
                container.appendChild(newdiv);
            });

        })
}

function blog(id) {
    fetch(`http://localhost:3000/blog/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("selectedBlog", JSON.stringify(data));
            window.location.href = 'singleBlog.html';
        })
}

function signup() {
    const name = document.getElementById('nameInput').value;
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'username': username,
            'password': password
        })
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            window.location.href = "signin.html";
        });
}

function signin() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    })
        .then(response => response.text())
        .then(data => {
            localStorage.setItem("token", data);
            window.location.href = 'userHome.html';
        });
}

function userBlogs() {
    let token = localStorage.getItem("token");

    fetch("http://localhost:3000/blogs", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        }
    })
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("signinContents");
            container.innerHTML = "";
            data.forEach(element => {
                var newdiv = document.createElement("div");
                newdiv.innerHTML = `<div onClick = "blog(${element.id})" id='${element.id}' style="border-radius: 5px;border: 2px solid rgb(92, 9, 9); padding: 2%; margin-bottom: 2%;">
                <div style="display: flex; justify-content: space-between "><h3>${element.title}</h3><h5>UserId: ${element.userid}</h5></div><hr><div style="display: flex;justify-content: space-between;"><p>${element.content}</p><button onclick="deleteBlog(event)"
            style="width: 100px;height: 40px; background-color: rgb(92, 9, 9); color: wheat; border-radius: 5px;">Delete</button></div></div>`;
                container.appendChild(newdiv);
            });

        })
}


function createBlog() {
    const container = document.getElementById("signinContents");
    container.innerHTML = "";
    var newdiv = document.createElement("div");
    newdiv.innerHTML = `<div>
        <input placeholder="Titile" id="title" style="font-size: larger; margin-left: 5%;margin-top: 5%;">
        <br>
        <textarea placeholder="Contents" id="content" style="margin: 5%; margin-top: 1% ;width : 90%;"></textarea><center>
        <button onclick="AddBlog()"
            style="width: 100px;height: 50px; background-color: rgb(92, 9, 9); color: wheat; font-size: large; border-radius: 5px;">Add</button></center>
    </div>`;
    container.appendChild(newdiv);
}

function AddBlog() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    console.log(title, "", content)
    let token = localStorage.getItem("token");
    fetch("http://localhost:3000/create-blogs", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        },
        body: JSON.stringify({
            'title': title,
            'content': content
        })
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            userBlogs();
        });
}

function deleteBlog(event) {
    const id = event.target.closest("div[id]").id;
    event.stopPropagation();
    let token = localStorage.getItem("token");
    fetch(`http://localhost:3000/blog/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        }
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            userBlogs();
        });

}
