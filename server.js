const express = require("express");
const json2xls=require("json2xls");

const nodemailer=require("nodemailer");

const http=require('http')


require("dotenv").config();

const config = require("./configs/db.config");
const bodyParser = require("body-parser");



const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"))


app.use(json2xls.middleware)

app.set('view engine', 'ejs')

const db=require("./models/index");








db.sequelize.sync({force:false})
.then(()=>{
    console.log("DB synced");
})

require("./routes/auth.routes")(app);
require("./routes/expenses.routes")(app);




app.listen(process.env.PORT,()=>{
    console.log('Application is running on port '+ process.env.PORT);
})

