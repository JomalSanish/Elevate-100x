const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const { signupZod, signinZod, blogZod } = require('./types');
const { UserModel, BlogModel } = require('./models');
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb+srv://jomalsanish:jpCnQ4RW7N5WcA@cluster0todo.kbphbap.mongodb.net/Blogging-Site?retryWrites=true&w=majority&appName=Cluster0todo');

function authMiddleware(req, res, next) {
    const userid = jwt.verify(req.headers.token, "random119");
    req.userid = userid;
    next();
}

app.get('/allBlogs', function (req, res) {
    BlogModel.find({})
        .then(function (blogs) {
            res.json(blogs);
        })
})

app.post('/signup', function (req, res) {
    const signupDetails = signupZod.safeParse(req.body);
    if (!signupDetails.success) {
        return res.status(401).send("Invalid input");

    }
    else {
        UserModel.findOne({ username: signupDetails.data.username })
            .then(function (user) {
                if (!user) {
                    signupDetails.data.id = Math.floor(Math.random() * 10000)
                    UserModel.create(signupDetails.data)
                        .then(() => {
                            res.send("User created");
                        })
                }
                else {
                    res.status(401).send("User exists!")
                }
            })
    }
})

app.post('/signin', function (req, res) {
    const signinDetails = signinZod.safeParse(req.body);
    if (!signinDetails.success) {
        return res.status(401).send("Invalid input");
    }
    else {
        UserModel.findOne({ username: signinDetails.data.username, password: signinDetails.data.password })
            .then(function (user) {
                if (user) {
                    const token = jwt.sign(user.username, "random119");
                    res.send(token);
                }
                else {
                    res.status(401).send("Invalid creds");
                }
            })
    }
})

app.post('/createBlog', authMiddleware, function (req, res) {
    const userid = req.userid;
    const blogDetails = blogZod.safeParse(req.body);
    if (!blogDetails.success) {
        return res.status(401).send("Invalid input");
    }
    else {
        if (userid) {
            blogDetails.data.id = Math.floor(Math.random() * 10000);
            blogDetails.data.userid = userid;
            BlogModel.create(blogDetails.data)
                .then(() => {
                    res.send("Blog added for " + blogDetails.data.userid);
                })
                .catch(function (err) {
                    res.status(401).send("Adding Blogs failed");
                })
        }
        else {
            res.status(401).send("Invalid token!")
        }
    }
})

app.get('/blogs', authMiddleware, function (req, res) {
    const userid = req.userid;
    if (userid) {
        BlogModel.find({ userid: userid })
            .then(function (blogs) {
                res.json(blogs);
            })
    }
})

app.get('/blog/:id', function (req, res) {
    const id = req.params.id;
    BlogModel.findOne({ id: id })
        .then(function (blogs) {
            res.json(blogs);
        })
})

app.delete('/blog/:id', authMiddleware, function (req, res) {
    const userid = req.userid;
    const id = req.params.id;
    if (userid) {
        BlogModel.deleteOne({ userid: userid, id: id })
            .then(function (result) {
                if (result.deletedCount > 0) {
                    res.send("Deleted " + id);
                }
            })
    }
})



app.listen(3000, () => {
    console.log('Server started at port 3000')
})