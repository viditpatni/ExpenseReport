const json2xls=require("json2xls");

const fs=require("fs");

const express=require("express");

const app=express();

const { User, Expenses, Sequelize, sequelize } = require("../models");
const { DATEONLY, DATE } = require("sequelize");



exports.addOrUpdate = async (req, res) => {

    let { date, Medical, Entertainment, Bills, Groceries, Investment, Gifts, HugeExpense, Miscellaneous, Remarks, Source } = req.body;



    const expense = {
        date: date,
        Medical: Medical,
        Entertainment: Entertainment,
        Bills: Bills,
        Groceries: Groceries,
        Investment: Investment,
        Gifts: Gifts,
        HugeExpense: HugeExpense,
        Miscellaneous: Miscellaneous,
        Remarks: Remarks,
        Source: Source,
        userId: req.user.id,
        Total: Medical + Entertainment + Bills + Groceries + Investment + Gifts + HugeExpense + Miscellaneous
    }

        if(!date||date.length==0) date=new Date().toJSON().slice(0,10)

    console.log(typeof date);

    console.log(date)

    try {

        const exp = await Expenses.findAll({
            where: {
                date: expense.date,
                userId: expense.userId
            }
        })

        if (!exp || exp.length === 0) {
            await Expenses.create(expense);
            res.send("Expenses added successfully");
        }
        else {
            await Expenses.update(expense, {
                where: {
                    date: expense.date,
                    userId: expense.userId
                }
            })

            res.send("Expenses updated successfully")
        }
    }
    catch (err) {
        return res.status(500).send({ message: err.message || "Something went wrong" });
    }

}

exports.getUserExpense = async (req, res) => {

    const user = req.user;

    const userExp = await Expenses.findAll({
        order:[['date']],
        where:{
            userId:user.id
        }
    });

   let arr=[];

   for(let i=0;i<userExp.length;i++){
    arr.push(userExp[i].dataValues);
   }

   

    // let xls=json2xls(arr);


    // fs.writeFileSync('data.xlsx', xls, 'binary');

    if(arr.length===0) res.render("addExpense")

    else res.render("expenses", {arr:arr});
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

exports.getUserExpenseByCategory = async (req, res) => {

    const userId = req.user.id;

    const exp = await Expenses.findOne({
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

        where: { userId: userId }
    })
    res.send(exp)
}

exports.categoryExpenseByMonth = async (req, res) => {

    const user = req.user;

    let {year, month}=req.body

    const exp = await sequelize.query('SELECT * from expenses where MONTH(date)=(:month) and YEAR(date)=(:year) and userId=(:userId)',{
        replacements:{
            year:year,
            userId:user.id,
            month:month
        },
        type:sequelize.QueryTypes.SELECT
    })
    let Medical = 0, Entertainment = 0, Bills = 0, Groceries = 0, Investment = 0, Gifts = 0, HugeExpense = 0, Miscellaneous = 0

    exp.forEach(element => {
        Medical += element.Medical;
        Entertainment += element.Entertainment,
            Bills += element.Bills,
            Groceries += element.Groceries;
        Investment += element.Investment;
        Gifts += element.Gifts,
            HugeExpense += element.HugeExpense,
            Miscellaneous += element.Miscellaneous
    });

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

    res.send(Result);

}

exports.categoryExpenseByYear = async (req, res) => {

    const user = req.user;

    let year=req.body.year;

    const exp = await sequelize.query('SELECT * from expenses where YEAR(date)=(:year) and userId=(:userId)',{
        replacements:{
            year:year,
            userId:user.id
        },
        type:sequelize.QueryTypes.SELECT
    })

    let Medical = 0, Entertainment = 0, Bills = 0, Groceries = 0, Investment = 0, Gifts = 0, HugeExpense = 0, Miscellaneous = 0

    exp.forEach(element => {
        Medical += element.Medical;
        Entertainment += element.Entertainment,
            Bills += element.Bills,
            Groceries += element.Groceries;
        Investment += element.Investment;
        Gifts += element.Gifts,
            HugeExpense += element.HugeExpense,
            Miscellaneous += element.Miscellaneous
    });

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

    res.send(Result);

}


