module.exports=(Sequelize, sequelize)=>{

    const Expenses=sequelize.define("expenses",{
       date:{
            type:Sequelize.DATEONLY,
            defaultValue:Sequelize.NOW
       },

        Medical:{
            type:Sequelize.DOUBLE,
            defaultValue:0
        },

        Entertainment:{
            type:Sequelize.DOUBLE,
            defaultValue:0
        },

        Bills:{
            type:Sequelize.DOUBLE,
            defaultValue:0
        },

        Groceries:{
            type:Sequelize.DOUBLE,
            defaultValue:0
        },
        
        Investment: {
            type:Sequelize.DOUBLE,
            defaultValue:0
        },

        Gifts: {
            type:Sequelize.DOUBLE,
            defaultValue:0
        },

        HugeExpense:{
            type:Sequelize.DOUBLE,
            defaultValue:0
        },

        Miscellaneous:{
            type:Sequelize.DOUBLE,
            defaultValue:0
        },

        Total:{
            type:Sequelize.DOUBLE,
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