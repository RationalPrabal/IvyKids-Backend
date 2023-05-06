const mongoose= require("mongoose")

const contactSchema= mongoose.Schema({
    name:String,
email : String,
contact_number:Number,
address:String,
author:String,
})

const contactModel= mongoose.model("contact",contactSchema)

module.exports={
    contactModel
}