const express = require('express');
const cors = require('cors');
const app= express();
const port = process .env .PORT || 5000;

// middleare
 app.use(express.json())
 app.use(cors())

app.get("/", (req, res)=>{
    res.send("Car Show server Running")
})

app.listen(post, ()=>{
     console.log(`Port is Running form: ${port}`);
})