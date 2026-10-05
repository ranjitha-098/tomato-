import express from "express"; import cors from "cors"; import mongoose from "mongoose"; import "dotenv/config";
import authRoutes from "./routes/auth.js"; import foodRoutes from "./routes/food.js"; import orderRoutes from "./routes/order.js";
const app = express();
app.use(express.json()); app.use(cors());
app.use("/images", express.static("uploads"));
app.use("/api/auth", authRoutes); app.use("/api/food", foodRoutes); app.use("/api/order", orderRoutes);
app.get("/", (_, res) => res.send("API running"));
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 4000, () => console.log("Server on port " + (process.env.PORT || 4000)));
}).catch(e => { console.error(e.message); process.exit(1); });
