const {DataTypes} = require("sequelize");
const {sequelize} = require("../dataBase/dbConfig")

const jobSeekersModel = sequelize.define("jobseeker", {
    
    Job_seeker_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    
    date_of_birth:{
        type: DataTypes.DATE,
        allowNull: false
    },    
    gender:{
        type: DataTypes.STRING,
        allowNull: false
    },    
    email_address:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true, // to ensure that the email provided is in a valid email format
        }
    },
    
    phone_number:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    social_media_links:{
        type: DataTypes.STRING,
        allowNull: true
    },

    profile_photo:{
        type: DataTypes.STRING, // the file path of the image
        allowNull: true
    },
    
    cv:{
        type: DataTypes.STRING,
        allowNull: true
    }
    
});

(async()=>{
    await sequelize.sync()
})()


module.exports = jobSeekersModel;