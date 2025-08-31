const express = require('express')
const app = express()
const port = 3000

// get=frontend to get something, post= to post something, put= update , delete = delete something
app.use(express.json())

function sum(n){
  let ans = parseInt(n)+10;
  return ans;
}
app.get('/', (req, res) => {
  const n = req.query.n;
  const ans = sum(n);
  res.send('Answer:'+ ans);
})

app.post('/',(req,res) => {
  const { name, age } = req.body;
  res.send('Name' + name + '\nAge' + age);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})