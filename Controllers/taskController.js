const taskModel = require("../Models/taskModel")
const mongoose = require("mongoose")


const createTask = async(req, res)=>{

    try {
        
   
    const userId = req.params.userId
    
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({ status: false, message: "invalid user Id" })
    const data = req.body
    if(Object.keys(data).length==0 || !data.title || !data.description) return res.status()
    data.user = userId
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    data.createdAt = formattedDate
    const newTask =  await taskModel.create(data)
     return res.status(201).send({status:true,message:newTask})
    } catch (error) {
        return res.status(500).send({status:false, message:error.message})
    }
}


const taskDone = async(req, res)=>{

    try {
        
    const userId = req.params.userId
    const taskId = req.params.taskId
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({status:false, message:"userId is not valid"})
    if(!mongoose.Types.ObjectId.isValid(taskId)) return res.status(400).send({status:false, message:"taskId is not valid"})
//if(!userId || !taskId) return res.status(400).send({status:false, message:"data is  missing"})
    const findTask = await taskModel.findById(taskId)
    if(!findTask) return res.status(400).send({status:false, message:"No tasks found"})
    const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const taskCompleted = await taskModel.findOneAndUpdate({_id:taskId},{isCompleted:true , completedAt:formattedDate},{new:true})
  return res.status(200).send({status:true, message:"Task is marked completed"})

} catch (error) {
    return res.status(500).send({status:false, message:error.message})
}
}


const getPendingTasks =  async(req, res)=>{

    const userId = req.params.userId

    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({status:false, message:"userId is not valid"})

    const getTasks = await taskModel.find({$and:[{isCompleted:false},{user:userId}]})

    return res.staus(200),send({status:true, data:getTasks})
}

module.exports.createTask = createTask
module.exports.taskDone = taskDone

module.exports.getPendingTasks = getPendingTasks