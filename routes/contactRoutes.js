const express = require('express')
const { contactModel } = require('../models/contact.model')
const contactRouter= express.Router()


//! Get the contacts

contactRouter.get("/",async(req,res)=>{
    try{
const contacts= await contactModel.find({author:{$eq:req.body.author}})
res.send(contacts)
    }
    catch(err){
        res.send("Please Login")
    }
})

//! Create a new contact

contactRouter.post("/create",async(req,res)=>{
try {
    console.log(req.body)
    let newContact = new contactModel(req.body)
    await newContact.save()
    res.send("Contact has been created")
} catch (error) {
    res.send(error.message)
    
}
})


//! Delete a particular contact

contactRouter.delete("/deleteContact/:id",async(req, res)=>{
    try {
        await contactModel.findByIdAndDelete(req.params.id)
        res.send("Contact has been deleted")
    } catch (error) {
        
    }
})

//!Update a parent contact

contactRouter.patch("/updateContact/:id",async(req, res)=>{
try {
    await contactModel.findByIdAndUpdate(req.params.id,req.body)
    res.send("Contact has been updated")

} catch (error) {
    res.send(error.message)
}
})
module.exports ={
    contactRouter
}