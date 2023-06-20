import bcrypt from "bcrypt";
import superAdmin from "../models/superAdminModel.js";

const adminCredentials = [
  {
    fullName: "Stanley Dankyira",
    email: "sdankyira@maximnyansa.com",
    password: "@Jobpost.SuperAdmin"
  },
  {
    fullName: "Samuel Asante",
    email: "sasante@maximnyansa.com",
    password: "@Jobpost.SuperAdmin"
  },
  {
    fullName: "Akosua Donkor",
    email: "akosua@maximnyansa.com",
    password: "@Jobpost.SuperAdmin"
  }
];

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const seedAdmin = async () => {
  try {
    await superAdmin.sync();

    for (const credentials of adminCredentials) {
      const { fullName, email, password } = credentials;

      const existingAdmin = await superAdmin.findOne({ where: { email } });
      if (existingAdmin) {
        // console.log(`${fullName} is already seeded`);
        continue;
      }

      const hashedPassword = await hashPassword(password);

      await superAdmin.create({
        ...credentials,
        password: hashedPassword
      });

      // console.log(`${fullName} seeded successfully`);
    }
  } catch (error) {
    console.error("Failed to seed admin:", error);
  }
};

export default seedAdmin;
