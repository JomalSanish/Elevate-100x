const express = require("express");
const cors = require("cors");
const app = express();
const fs = require('fs');
app.use(cors());
app.use(express.json());


let users = [];
let todos = [];

app.post('/signup', function (req, res) {
    const user = req.body;
    fs.readFile("userInfo.json", "utf-8", function (err, data) {
        let users = [];
        if (data) {
            users = JSON.parse(data);
        }
        let foundUser = users.find(element => { return element.username == user.username });
        if (!foundUser) {
            users.push(user);
            user.userid = crypto.getRandomValues(new Uint8Array(16)).reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
            fs.writeFile("userInfo.json", JSON.stringify(users), "utf-8", function (err) { })
            fs.readFile("todo.json", "utf-8", function (err, data) {
                let todos = [];
                if (data) {
                    todos = JSON.parse(data);
                }
                let obj = {
                    "userid": user.userid,
                    "todo": []
                }
                todos.push(obj);
                fs.writeFile("todo.json", JSON.stringify(todos), "utf-8", function (err) { })
            })

            res.send("User created");
        }
        else {
            res.send("User already exists");
        }
    })
})

app.post('/signin', function (req, res) {
    const user = req.body;
    fs.readFile("userInfo.json", "utf-8", function (err, data) {
        if (data) {
            users = JSON.parse(data);
            let foundUser = users.find(element => { return element.username == user.username });
            if (foundUser) {
                if (foundUser.password === user.password) {
                    foundUser.token = crypto.getRandomValues(new Uint8Array(16)).reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
                    fs.writeFileSync("userInfo.json", JSON.stringify(users), "utf-8", function (err) { })
                    return res.json({
                        "status": "userfound",
                        "token": foundUser.token
                    });
                }
                else {
                    res.json({
                        "status": "incorrectpassword"
                    }
                    )
                }
            }
            else {
                res.json({
                    "status": "usernotfound",
                });
            }
        }
        else {
            res.json({
                "status": "usernotfound",
            });
        }
    }
    )
})

app.get('/', function (req, res) {
    let token = req.headers.token;
    fs.readFile("userInfo.json", "utf-8", function (err, data) {
        if (data) {
            const users = JSON.parse(data);
            let user = users.find(element => { return element.token === token });
            if (user) {
                const userid = user.userid;
                fs.readFile("todo.json", "utf-8", function (err, data) {
                    if (data) {
                        const todos = JSON.parse(data);
                        let user = todos.find(element => { return element.userid === userid });
                        if (user) {
                            res.json(user.todo);
                        }
                        else {
                            res.json([])
                            console.log("nottodo");
                        }
                    }
                })
            }
        }
    })
})

app.post('/', function (req, res) {
    let token = req.headers.token;
    const newentry = req.body;
    fs.readFile("userInfo.json", "utf-8", function (err, data) {
        if (data) {
            const users = JSON.parse(data);
            let user = users.find(element => { return element.token === token });
            if (user) {
                const userid = user.userid;
                fs.readFile("todo.json", "utf-8", function (err, data) {
                    if (data) {
                        const todos = JSON.parse(data);
                        let user = todos.find(element => { return element.userid === userid });
                        user.todo.push(newentry);
                        res.send(user.todo);
                        fs.writeFile("todo.json", JSON.stringify(todos), "utf-8", function (err) { })
                    }
                })
            }
        }
    })
})


app.delete('/', function (req, res) {
    let token = req.headers.token;
    const id = req.body.id;
    fs.readFile("userInfo.json", "utf-8", function (err, data) {
        if (data) {
            const users = JSON.parse(data);
            let user = users.find(element => { return element.token === token });
            if (user) {
                const userid = user.userid;
                fs.readFile("todo.json", "utf-8", function (err, data) {
                    if (data) {
                        todos = JSON.parse(data);
                        let user = todos.find(element => { return element.userid === userid });
                        const index = user.todo.findIndex(item => item.num == id);
                        if (index !== -1) {
                            user.todo.splice(index, 1);
                        }
                        fs.writeFile("todo.json", JSON.stringify(todos), "utf-8", function (err) { })
                    }

                })
            }
        }
    })
})

app.listen(3000);