const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_number: { 
    type: String, 
    required: true,
    match: [/^\+[1-9]\d{1,14}$/, 'Please fill a valid phone number in E.164 format'] 
  },
  priority: {
    type: Number,
    required: true,
    enum: [0, 1, 2],
    default: 2,
  },
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
