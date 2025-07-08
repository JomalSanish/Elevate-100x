const jwt = require('jsonwebtoken');
const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

let users = [
    {
        "id": 12312,
        "username": "thegoodguy",
        "name": "yohan",
        "password": "maaman",
    },
    {
        "id": 78621,
        "username": "iamtheone",
        "name": "pranav",
        "password": "mallia",
    }
];

let blogs = [
    {
        "id": 36121,
        "title": "Three body problem",
        "content": "These are a collection of 4 books based on science-fiction.",
        "userid": 12312
    },
    {
        "title": "How to ear?",
        "content": "eat!!",
        "id": 45207,
        "userid": 12312
    },
    {
        "title": "How to ear?",
        "content": "just eat!!",
        "id": 88441,
        "userid": 12312
    },
    {
        "title": "How to ear?",
        "content": "just dont eat!!",
        "id": 81342,
        "userid": 78621
    },
    {
        "title": "How to ear?",
        "content": "dont eat!!",
        "id": 33535,
        "userid": 78621
    },
    {
        "title": "How to ear?",
        "content": "why do you wanna eat",
        "id": 61864,
        "userid": 78621
    }
]

//post with username, name, password
app.post('/signup', function (req, res) {
    const signupdetails = req.body;
    let user = users.find(element => { return element.username === signupdetails.username })
    if (!user) {
        signupdetails.id = Math.floor(Math.random() * 100000);
        users.push(signupdetails);
        res.send("New user Created");
    }
    else {
        res.status(401).send("Username already used!")
    }
})

//post with username, password and returns token
app.post('/signin', function (req, res) {
    const logindetails = req.body;
    let user = users.find(element => { return element.username === logindetails.username })
    if (user) {
        if (user.password === logindetails.password) {
            let dataToBeSigned = {
                "id": user.id,
                "username": user.username
            }
            let token = jwt.sign(dataToBeSigned, "123random");
            res.status(200).send(token);
        }
        else {
            res.status(401).send("Incorrect password");
        }
    }
    else {
        res.status(401).send("User not found");
    }
})

//get with token in header
app.get('/blogs', function (req, res) {
    let token = req.headers.token;
    const unsignedData = jwt.verify(token, "123random");
    let blogsToBeReturned = [];
    blogs.forEach(element => {
        if (element.userid == unsignedData.id) {
            blogsToBeReturned.push(element);
        }
    })
    res.send(blogsToBeReturned);

})

//post with token in header, title, content
app.post('/create-blogs', function (req, res) {
    let token = req.headers.token;
    let blog = req.body;
    const unsignedData = jwt.verify(token, "123random");
    const user = users.find(element => { return element.id == unsignedData.id })
    if (user) {
        blog.id = Math.floor(Math.random() * 100000);
        blog.userid = user.id;
        blogs.push(blog);
        res.send("Added Successfully");
    }
});


//just a get 
app.get('/allBlogs', function (req, res) {
    res.send(blogs);
})

//id as parameter 
app.get('/blog/:id', function (req, res) {
    let id = req.params.id;
    const blog = blogs.find(element => { return element.id == id })
    res.send(blog);
})

//id as parameter
app.delete('/blog/:id', function (req, res) {
    let token = req.headers.token;
    let id = req.params.id;
    const unsignedData = jwt.verify(token, "123random");
    const index = blogs.findIndex(item => item.id == id);
    if (index !== -1 && blogs[index].userid == unsignedData.id) {
        blogs.splice(index, 1);
        res.send("Deleted")
    }
    else {
        res.send("Error Occured")
    }
})


app.listen(3000);