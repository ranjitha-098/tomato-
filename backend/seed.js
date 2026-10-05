import mongoose from "mongoose"; import bcrypt from "bcryptjs"; import "dotenv/config";
import User from "./models/User.js";
await mongoose.connect(process.env.MONGO_URI);
const email = process.env.ADMIN_EMAIL;
if (!(await User.findOne({ email }))) {
  await User.create({ name: "Admin", email, password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10), role: "admin" });
  console.log("Admin created:", email);
} else console.log("Admin already exists");
process.exit(0);
