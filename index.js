const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const route = require("./route")

app.use(cors())
app.use(cors({ credentials: true, origin: true }));

require("dotenv").config() 

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

  const url = process.env.DB_URL
  const PORT = process.env.PORT || 4000

mongoose.connect(url, {
    useNewUrlParser: true
})
.then(()=>console.log("MongoDB is connected"))
.catch((err)=> console.log(err))

app.use("/", route)

app.listen(PORT, function(){
    console.log("port is running on port 4000")
})