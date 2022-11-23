const signUpValidator=require("../Middlewares/signUpValidator");
const authControllers=require("../Controllers/auth.controllers");
const authJWT=require("../MiddleWares/authJWT")


module.exports=(app)=>{

    app.get("/expenses/api/v1/auth/signup", function(req, res){
        res.render("register")
    })

    app.get("/expenses/api/v1/auth/signin", function(req, res){
        res.render("login")
    })

    app.get("/expenses/api/v1/auth/resetPassword", function(req, res){
        res.render("forgotP",{message:""})
    })

    app.post("/expenses/api/v1/auth/resetPassword", authControllers.resetPassword)

app.post("/expenses/api/v1/auth/signup", signUpValidator.checkDuplicateEmail, authControllers.signUp)

app.post("/expenses/api/v1/auth/signin", authControllers.signIn)

app.get("/confirmation/:token", authControllers.confirmEmail)


}