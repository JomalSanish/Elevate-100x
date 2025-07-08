const express = require('express')
const app = express()
app.use(express.json())
const {Pool} = require('pg');

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_2HvBIzokS1Ns@ep-lucky-moon-a8oeat1n-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require"
});

pool.connect().then(function(client){
    app.post("/signup", function(req,res){
        client.query(`INSERT INTO userpg (id, username, password) VALUES ('${Math.floor(Math.random()*10000)}','${req.body.username}','${req.body.password}');`)
        .then((user)=>{
            res.json({
                msg: "User Created",
                user : user
            })
        })
    })
})

app.listen(3000,()=>{
    console.log("Server started at port 3000");
})