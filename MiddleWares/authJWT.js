const jwt=require("jsonwebtoken");
const { User } = require("../models");
const localStorage=require("localStorage")

const verifyToken=(req, res, next)=>{

let token=localStorage.getItem("token");


if(!token) return res.status(403).send("Token is missing");

else{
    jwt.verify(token, process.env.SECRET_KEY, async function(err, decoded){
        if(err) return res.status(401).send({message:"Unauthorised"});

        const userId=decoded.id;

        const user=await User.findByPk(userId);
        
        req.user=user;
        next();
    })
}




}
module.exports={
    verifyToken
}