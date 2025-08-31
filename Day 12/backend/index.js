const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

function authMiddleware(req, res, next) {
    const decoded = jwt.verify(req.headers.token, "random119");
    req.loginDetails = decoded;
    next();
}

app.post('/signup', function (req, res) {
    const { username, name, password } = req.body;
    prisma.user.create({
        data: {
            username: username,
            name: name,
            password: password
        }
    }).then((user) => {
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

app.post('/signin', function (req, res) {
    const { username, password } = req.body;
    prisma.user.findFirst({ where: { username: username, password: password } })
        .then((user) => {
            if (user) {
                const token = jwt.sign(user.id, "random119");
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

app.post('/createBlog', authMiddleware, function (req, res) {
    const id = parseInt(req.id);
    const { title, contents } = req.body;
    if (id) {
        prisma.blogs.create({
            data: {
                userId: id,
                title: title,
                contents: contents
            }
        }).then((blog) => {
            res.send("blog added")
        })
            .catch((err) => res.status(401).send("blog was not added"+err))
    }
    else {
        res.status(401).send("Invalid token!")
    }

})

app.get('/blogs', authMiddleware , function(req,res){
    const id = parseInt(req.id);
    prisma.blogs.findMany({ where: { userId : id } })
        .then((blogs) => {
            if (blogs) {
                res.json(blogs);
            }
            else {
                res.status(401).send("no blogs found");
            }
        })
        .catch((err) =>
            res.status(401).send("fetching blogs failed!")
        )
})

app.listen(3000, () => {
    console.log('Sever started at port 3000');
});
