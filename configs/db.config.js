module.exports={
    HOST : "localhost",
    USER : "root",
    PASSWORD : "scott",
    DB : "expense_db",
    dialect : "mysql",
    pool : {
        max : 5,
        min : 0,
        acquire : 3000,
        idle : 10000
    }
}