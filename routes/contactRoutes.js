const express = require('express')
const { contactModel } = require('../models/contact.model')
const contactRouter= express.Router()


//! Get the contacts

contactRouter.get("/",async(req,res)=>{
    const {name,sort} = req.query
    console.log(req.query)
    try{
        let contacts;
        if(name!=="undefined"&&name!==""){
 contacts= await contactModel.find({author:{$eq:req.body.author},name:{$eq:name}})
        }
        else if(sort!=="undefined"){ 
            contacts= await contactModel.find({author:{$eq:req.body.author}}).sort({name:sort})
        }
        else {
            contacts= await contactModel.find({author:{$eq:req.body.author}})
        }
res.send(contacts)
    }
    catch(err){
        res.status(400).send("please login")
    }
})

//! Create a new contact

contactRouter.post("/create",async(req,res)=>{
try {
    console.log(req.body)
    let newContact = new contactModel(req.body)
   let contact= await newContact.save()
    res.send(contact)
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