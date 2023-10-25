const express = require("express")
const app = express()
const mongoose = require("mongoose")

const route = require("./route")


app.use(express.json())

mongoose.connect("mongodb+srv://ankitdb:ankit321@cluster0.nz06g9j.mongodb.net/todolist?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then(()=>console.log("MongoDB is connected"))
.catch((err)=> console.log(err))

app.use("/", route)

app.listen(3000, function(){
    console.log("port is running on port 3000")
})