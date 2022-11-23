const env=process.env.NODE_ENV||'development';
const config=require("../configs/db.config")[env];
const Sequelize = require("sequelize");

const sequelize=new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host : config.HOST,
        dialect : config.dialect,
        operatorAliases : false,
        pool : {
            max : config.pool.max,
            min : config.pool.min,
            acquire : config.pool.acquire,
            idle : config.pool.idle
        }
    }
);

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.User=require("./user.model")(Sequelize, sequelize);
db.Expenses=require("./expenses.model")(Sequelize,sequelize);

db.User.hasMany(db.Expenses,{
    foreignKey:"userId"
});
db.Expenses.belongsTo(db.User);

module.exports=db;