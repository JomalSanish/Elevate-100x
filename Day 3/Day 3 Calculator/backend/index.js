const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());


app.get('/pow/:num1/:num2',function(req,res){
    let num1 = req.params.num1;
    let num2 = req.params.num2;
    let ans = parseInt(num1)**parseInt(num2);
    res.send({
        answer : ans
    })
})
app.get('mod/',function(req,res){
    let num1 = req.query.num1;
    let num2 = req.query.num2;
    let ans = parseInt(num1)%parseInt(num2);
    res.send({
        answer : ans
    })
})
app.post('/sum',function(req,res){
    let {num1,num2}=req.body;
    let ans = parseInt(num1)+parseInt(num2);
    res.send({
        answer:ans
    });
})
app.post('/sub',function(req,res){
    let {num1,num2}=req.body;
    let ans = parseInt(num1)-parseInt(num2);
    res.send({
        answer:ans
    });
})
app.post('/mul',function(req,res){
    let {num1,num2}=req.body;
    let ans = parseInt(num1)*parseInt(num2);
    res.send({
        answer:ans
    });
})
app.post('/div',function(req,res){
    let {num1,num2}=req.body;
    let ans = parseInt(num1)/parseInt(num2);
    res.send({
        answer:ans
    });
})

app.listen(3000,()=>{
    console.log("Server started");
})