import jwt from "jsonwebtoken"; import User from "../models/User.js";
export const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "Please log in" });
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(id);
    if (!req.user) throw new Error();
    next();
  } catch { res.status(401).json({ success: false, message: "Invalid or expired session" }); }
};
export const adminOnly = (req, res, next) =>
  req.user?.role === "admin" ? next() : res.status(403).json({ success: false, message: "Admins only" });
