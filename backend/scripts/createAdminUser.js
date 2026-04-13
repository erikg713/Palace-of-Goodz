// backend/scripts/createAdminUser.js

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Import your User model
const User = require("../models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@palaceofgoodz.com";
    const password = "StrongPassword123!";

    // Check if admin already exists
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = new User({
      email,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    await adminUser.save();

    console.log("✅ Admin user created successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
