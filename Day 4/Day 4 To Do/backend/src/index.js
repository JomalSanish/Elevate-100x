const express = require('express');
const app = express();
const cors = require('cors')
const fs = require('fs');
app.use(cors())
app.use(express.json())


let text = [];

app.post('/',function(req,res){
    const newentry = req.body;
    text.push(newentry);
    res.send(newentry)
    fs.writeFile("todo.txt",JSON.stringify(text), "utf-8", function (err) {})
})

app.get('/',function(req,res){
    fs.readFile("todo.txt", "utf-8", function (err, data) {
        if(data){
            const text= JSON.parse(data);
            res.json(text);
        }
    })
})

app.delete('/',function(req,res){
    const id = req.body.id;
    fs.readFile("todo.txt", "utf-8", function (err, data) {
        let text = [];
        if(data){
            text = JSON.parse(data);
        }

    })
    const index = text.findIndex(item => item.num == id);
    if (index !== -1) {
        text.splice(index, 1);
    }
    fs.writeFile("todo.txt", JSON.stringify(text), "utf-8", function (err) {})
})

app.listen(3000);

