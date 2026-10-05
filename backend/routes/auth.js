import { Router } from "express"; import bcrypt from "bcryptjs"; import jwt from "jsonwebtoken"; import User from "../models/User.js";
const r = Router();
const sign = u => jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
const pack = u => ({ success: true, token: sign(u), user: { name: u.name, email: u.email, role: u.role } });
r.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8)
      return res.json({ success: false, message: "Enter name, email and a password of 8+ characters" });
    if (await User.findOne({ email })) return res.json({ success: false, message: "Email already registered" });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
    res.json(pack(user));
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
r.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res.json({ success: false, message: "Wrong email or password" });
    res.json(pack(user));
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
export default r;
