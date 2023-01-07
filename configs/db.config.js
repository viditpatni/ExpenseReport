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
        HOST : "sql6.freemysqlhosting.net",
        USER : "sql6588868",
        PASSWORD : "fZmtbqtXXg",
        DB : "sql6588868",
        dialect : "mysql",
        pool : {
            max : 5,
            min : 0,
            acquire : 3000,
            idle : 10000
        }   
}
}
