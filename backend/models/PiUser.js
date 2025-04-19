const mongoose = require('mongoose');

const PiUserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  username: String,
  roles: [String],
}, { timestamps: true });

module.exports = mongoose.model('PiUser', PiUserSchema);
