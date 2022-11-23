module.exports=(Sequelize, sequelize)=>{

    const User=sequelize.define("users",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        Name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false
        },
    
        password:{
            type:Sequelize.STRING,
            allowNull:false
        },
        confirmed:{
            type:Sequelize.BOOLEAN,
            defaultValue:false
        }
        
    });
        return User;
    }