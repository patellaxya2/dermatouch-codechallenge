// routes/orders.js
import express from "express";
import { Order, Product, User } from "../models/index.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get all orders for the logged-in user
router.get("/", auth, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { UserId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// Place an order
router.post("/", auth, async (req, res, next) => {
  try {
    const { items, total } = req.body;

    if (!items || !items.length)
      return res.status(400).json({ error: "No items in order" });

    const order = await Order.create({
      UserId: req.user.id,
      items,
      total,
      status: "placed",
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

export default router;
