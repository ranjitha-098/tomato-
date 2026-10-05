import mongoose from "mongoose";
export default mongoose.model("Order", new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ foodId: String, name: String, price: Number, quantity: Number }],
  amount: Number, address: Object, paymentMethod: { type: String, default: "Cash on Delivery" },
  status: { type: String, enum: ["Food Processing", "Out for delivery", "Delivered", "Cancelled"], default: "Food Processing" }
}, { timestamps: true }));
