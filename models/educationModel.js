import DataTypes from "sequelize";
import  sequelize  from "../dataBase/dbConfig.js";

const education = sequelize.define("Education", {
    
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
   
    js_id: {
        type: DataTypes.UUID,
        references: {
            model: "jobSeekers",
            key: "id"
        }
    },
    
    institution_name:{
        type: DataTypes.STRING,
        allowNull: false
    },

    certification:{
        type: DataTypes.STRING,
        allowNull: true
    },

    field_of_study:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    start_date:{
        type: DataTypes.DATE,
        allowNull: false
    },    
    
    end_date:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{
       timestamps: false
   });

(async()=>{
    await sequelize.sync()
})()

export default  education;