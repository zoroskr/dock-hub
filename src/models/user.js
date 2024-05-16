import mongoose from "mongoose";

const schema = new mongoose.Schema({
  fullName: String,
  address: String,
  email: String,
  password: String,
  type: String,
  verified: Boolean,
});

export default mongoose.models.User || mongoose.model('User', schema);