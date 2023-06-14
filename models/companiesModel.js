const {DataTypes} = require("sequelize");
const {sequelize} =require("../dataBase/dbConfig");


const companies = sequelize.define("Companies", {
  companyId:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  companyName:{
    type: DataTypes.STRING,
    allowNull: false
  },
  companyEmail:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      isEmail: true
    }
  },

  password:{
    type: DataTypes.STRING,
    allowNull: false
  },
  companyPhoneNumber:{
    type: DataTypes.STRING,
    allowNull: true
  }
});

(async()=>{
  await sequelize.sync();
})(); // an asynchronous method provided by Sequelize, synchronizes the defined models with the database. It creates the table if it doesn't exist.


module.exports = companies;
