import mongoose from "mongoose";
export default mongoose.model("Food", new mongoose.Schema({
  name: { type: String, required: true }, description: { type: String, required: true },
  price: { type: Number, required: true }, category: { type: String, required: true }, image: { type: String, required: true }
}, { timestamps: true }));
