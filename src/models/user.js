import mongoose from "mongoose";

const schema = new mongoose.Schema({
  fullName: String,
  DNI: Number,
  address: String,
  email: String,
  password: String,
  age: Number,
  type: String, // "Titular", "Regular", "Admin"
  verified: Boolean,
  confirmationToken: String,
  favorites: [String],
  chats: [String],
});

export default mongoose.models.User || mongoose.model('User', schema);