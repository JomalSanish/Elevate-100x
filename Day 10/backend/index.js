const jwt = require('jsonwebtoken');
const express = require('express')
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const zod = require('./types')
const mongo = require('./models')
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://jomalsanish:jpCnQ4RW7N5WcA@cluster0todo.kbphbap.mongodb.net/TodoApp?retryWrites=true&w=majority&appName=Cluster0todo');

//post with username, name, password
app.post('/signup', function (req, res) {
    const signupdetails = zod.signupZod.safeParse(req.body);
    if(!signupdetails.success){
        res.send("Incorrect details")
        return
    }
    else{
    mongo.usersModel.findOne({username:signupdetails.data.username})
    .then(function(user){
        if(!user){
            signupdetails.data.id = Math.floor(Math.random() * 100000);
            mongo.usersModel.create(signupdetails.data)
            .then(function (){
                res.send("New user Created");
            })
        }
        else{
            res.send("Username already used!")
        }
    })
}
})

//post with username, password and returns token
app.post('/signin', function (req, res) {
    const logindetails = zod.signinZod.safeParse(req.body);
    if(!logindetails.success){
        res.send("Incorrect details")
        return
    }
    else{
    mongo.usersModel.findOne({username:logindetails.data.username})
    .then(function(user){
    if (user) {
        if (user.password === logindetails.data.password) {
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
    }
})

//post with token in header, todo
app.post('/create-todos', function (req, res) {
    let token = req.headers.token;
    let todo = req.body;
    const unsignedData = jwt.verify(token, "123random");
    mongo.usersModel.findOne({id:unsignedData.id})
    .then(function(user){
    if (user) {
        todo.id = Math.floor(Math.random() * 100000);
        todo.userid = user.id;
        mongo.todosModel.create(todo);
        res.send(todo);
    }
    })
});


//get with token in header
app.get('/todo', function (req, res) {
    let token = req.headers.token;
    const unsignedData = jwt.verify(token, "123random");
    mongo.todosModel.find({userid: unsignedData.id})
    .then(function(todos){
        res.json(todos);
    })
    
})


// //just a get 
// app.get('/todos', function (req, res) {
//     res.send(todos);
// })


// //id as parameter 
// app.get('/todo/:id', function (req, res) {
//     let id = req.params.id;
//     const todo = todos.find(element => { return element.id == id })
//     res.send(todo);
// })

// //id as parameter
// app.delete('/todo/:id', function (req, res) {
//     let token = req.headers.token;
//     let id = req.params.id;
//     const unsignedData = jwt.verify(token, "123random");
//     const index = todos.findIndex(item => item.id == id);
//     if (index !== -1 && todos[index].userid == unsignedData.id) {
//         todos.splice(index, 1);
//         res.send("Deleted")
//     }
//     else {
//         res.send("Error Occured")
//     }
// })


app.listen(3000);