import { Router } from "express"; import multer from "multer"; import fs from "fs"; import Food from "../models/Food.js"; import { auth, adminOnly } from "../middleware/auth.js";
const r = Router();
const upload = multer({ storage: multer.diskStorage({ destination: "uploads", filename: (_, f, cb) => cb(null, Date.now() + "-" + f.originalname.replace(/\s+/g, "_")) }) });
r.get("/list", async (_, res) => res.json({ success: true, data: await Food.find().sort({ createdAt: -1 }) }));
r.post("/add", auth, adminOnly, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.json({ success: false, message: "Please add an image" });
    const { name, description, price, category } = req.body;
    await Food.create({ name, description, price: Number(price), category, image: req.file.filename });
    res.json({ success: true, message: "Food added" });
  } catch (e) { res.json({ success: false, message: e.message }); }
});
r.post("/remove", auth, adminOnly, async (req, res) => {
  const food = await Food.findByIdAndDelete(req.body.id);
  if (food) fs.unlink(`uploads/${food.image}`, () => {});
  res.json({ success: true, message: "Food removed" });
});
export default r;
