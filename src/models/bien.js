import mongoose from "mongoose";

const schema = new mongoose.Schema({
  fullName: String,
  address: String,
  email: String,
  password: String
});

export default mongoose.models.Bien || mongoose.model('Bien', schema);