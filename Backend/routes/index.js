import express from "express";
import authRoutes from "./auth.js";
import productRoutes from "./products.js";
import orderRoutes from "./orders.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

export default router;
