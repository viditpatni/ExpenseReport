const bcrypt = require("bcrypt");
const { User} = require("../models");
const jwt=require("jsonwebtoken");
const localStorage=require("localStorage");
const nodemailer=require("nodemailer");


const transport=nodemailer.createTransport({

    service:'Gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }

})


exports.signUp= async (req, res)=>{

    var {Name, email, password}=req.body;

    

 try{
    const user= await User.create({Name:Name,email:email,password:bcrypt.hashSync(password,8)});

    

    jwt.sign({id:user.id}, process.env.SECRET_KEY,{expiresIn:86400}, (err, token)=>{
        const url = `https://expense-report-node.herokuapp.com/confirmation/${token}`;

        transport.sendMail({
            to:email,
            subject:'Confirm Email',
            html:`<p>Please click below url to confirm your email:</p> <a href="${url}">${url}</a>`
        })
    })

    return res.render("login",{message:""});
 }
 catch(err){
   return res.status(500).send({message:err.message||"Something went wrong"})
 }
}

exports.signIn = async (req, res)=>{
    const {email, password}=req.body;
    

try{
   var user = await User.findOne({where:{email:email} })
}

catch(err){
       return res.status(500).send({message:err.message||"Something went wrong"})
    }

        if(!user){
            return res.render("login",{message:"User not found, please Sign Up."})
        }

        var isPasswordValidate=bcrypt.compareSync(password, user.password);

        if(!isPasswordValidate){
           return res.render("login", {message:'Invalid Password, please try again or reset Password'})
        }
            if(!user.confirmed){
                return res.render("login",{message:"please confirm email before login"})
            }

        const token=jwt.sign({id:user.id}, process.env.SECRET_KEY,{expiresIn:86400})

            localStorage.setItem("token", token)

       res.redirect("/expenses/api/v1/getAllExpenses")

}

exports.resetPassword = async (req, res)=>{

    const { email, p1, p2} =req.body

    var user = await User.findOne({where:{email:email} })

    await User.update({password:bcrypt.hashSync(p1,8)},{where:{
        id:user.id
    }});


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

exports.verifyOtp= async(req, res)=>{

    var user = await User.findOne({where:{email:req.body.email} })

    let message=""

    if(!user) {
        message="No user found with given email, please try again";

        return res.render("forgotP", {message:message, sent:false, result:""})
    }
    let result = Math.floor(100000 + Math.random()*900000);
    

    
    transport.sendMail({
        to:req.body.email,
        subject:'Verify OTP',
        html:`<p>Please enter the below One time password to reset your password:</p> <h3>${result}</h3>`
    })
    
    res.render("forgotP", {message:"",sent:true, result:result, email:req.body.email})


}

exports.isLoggedIn = (req, res)=>{
    let token=localStorage.getItem("token")
    if(!token) res.render("home",{userName:null})

    else{
        jwt.verify(token, process.env.SECRET_KEY, async function(err, decoded){
            if(err) return res.status(401).send({message:"Unauthorised"});
    
            const userId=decoded.id;
    
            const user=await User.findByPk(userId);
            
            req.user=user;

            res.render("home",{userName:user.Name})
    })
    }
}

exports.signout =(req, res)=>{
    localStorage.removeItem("token");

    res.render("home",{userName:null})
}
