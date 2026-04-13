// backend/scripts/showProducts.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const showProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const products = await Product.find()
      .limit(20)
      .lean(); // performance optimization

    if (!products.length) {
      console.log("No products found.");
      process.exit(0);
    }

    console.log(`\n📦 Found ${products.length} products:\n`);

    console.table(
      products.map((p) => ({
        Name: p.name,
        Price: `$${p.price}`,
        SKU: p.sku || "N/A",
        Active: p.isActive,
        Created: p.createdAt,
      }))
    );

    process.exit(0);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    process.exit(1);
  }
};

showProducts();
