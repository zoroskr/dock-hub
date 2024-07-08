import mongoose from "mongoose";

const boatSchema = new mongoose.Schema({
  plate: String,
  name: String,
  type: String,
  description: String,
  image: String,
  adapted: Boolean,
  latitud: Number,
  longitud: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Boat || mongoose.model("Boat", boatSchema);
