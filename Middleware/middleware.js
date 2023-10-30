const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const taskModel = require("../Models/taskModel")

const authentication =  async(req, res, next)=>{
    try {
    
    const token = req.headers["token"]
 
    if(!token) return res.status(405).send({status:false,message:"Token is missing"})

    jwt.verify(token , "secret-key", function(err,decodedToken){
     
    if(err){ console.log("jwt", err)
      return res.status(408).send({status:false, message:"Invalid token"})}

    req.token = decodedToken.id
    
     next()

    })

} catch (error) {
    return res.status(500).send({status:false, message:error.message})

}
}


const authorization = async(req, res, next)=>{
    try {
        
    const userId = req.params.userId

    const taskId = req.params.taskId

    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(408).send({status:false,message:"Userid is not valid"})

    if(!mongoose.Types.ObjectId.isValid(taskId)) return res.status(407).send({status:false,message:"invalid task id"})

    const findTask  = await taskModel.findOne({_id : taskId})

    if(!findTask) return res.status(400).send({status:false, message:"Task doesnt exist"})
    console.log(userId)
    console.log(req.token)

    if(userId.toString()!==req.token.toString()) return res.status(403).send({status:false, message:"Access denied"})

    else { 
        next()
    }

} catch (error) {
    return res.status(500).send({status:false, message:error.message})

}

}

module.exports.authentication = authentication
module.exports.authorization = authorization