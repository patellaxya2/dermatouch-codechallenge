import { Sequelize, DataTypes, Op } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
});

export const User = sequelize.define("User", {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  name: DataTypes.STRING,
});

export const Product = sequelize.define("Product", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.INTEGER,
  category: DataTypes.STRING,
  image: DataTypes.STRING,
});

export const Order = sequelize.define("Order", {
  items: DataTypes.JSON,
  total: DataTypes.INTEGER,
  status: { type: DataTypes.STRING, defaultValue: "pending" },
  razorpayOrderId: DataTypes.STRING,
  razorpayPaymentId: DataTypes.STRING,
});

User.hasMany(Order);
Order.belongsTo(User);

export { Op };
