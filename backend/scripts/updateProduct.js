// backend/scripts/updateProduct.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const args = process.argv.slice(2);

// Parse CLI args
const idArg = args.find(a => a.startsWith("--id="));
const skuArg = args.find(a => a.startsWith("--sku="));
const nameArg = args.find(a => a.startsWith("--name="));
const priceArg = args.find(a => a.startsWith("--price="));
const activeArg = args.find(a => a.startsWith("--active="));

const identifier = idArg
  ? { _id: idArg.split("=")[1] }
  : skuArg
  ? { sku: skuArg.split("=")[1] }
  : null;

if (!identifier) {
  console.error("❌ Provide --id or --sku");
  process.exit(1);
}

// Build update object dynamically
const updates = {};

if (nameArg) updates.name = nameArg.split("=")[1];
if (priceArg) updates.price = Number(priceArg.split("=")[1]);
if (activeArg) updates.isActive = activeArg.split("=")[1] === "true";

const updateProduct = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const product = await Product.findOne(identifier);

    if (!product) {
      console.log("❌ Product not found");
      process.exit(1);
    }

    console.log("🔍 Current Product:");
    console.table([product.toObject()]);

    Object.assign(product, updates);

    await product.save();

    console.log("\n✅ Updated Product:");
    console.table([product.toObject()]);

    process.exit(0);
  } catch (err) {
    console.error("❌ Update failed:", err);
    process.exit(1);
  }
};

updateProduct();
