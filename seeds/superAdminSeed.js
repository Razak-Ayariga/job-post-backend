import bcrypt from "bcrypt";
import superAdmin from "../models/superAdminModel.js";

const adminCredentials = {
    fullName: "Samuel Asante",
    email: "sasante@maximnyansa.com",
    password: "@Jobpost.SuperAdmin"
}

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

const seedAdmin = async () => {
    try {
        await superAdmin.sync();

        const { fullName, email, password } = adminCredentials;

        const existingAdmin = await superAdmin.findOne({ where: { email } });
        if (existingAdmin) {
            console.log(`${fullName} is already seeded`);
            return;
        }

        const hashedPassword = await hashPassword(password);

        await superAdmin.create({
            ...adminCredentials,
            password: hashedPassword,
        });

        console.log(`Admin ${fullName} seeded successfully`);
    } catch (error) {
        console.error("Failed to seed admin:", error);
    }
};

export default seedAdmin;
