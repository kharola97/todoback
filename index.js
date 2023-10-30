const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const route = require("./route")
app.use(cors())
app.use(cors({ credentials: true, origin: true }));

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
   
    next();
  });


mongoose.connect("mongodb+srv://ankitdb:ankit321@cluster0.nz06g9j.mongodb.net/todolist?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then(()=>console.log("MongoDB is connected"))
.catch((err)=> console.log(err))

app.use("/", route)

app.listen(4000, function(){
    console.log("port is running on port 4000")
})