const express=require("express")
const cors= require("cors")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/userRoutes")
const { authentication } = require("./middlewares/auth.middleware")
const { contactRouter } = require("./routes/contactRoutes")

const app=express()

app.use(express.json())

app.use(cors({
    origin:"*"
}))

app.use("/user",userRouter)
app.use(authentication)
app.use("/contacts",contactRouter)


app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("connected to db")
    }
    catch(e){
        console.log(e.message)
        console.log("can not connect to db")
    }

    console.log("server is running")
})
