import { Router } from "express"; import Order from "../models/Order.js"; import Food from "../models/Food.js"; import { auth, adminOnly } from "../middleware/auth.js";
const r = Router();
const DELIVERY_FEE = 2;
r.post("/place", auth, async (req, res) => {
  try {
    const { items, address } = req.body;
    if (!items?.length) return res.json({ success: false, message: "Your cart is empty" });
    const foods = await Food.find({ _id: { $in: items.map(i => i.foodId) } });
    const lines = items.map(i => {
      const f = foods.find(x => String(x._id) === i.foodId);
      return f && { foodId: i.foodId, name: f.name, price: f.price, quantity: Math.max(1, Number(i.quantity)) };
    }).filter(Boolean);
    const amount = lines.reduce((s, l) => s + l.price * l.quantity, 0) + DELIVERY_FEE; // price comes from DB, not client
    await Order.create({ userId: req.user._id, items: lines, amount, address });
    res.json({ success: true, message: "Order placed. Pay on delivery." });
  } catch (e) { res.json({ success: false, message: e.message }); }
});
r.get("/mine", auth, async (req, res) => res.json({ success: true, data: await Order.find({ userId: req.user._id }).sort({ createdAt: -1 }) }));
r.get("/all", auth, adminOnly, async (_, res) => res.json({ success: true, data: await Order.find().sort({ createdAt: -1 }) }));
r.post("/status", auth, adminOnly, async (req, res) => {
  await Order.findByIdAndUpdate(req.body.id, { status: req.body.status });
  res.json({ success: true });
});
export default r;
