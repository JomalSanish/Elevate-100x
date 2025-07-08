const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json())

let users = [];

function requestDetails(req, res, next) {
    let startTime = Date.now();
    next();
    let endTime = Date.now();
    let obj = {
        "Method": req.method,
        "Route": req.route.path,
        "Time Spend": `${endTime - startTime}ms`
    }
    console.log(obj);
}

app.use(requestDetails);

function authMiddleware(req, res, next) {
    let token = req.headers.token;
    let username = jwt.verify(token, '123random')
    req.username = username;
    next();
}

app.post('/signup', function (req, res) {
    let signupdetails = req.body;
    const user = users.find(element => { return element.username == signupdetails.username })
    if (!user) {
        users.push(signupdetails);
        res.json(users);
    }
    else {
        res.send("User already exists");
    }
})

app.post('/signin', function (req, res) {
    let logindetails = req.body;
    let token = jwt.sign(logindetails.username, '123random');
    res.send(token);
})

app.get('/name', authMiddleware, function (req, res) {
    res.send(req.username);
})

// app.get('/:count', function (req, res) {
//     let num = req.query.num;
//     let sum = 0;
//     for (let i = 0; i <= num; i++) {

//         sum = sum + i;
//     }
//     res.send(sum);
// })

// app.get('/requestCount', function (req, res) {
//     res.send(requestCount);
// })

app.listen(3000);