const express = require('express')
const app = express()
const path = require('path')
console.log(__dirname)

app.use(express.static('./'))

app.get('/',(req,res)=>{

    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3000,()=>console.log("Listening on 3000"))