import mongoose from "mongoose";

const dateLapseSchema = new mongoose.Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { _id: false }
);

const amarraSchema = new mongoose.Schema({
  mooringNumber: Number,
  location: String,
  dailyRate: Number,
  image: String,
  isAvailable: Boolean,
  lat: Number,
  long: Number,
  availabilityDates: [dateLapseSchema],
  boat: { type: mongoose.Schema.Types.ObjectId, ref: "Boat" },
  marina: { type: mongoose.Schema.Types.ObjectId, ref: "Marina" },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
});

export default mongoose.models.Amarra || mongoose.model("Amarra", amarraSchema);
