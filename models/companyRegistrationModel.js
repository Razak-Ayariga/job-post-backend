import DataTypes from "sequelize";
import sequelize  from "../dataBase/dbConfig.js";

const companyRegistration = sequelize.define("company_registration", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    },
    company_id: {
      type: DataTypes.UUID,
      references: {
        model: "companies",
        key: "id",
      },
    },
  
  registration_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vat_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_certificate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  paranoid: true
});

(async () => {
  await sequelize.sync();
})();

export default companyRegistration;