const signUpValidator=require("../MiddleWares/signUpValidator");
const authControllers=require("../Controllers/auth.controllers");
const authJWT=require("../MiddleWares/authJWT")


module.exports=(app)=>{

    app.get("/", authControllers.isLoggedIn)

    app.get("/expenses/api/v1/auth/signup", function(req, res){
        res.render("register")
    })

    app.get("/expenses/api/v1/auth/signin", function(req, res){
        res.render("login",{message:""})
    })

    app.get("/expenses/api/v1/auth/resetPassword", function(req, res){
        res.render("forgotP",{message:"", sent:false, result:"", email:""})
    })

    app.post("/expenses/api/v1/auth/resetPassword", authControllers.resetPassword)

app.post("/expenses/api/v1/auth/signup", signUpValidator.checkDuplicateEmail, authControllers.signUp)

app.post("/expenses/api/v1/auth/signin", authControllers.signIn)

app.get("/confirmation/:token", authControllers.confirmEmail)

app.post("/expenses/api/v1/auth/otp", authControllers.verifyOtp)

app.get("/expenses/api/v1/auth/signout", authControllers.signout)


}