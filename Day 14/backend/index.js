const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client');
const app = express()
const prisma = new PrismaClient();
app.use(cors())
app.use(express.json())

function authMiddleware(req, res, next) {
    const decoded = jwt.verify(req.headers.token, "random119");
    req.decoded = decoded;
    next();
}

app.post('/adminSignup', function (req, res) {
    let signupDetails = req.body;
    console.log(signupDetails)
    prisma.users.create({
        data: {
            username: signupDetails.username,
            password: signupDetails.password,
            role: 0
        }
    })
        .then((admin) => {
            res.send("Admin created")
        })
        .catch((err) => {
            if (err.name == "PrismaClientKnownRequestError") {
                res.status(401).send("Admin exists")
            }
            else {
                res.status(401).send("signup failed!")
            }
        })
}
);

app.post('/userSignup', function (req, res) {
    let signupDetails = req.body;
    prisma.users.create({
        data: {
            username: signupDetails.username,
            password: signupDetails.password,
            role: 1
        }
    })
        .then((user) => {
            res.send("user created")
        })
        .catch((err) => {
            if (err.name == "PrismaClientKnownRequestError") {
                res.status(401).send("user exists")
            }
            else {
                res.status(401).send("signup failed!")
            }
        })
}
);

app.post('/adminSignin', function (req, res) {
    let signinDetails = req.body;
    prisma.users.findFirst({ where: { username: signinDetails.username, password: signinDetails.password, role: 0 } })
        .then((admin) => {
            if (admin) {
                const dataToBeSigned  = {
                    id:admin.id,
                    role:admin.role
                }
                const token = jwt.sign(dataToBeSigned, "random119");
                res.send(token);
            }
            else {
                res.status(401).send("invalid creds");
            }
        })
        .catch((err) =>
            res.status(401).send("signin failed!")
        )
}
);

app.post('/userSignin', function (req, res) {
    let signinDetails = req.body;
    prisma.users.findFirst({ where: { username: signinDetails.username, password: signinDetails.password, role: 1 } })
        .then((user) => {
            if (user) {
                const dataToBeSigned  = {
                    id:user.id,
                    role:user.role
                }
                const token = jwt.sign(dataToBeSigned, "random119");
                res.send(token);
            }
            else {
                res.status(401).send("invalid creds");
            }
        })
        .catch((err) =>
            res.status(401).send("signin failed!")
        )
}
);

app.post('/createQuiz', authMiddleware, function(req,res){
    if(req.decoded.role === 0){
        prisma.quizes.create({
            data:{
                title: req.body.title,
                userid: req.decoded.id
            }
        })
        .then((quiz) => {
            res.json({
                quizid:quiz.id,
                msg:"Quiz created"
            })
        })
        .catch((err) => {
            if (err.name == "PrismaClientKnownRequestError") {
                res.status(401).send("Use a different title for the quiz")
            }
            else {
                res.status(401).send("quiz creation failed")
            }
        })
    }
    else{
        res.status(401).send("You are not authorised to create quizes")
    }
})

app.post('/addQuestion/:quizid', authMiddleware, function(req,res){
 if(req.decoded.role === 0){
        prisma.questions.create({
            data:{
                question : req.body.question,
                answer  : req.body.answer,
                quizid : req.params.quizid
            }
        })
        .then((question) => {
            req.body.options.forEach(element => {
                prisma.options.create({
                data:{
                    option : element,
                    questionid: question.id
                }
            })
                
            });
        })
        .catch((err) => {
            res.status(401).send("Adding questions failed")
        })
    }
})
    
    
app.listen(3000,()=>{
    console.log("Server started at port 3000")
})