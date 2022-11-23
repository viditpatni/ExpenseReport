module.exports={
    development:{
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
},

    production:{
        HOST : "sql12.freemysqlhosting.net",
        USER : "sql12580040",
        PASSWORD : "RJMs45GaZj",
        DB : "sql12580040",
        dialect : "mysql",
        pool : {
            max : 5,
            min : 0,
            acquire : 3000,
            idle : 10000
        }   
}
}
