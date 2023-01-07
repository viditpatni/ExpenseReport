const json2xls=require("json2xls");

const fs=require("fs");

const express=require("express");

const app=express();

const { User, Expenses, Sequelize, sequelize } = require("../models");
const { DATEONLY, DATE } = require("sequelize");
const exp = require("constants");

var currentYear=new Date().getFullYear();


exports.addOrUpdate = async (req, res) => {

    let { date, Medical, Entertainment, Bills, Groceries, Investment, Gifts, HugeExpense, Miscellaneous, Remarks, Source } = req.body;



    const expense = {
        date: date,
        Medical: parseFloat(Medical),
        Entertainment: parseFloat(Entertainment),
        Bills: parseFloat(Bills),
        Groceries: parseFloat(Groceries),
        Investment: parseFloat(Investment),
        Gifts: parseFloat(Gifts),
        HugeExpense: parseFloat(HugeExpense),
        Miscellaneous: parseFloat(Miscellaneous),
        Remarks: Remarks,
        Source: Source,
        userId: req.user.id,
        Total: parseFloat(Medical)+parseFloat(Entertainment) + parseFloat(Bills) + parseFloat(Groceries) + parseFloat(Investment) + parseFloat(Gifts) + parseFloat(HugeExpense) + parseFloat(Miscellaneous)
    }

    try {

        const exp = await Expenses.findAll({
            where: {
                date: expense.date,
                userId: expense.userId
            }
        })

        if (!exp || exp.length === 0) {
            await Expenses.create(expense);
            res.redirect("/expenses/api/v1/getAllExpenses")
        }
        else {
            await Expenses.update(expense, {
                where: {
                    date: expense.date,
                    userId: expense.userId
                }
            })

            res.redirect("/expenses/api/v1/getAllExpenses")
        }
    }
    catch (err) {
        return res.status(500).send({ message: err.message || "Something went wrong" });
    }

}

exports.getUserExpense = async (req, res) => {

    const user = req.user;

    const userExp = await Expenses.findAll({
        order:[['date', 'DESC']],
        where:{
            userId:user.id
        }
    });

   let arr=[];

   for(let i=0;i<userExp.length;i++){
    arr.push(userExp[i].dataValues);
   }

   


    if(arr.length===0) res.render("addExpense",{userName:user.Name})

    else res.render("expenses", {arr:arr,userName:user.Name});
}

exports.getUserExpenseByMonth = async (req, res) => {

    const user = req.user;

    let {year, month}=req.query

    const exp = await sequelize.query('SELECT * from expenses where MONTH(date)=(:month) and YEAR(date)=(:year) and userId=(:userId)',{
        replacements:{
            year:year,
            userId:user.id,
            month:month
        },
        type:sequelize.QueryTypes.SELECT
    })

    res.render("expenses", {arr:exp});
}

exports.getUserExpenseByYear = async (req, res) => {

    const user = req.user;

    let year=req.body.year;

    const exp = await sequelize.query('SELECT * from expenses where YEAR(date)=(:year) and userId=(:userId)',{
        replacements:{
            year:year,
            userId:user.id
        },
        type:sequelize.QueryTypes.SELECT
    })

    res.send(exp);
    
}



exports.categoryExpense = async (req, res) => {

    const user = req.user;

    let {year, month}=req.params
    

    


    const exp1 = await Expenses.findOne({
        attributes: [[sequelize.fn('sum', sequelize.col('Medical')), 'Medical'],
            [sequelize.fn('sum', sequelize.col('Medical')), 'Medical'],
            [sequelize.fn('sum', sequelize.col('Entertainment')), 'Entertainment'],
            [sequelize.fn('sum', sequelize.col('Bills')), 'Bills'],
            [sequelize.fn('sum', sequelize.col('Groceries')), 'Groceries'],
            [sequelize.fn('sum', sequelize.col('Investment')), 'Investment'],
            [sequelize.fn('sum', sequelize.col('Gifts')), 'Gifts'],
            [sequelize.fn('sum', sequelize.col('HugeExpense')), 'HugeExpense'],
            [sequelize.fn('sum', sequelize.col('Miscellaneous')), 'Miscellaneous']
        ],

        where: { userId: user.id }
    })
    let exp2=null;
    if(month&&year){
        exp2 = await sequelize.query('SELECT * from expenses where MONTH(date)=(:month) and YEAR(date)=(:year) and userId=(:userId)',{
            replacements:{
                year:year,
                userId:user.id,
                month:month
            },
            type:sequelize.QueryTypes.SELECT
        })
    }
    else{
        exp2 = await sequelize.query('SELECT * from expenses where YEAR(date)=(:year) and userId=(:userId)',{
            replacements:{
                year:year,
                userId:user.id
            },
            type:sequelize.QueryTypes.SELECT
        })
    
    }
   
    
    let Medical = 0, Entertainment = 0, Bills = 0, Groceries = 0, Investment = 0, Gifts = 0, HugeExpense = 0, Miscellaneous = 0
    if(exp2.length!=0){
    exp2.forEach(element => {
        Medical += element.Medical;
        Entertainment += element.Entertainment,
            Bills += element.Bills,
            Groceries += element.Groceries;
        Investment += element.Investment;
        Gifts += element.Gifts,
            HugeExpense += element.HugeExpense,
            Miscellaneous += element.Miscellaneous
    });
    }
    const Result = {
        Medical: Medical,
        Entertainment: Entertainment,
        Bills: Bills,
        Groceries: Groceries,
        Investment: Investment,
        Gifts: Gifts,
        HugeExpense: HugeExpense,
        Miscellaneous: Miscellaneous
    }

    const exp3=await sequelize.query(' SELECT sum(Medical) AS Medical, sum(Entertainment) AS Entertainment, sum(Bills) AS Bills, sum(Groceries) AS Groceries, sum(Investment) AS Investment, sum(Gifts) AS Gifts, sum(HugeExpense) AS HugeExpense, sum(Miscellaneous) AS Miscellaneous, sum(Total) AS Total, MONTH(date) AS MONTH FROM expenses WHERE YEAR(date)=(:year) AND userId=(:userId) GROUP BY MONTH(date) ORDER BY MONTH(date)',{
        replacements:{
            userId:user.id,
            year:currentYear
        },
        type:sequelize.QueryTypes.SELECT
    })

    
    
    let M=[],E=[],B=[],G=[],I=[],GI=[],H=[],MI=[], T=[],count=0
    
    for(let i=1;i<=12;i++){
       if(count>=exp3.length || exp3[count].MONTH!=i){
        M[i-1]=0
        E[i-1]=0
        B[i-1]=0
        G[i-1]=0
        I[i-1]=0
        GI[i-1]=0
        H[i-1]=0
        MI[i-1]=0
        T[i-1]=0
       }
       else{
        M[i-1]=exp3[count].Medical;
        E[i-1]=exp3[count].Entertainment
        B[i-1]=exp3[count].Bills
        G[i-1]=exp3[count].Groceries
        I[i-1]=exp3[count].Investment
        GI[i-1]=exp3[count].Gifts
        H[i-1]=exp3[count].HugeExpense
        MI[i-1]=exp3[count].Miscellaneous
        T[i-1]=exp3[count].Total
        count++
       }

       
    }

    let ans ={
        Medical:M,
        Entertainment:E,
        Bills:B,
        Groceries:G,
        Investment:I,
        Gifts:GI,
        HugeExpense:H,
        Miscellaneous:MI,
        Total:T
    }

    res.render("CombinedDashboard",{expense:exp1,expense1:Result,expense2:ans,userName:user.Name, newM:month, newY:year})

}


exports.edit = async (req, res)=>{
    let userId=req.user.id;
    let userDate = req.params.date;

   let expense=await Expenses.findOne({
        where:{
            userId:userId,
            date:userDate
        }
    })

    res.render('edit', {expense:expense, userName:req.user.Name})
}

exports.delete = async (req, res)=>{
    let userId=req.user.id;
    let userDate = req.body.date;

    await Expenses.destroy({
        where:{
            userId:userId,
            date:userDate
        }
    })
    res.redirect("/expenses/api/v1/getAllExpenses")
}

exports.insight = async (req, res)=>{

    const user=req.user

    const exp1=await sequelize.query(' SELECT sum(Medical) AS Medical, sum(Bills) AS Bills, sum(Groceries) AS Groceries, sum(HugeExpense) AS HugeExpense FROM expenses WHERE YEAR(date)=(:year) AND userId=(:userId)',{
        replacements:{
            userId:user.id,
            year:currentYear
        },
        type:sequelize.QueryTypes.SELECT
    })
    let A=exp1[0];
    let need  = Object.values(A).reduce((a, b) => a + b, 0)


    const exp2=await sequelize.query(' SELECT sum(Entertainment) AS Entertainment, sum(Gifts) AS Gifts, sum(Miscellaneous) AS Miscellaneous FROM expenses WHERE YEAR(date)=(:year) AND userId=(:userId)',{
        replacements:{
            userId:user.id,
            year:currentYear
        },
        type:sequelize.QueryTypes.SELECT
    })

    let B=exp2[0];
    let want = Object.values(B).reduce((a, b) => a + b, 0)
   

    const exp3=await sequelize.query(' SELECT sum(Investment) AS Investment FROM expenses WHERE YEAR(date)=(:year) AND userId=(:userId)',{
        replacements:{
            userId:user.id,
            year:currentYear
        },
        type:sequelize.QueryTypes.SELECT
    })
    
    let investment=exp3[0].Investment;

    const result={
        need:need,
        want:want,
        investment:investment
    }
    res.render("insight",{result:result,userName:user.Name})
}