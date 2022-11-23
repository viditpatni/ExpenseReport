const expenseController=require("../Controllers/expense.controller");
const {authJWT}=require("../MiddleWares")

module.exports=(app)=>{

    app.get("/expenses/api/v1/addExpense", (req, res)=>{
        res.render("addExpense")
    })
 
    app.post("/expenses/api/v1/addExpense",authJWT.verifyToken, expenseController.addOrUpdate);

    app.get("/expenses/api/v1/getAllExpenses",authJWT.verifyToken,expenseController.getUserExpense);
    
    app.get("/expenses/api/v1/getExpenseMonth", authJWT.verifyToken,expenseController.getUserExpenseByMonth);

    app.get("/expenses/api/v1/getExpenseYear", authJWT.verifyToken,expenseController.getUserExpenseByYear);

    app.get("/expenses/api/v1/getCategoryExpense", authJWT.verifyToken,expenseController.getUserExpenseByCategory)

    app.get("/expenses/api/v1/getCategoryExpenseMonth", authJWT.verifyToken,expenseController.categoryExpenseByMonth)

    app.get("/expenses/api/v1/getCategoryExpenseYear", authJWT.verifyToken,expenseController.categoryExpenseByYear)

    

}