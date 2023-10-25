const express = require('express');
const router = express.Router();
const userController = require("./Controllers/userController")
const taskController = require("./Controllers/taskController")
const middleware = require("./Middleware/middleware")


router.post("/register", userController.registerUser)
router.post("/login", userController.loginUser)
router.post("/task/:userId", middleware.authentication, taskController.createTask)
router.post("/taskdone/:userId/:taskId",middleware.authentication,middleware.authorization, taskController.taskDone)

router.get("/gettasks", taskController.getPendingTasks)










router.all('/*',(req,res)=>res.status(404).send("page not found"));
module.exports = router;