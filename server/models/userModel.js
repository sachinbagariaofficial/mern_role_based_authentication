const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  role: { type: String,  enum: ['admin', 'manager', 'user'] ,default:"user"},
  department:{
    type:String , enum:["administrator", "finance" , "maintenance" ,"public" ] , default:"public"
  }
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

module.exports = User;
