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
  resident: Boolean, // Argentino residente o no
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  favorites: [String],
  chats: [String],
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
  boats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Boat" }],
  amarras: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amarra" }],
});

export default mongoose.models.User || mongoose.model('User', schema);