const express = require('express');
const app =express();
app.use(express.json());
const cors = require('cors');
app.use(cors())
function sum(num1,num2){
    return parseInt(num1)+parseInt(num2);
}

function sumUpTo(num){
    let sum=0;
    for(let i=0;i<=num;i++){
        sum=sum+i;
    }
    return sum;
}

app.get("/user/userId", function(req,res){
    let userId = req.params.userId;
    res.send("The parameter is "+userId);
});

app.get("/sum/:num1/:num2", function(req,res){
    let num1 = req.params.num1;
    let num2 = req.params.num2;
    res.send("The sum is "+sum(num1,num2));
});

app.post("/sumUpTo", function(req,res){
    let num = req.body.num
    res.send("The sum is "+sumUpTo(num));
})

app.put('/max/:c',function(req,res){
    let a = req.query.a;
    let b = req.body.b;
    let c = req.params.c;
    let d = req.headers.d;
    res.send(Math.max(a,b,c,d));
})

app.listen(3000,()=>{
    console.log("Server started at 3000");
});