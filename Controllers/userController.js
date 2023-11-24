const userModel = require("../Models/userModel")
const validator = require("../validator/Validations")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config() 

// password hashing using bcrypt library
const passwordhash = async function(password){
    return new Promise((resolve, reject)=>{
        const saltRounds = 10
        bcrypt.hash(password, saltRounds, function(err , hash){
            if(err) return res.status(400).send({status:false, message:"invalid password"})
            else return resolve(hash)
        })
    })
}





const registerUser = async(req, res)=>{
     
    try {
     const data = req.body
   
    if(Object.keys(data).length==0 || !data.username || !data.email || !data.password) return res.status(400).send({status:false,message:"Enter all the details"})
    


  const findUser = await userModel.findOne({$or:[{email:data.email}, {phone:data.phone}]}) 
 
  if(findUser)
  {
  if(findUser.email===data.email) return res.status(400).send({status:false,message:"Email already regustered"})
 
  if(findUser.phone===data.phone) return res.status(400).send({status:false,message:"Phone already exists"})
  }
  
  if(!validator.isValidName(data.username)) return res.status(400).send({status:false, message:"name can only contain alphabets"})
    data.username = data.username.toLowerCase().trim()

  if(!validator.isValidEmail(data.email)) return res.status(400).send({status:false, message:"Enter correct email -- example@website.com"})
  data.email = data.email.toLowerCase().trim()
if(!validator.isValidMobile(data.phone)) return res.status(400).send({status:false, message:"Invalid phone number"})
data.phone = data.phone.trim()
  data.password = await passwordhash(data.password)
  
  const registerUser = await userModel.create(data)

  return res.status(200).send({status:true,data:registerUser})
} catch (error) {
    return res.status(500).send({status:false, message:error.message})
}
}




const loginUser = async(req, res)=>{

    try {
    const {email, password} = req.body
    
    if(!validator.isValidEmail(email)) return res.status(400).send({status:false, message:"Enter correct email -- example@website.com"})

    const findUser = await userModel.findOne({email:email})
    
    
    if(Object.keys(findUser).length===0) return res.status(400).send({status:false, message:"Email doesnt exists"})
    if(findUser){
        bcrypt.compare(password, findUser.password, function(err, result){
            if(result) {
                let token = jwt.sign({id:findUser._id}, process.env.Secret_key, {expiresIn:"24h"})
                res.setHeader("Authorization", token)
                
                return res.status(200).send({status:true, message:"You have successfully logged in",data:token})
            }
            else{
                return res.status(400).send({status:false, message:"Incorrect password"})
            }
        })
    }
} catch (error) {
        return res.status(500).send({status:false, message:error.message})
}
}

module.exports.registerUser = registerUser
module.exports.loginUser = loginUser