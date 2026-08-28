const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req,res) => {
    res.send("Hello From Backend!")
})

app.listen(port,() => {
    console.log(`The Server Is Running On PORT ${port}`)
})