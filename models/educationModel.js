const {DataTypes} = require("sequelize");
const {sequelize} = require("../dataBase/dbConfig")

const education = sequelize.define("Education", {
    
    Edu_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
   
    Institution_name:{
        type: DataTypes.STRING,
        allowNull: false
    },

    Degree:{
        type: DataTypes.STRING,
        allowNull: true
    },

    Field_of_study:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    Start_date:{
        type: DataTypes.DATE,
        allowNull: false
    },    
    
    End_date:{
        type: DataTypes.DATE,
        allowNull: false
    }
    
});

(async()=>{
    await sequelize.sync()
})()


module.exports = education;