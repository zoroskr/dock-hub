import mongoose from "mongoose";

const marinaSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
});

export default mongoose.models.Marina || mongoose.model('Marina', marinaSchema);