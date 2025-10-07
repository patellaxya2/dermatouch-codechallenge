// migrate.js
import { sequelize, User, Product } from "../models/index.js";

const runMigrations = async () => {
  try {
    console.log("🧱 Syncing database...");
    await sequelize.sync(); // drops & recreates tables

    console.log("✅ Database synced!");

    // --- Optional: seed mock data ---
    await Product.bulkCreate([
      {
        title: "Meditation Book",
        description: "A guide to mindfulness and spiritual calm.",
        price: 299,
        category: "spiritual",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Yoga Mat",
        description: "Comfortable and durable yoga mat.",
        price: 899,
        category: "fitness",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Children’s Storybook",
        description: "A fun and positive book for kids.",
        price: 199,
        category: "kids",
        image: "https://via.placeholder.com/150",
      },
    ]);

    console.log("🌱 Seed data added successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
};

runMigrations();
