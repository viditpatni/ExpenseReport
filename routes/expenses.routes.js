const expenseController=require("../Controllers/expense.controller");
const {authJWT}=require("../MiddleWares")

module.exports=(app)=>{

    app.get("/expenses/api/v1/addExpense", authJWT.verifyToken, (req, res)=>{
        res.render("addExpense",{userName:req.user.Name})
    })

    app.get("/expenses/api/v1/edit/:date", authJWT.verifyToken, expenseController.edit);
 
    app.post("/expenses/api/v1/addExpense",authJWT.verifyToken, expenseController.addOrUpdate);

    app.get("/expenses/api/v1/getAllExpenses",authJWT.verifyToken,expenseController.getUserExpense);
    
    app.get("/expenses/api/v1/getExpenseMonth", authJWT.verifyToken,expenseController.getUserExpenseByMonth);

    app.get("/expenses/api/v1/getExpenseYear", authJWT.verifyToken,expenseController.getUserExpenseByYear);

    app.get("/expenses/api/v1/getCategoryExpense/:month/:year", authJWT.verifyToken,expenseController.categoryExpense)

    app.get("/expenses/api/v1/getCategoryExpense/:year", authJWT.verifyToken,expenseController.categoryExpense)

    app.post("/expenses/api/v1/delete/", authJWT.verifyToken, expenseController.delete)
    
    app.get("/expenses/api/v1/getInsight", authJWT.verifyToken, expenseController.insight);

}