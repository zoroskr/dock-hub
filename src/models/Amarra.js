import mongoose from "mongoose";

const amarraSchema = new mongoose.Schema({
  mooringNumber: Number,
  location: String,
  dailyRate: Number,
  image: String,
  isAvailable: Boolean,
  availabilityDates: [],
  boat: { type: mongoose.Schema.Types.ObjectId, ref: "Boat" },
  marina: { type: mongoose.Schema.Types.ObjectId, ref: "Marina" },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
});

export default mongoose.models.Amarra || mongoose.model("Amarra", amarraSchema);
