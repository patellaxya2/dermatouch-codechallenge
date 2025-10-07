import { sequelize, Product, User } from "../models/index.js";
import bcrypt from "bcrypt";
(async () => {
  await sequelize.sync({ force: true });
  await Product.bulkCreate([
    {
      title: "Spiritual Book A",
      description: "...",
      price: 19900,
      category: "spiritual",
      image: "",
    },
    {
      title: "Yoga Mat",
      description: "...",
      price: 4999,
      category: "fitness",
      image: "",
    },
    {
      title: "Guided Meditation",
      description: "...",
      price: 2999,
      category: "spiritual",
      image: "",
    },
  ]);

  const passwordHash = await bcrypt.hash("password", 10);
  await User.create({
    email: "test@example.com",
    passwordHash,
    name: "Test User",
  });
  console.log("Seeded");
  process.exit(0);
})();
