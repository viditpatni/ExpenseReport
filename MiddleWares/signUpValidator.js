const { User} = require("../models");

const checkDuplicateEmail=(req, res, next)=>{


    User.findOne({
        where:{email:req.body.email
    }})
    .then(user=>{
        if(user){
            return res.status(400).send({message:" Email id already exists!"})
        }
        next();
    })
    .catch(err=>{
        return res.status(500).send({message:err.message||"Something went wrong"})
    })
}

module.exports={checkDuplicateEmail};
