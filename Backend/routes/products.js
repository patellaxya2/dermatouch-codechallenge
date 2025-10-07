// routes/products.js
import express from "express";
import { Product } from "../models/index.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Get all products or filter by category/search
router.get("/", async (req, res, next) => {
  try {
    const { category, search } = req.query;

    let where = {};

    if (category) {
      where.category = category;
    }

    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    const products = await Product.findAll({ where });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Optional: get a single product
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/add",
  [
    body("title").notEmpty().withMessage("Title is required!"),
    body("price").isNumeric().withMessage("Price must be a number!"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, price, description, category, image } = req.body;
      const product = await Product.create({
        title,
        description,
        price,
        category,
        image,
      });
      res.status(201).json({ message: "Product created", product });
    } catch (error) {
      next(error);
    }
  }
);

//update product
router.put("/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, price, description, category, image } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.update({
      title,
      price,
      description,
      category,
      image,
    });

    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    next(err);
  }
});

//delete product
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
});
export default router;
