import {DataTypes} from "sequelize";
import {sequelize} from "../dataBase/dbConfig.js";


const admin = sequelize.define("Administrator", {
    adminId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },

    middleName:{
        type: DataTypes.STRING,
        allowNull: true
    },

    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },

    gender:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    companyEmail:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true,
        }
    },
    
    role:{
        type: DataTypes.STRING,
        allowNull: false
    },

    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

(async()=>{
   await sequelize.sync()
})(); // an asynchronous method provided by Sequelize, synchronizes the defined models with the database. It creates the table if it doesn't exist.


export default admin