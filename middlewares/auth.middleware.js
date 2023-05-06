const jwt= require("jsonwebtoken")

const authentication=(req,res,next)=>{
let token= req.headers.authorization

if(token){
    jwt.verify(token,"masai",(err,decoded)=>{
        if(decoded){
            console.log(decoded)
          req.body.author= decoded.user
            next()
        }
        if(err){
            res.send("please login")
        }
    })
}
else{
    res.send("please login")
}

}

module.exports={
    authentication
}
