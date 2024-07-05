import mongoose from "mongoose";

const boatSchema = new mongoose.Schema({
  plate: String,
  name: String,
  type: String,
  length: Number,
  image: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Boat || mongoose.model("Boat", boatSchema);
