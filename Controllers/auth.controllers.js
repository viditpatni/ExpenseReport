const bcrypt = require("bcrypt");
const { User} = require("../models");
const jwt=require("jsonwebtoken");
const localStorage=require("localStorage");
const nodemailer=require("nodemailer")




exports.signUp= async (req, res)=>{

    var {Name, email, password}=req.body;

    

 try{
    const user= await User.create({Name:Name,email:email,password:bcrypt.hashSync(password,8)});

    const transport=nodemailer.createTransport({

        service:'Gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    
    })

    jwt.sign({id:user.id}, process.env.SECRET_KEY,{expiresIn:86400}, (err, token)=>{
        const url = `http://localhost:8082/confirmation/${token}`;

        transport.sendMail({
            to:email,
            subject:'Confirm Email',
            html:`<p>Please click below url to confirm your email:</p> <a href="${url}">${url}</a>`
        })
    })

    return user;
 }
 catch(err){
   return res.status(500).send({message:err.message||"Something went wrong"})
 }
}

exports.signIn = async (req, res)=>{
    const {email, password}=req.body;

    if(!email||!password){
        return res.status(400).send({message:"Email or password cannot be empty"})
    }
try{
   var user = await User.findOne({where:{email:email} })
}

catch(err){
       return res.status(500).send({message:err.message||"Something went wrong"})
    }

        if(!user){
            return res.status(400).send({message:'User not found'})
        }

        var isPasswordValidate=bcrypt.compareSync(password, user.password);

        if(!isPasswordValidate){
           return res.status(401).send({message:'Invalid Password'})
        }
            if(!user.confirmed){
                return res.send("please confirm email before login")
            }

        const token=jwt.sign({id:user.id}, process.env.SECRET_KEY,{expiresIn:86400})

            localStorage.setItem("token", token)

       res.redirect("/expenses/api/v1/getAllExpenses")

}

exports.resetPassword = async (req, res)=>{

    const {email, p1, p2} =req.body

    var user = await User.findOne({where:{email:email} })

    let message=""

    if(!user) {
        message="No user found with given email, please try again";

        return res.render("forgotP", {message:message})
    }

    else if(p1!=p2){
        message="Password does not match, please try again";

        return res.render("forgotP", {message:message}) 
    }
    else{
    await User.update({password:bcrypt.hashSync(p1,8)},{where:{
        id:user.id
    }});
}

    const token=jwt.sign({id:user.id}, process.env.SECRET_KEY,{expiresIn:'1d'})

    localStorage.setItem("token", token)

    res.redirect("/expenses/api/v1/auth/signin")    


}

exports.confirmEmail = (req, res)=>{

   const decoded= jwt.verify(req.params.token, process.env.SECRET_KEY)




    User.update({confirmed:true}, {where:{
        id:decoded.id
    }})

    return res.redirect("/expenses/api/v1/auth/signin")
}

