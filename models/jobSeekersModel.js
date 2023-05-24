const {DataTypes} = require("sequelize");
const {sequelize} = require("../dataBase/dbConfig")

const jobSeeker = sequelize.define("jobseekers", {
    
    jobSeekerId:{
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
    
    dateOfBirth:{
        type: DataTypes.DATE,
        allowNull: false
    },    
    
    gender:{
        type: DataTypes.STRING,
        allowNull: false
    },    
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true, // to ensure that the email provided is in a valid email format
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull: true
    }
    
});

(async()=>{
    await sequelize.sync()
})()


module.exports = jobSeeker;