module.exports=(Sequelize, sequelize)=>{

    const Expenses=sequelize.define("expenses",{
       date:{
            type:Sequelize.DATEONLY,
            defaultValue:Sequelize.NOW
       },

        Medical:{
            type:Sequelize.INTEGER,
            defaultValue:0
        },

        Entertainment:{
            type:Sequelize.INTEGER,
            defaultValue:0
        },

        Bills:{
            type:Sequelize.INTEGER,
            defaultValue:0
        },

        Groceries:{
            type:Sequelize.INTEGER,
            defaultValue:0
        },
        
        Investment: {
            type:Sequelize.INTEGER,
            defaultValue:0
        },

        Gifts: {
            type:Sequelize.INTEGER,
            defaultValue:0
        },

        HugeExpense:{
            type:Sequelize.INTEGER,
            defaultValue:0
        },

        Miscellaneous:{
            type:Sequelize.INTEGER,
            defaultValue:0
        },

        Total:{
            type:Sequelize.INTEGER,
            defaultValue:0
        },

        Remarks:{
            type:Sequelize.STRING,
            allowNull:false
        },

        Source:{
            type:Sequelize.STRING,
            allowNull:false
        },

        userId:{
            type:Sequelize.INTEGER
        }

    },{
        createdAt:false,
        updatedAt:false
    });
    Expenses.removeAttribute('id');
    return Expenses;
}