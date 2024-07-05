import mongoose from "mongoose";

const amarraSchema = new mongoose.Schema({
  location: String,
  availabilityDates: [],
  dailyRate: Number,
  image: String,
  isAvailable: Boolean,
  boat: { type: mongoose.Schema.Types.ObjectId, ref: "Boat" },
  marina: { type: mongoose.Schema.Types.ObjectId, ref: "Marina" },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
});

export default mongoose.models.Amarra || mongoose.model("Amarra", amarraSchema);
