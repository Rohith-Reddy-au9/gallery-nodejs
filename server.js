const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const {readdirSync} = require('fs')
require('dotenv').config()

const port = process.env.PORT || 6000

const MONGO_URL = "mongodb+srv://rohith:rohith06@cluster0.d3ltm.mongodb.net/mayfprt?retryWrites=true&w=majority"


const app = express()
app.use(cors())
app.use(express.json()); 

app.get('/', (err, res) => {
    if(err) console.error(err)
    res.send("api hitting")
})

mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err))

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));


app.listen(port, (err, res) => {
    if (err) console.log(err)
    console.log(`server is running on ${port}`)
})