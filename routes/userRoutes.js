const express= require("express")
const jwt=require("jsonwebtoken")
const bcrypt= require("bcrypt")
const { userModel } = require("../models/user.model")




const userRouter= express.Router()

//! registration

userRouter.post("/register",async(req,res)=>{
    try{
bcrypt.hash(req.body.password,3,async(err,hash)=>{
    if(err){
        throw err
    }
    else if(hash){
        req.body.password=hash

        let newUser= new userModel(req.body)
        await newUser.save()

        res.send("user has been registered")
    }
})
    }
    catch{
res.send("can not register the user")
    }
})


//!login 

userRouter.post("/login",async(req,res)=>{
    let email= req.body.email
    try{
let user= await userModel.find({email})
if(user.length){
    bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
        if(err){
            res.send("please enter correct email/password")
        }
        if(result){
            const token= jwt.sign({user:user[0]._id},"masai")
            res.send({"mes":"login success","token":token})
        }
        else{
            res.send("please enter correct email/password")
        }
    })
}
else {
    res.send("please enter correct email/password")
}
    }
    catch{
res.send("can not login")
    }
})

module.exports={
userRouter
}