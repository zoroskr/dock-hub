import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  amarra: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Amarra",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateLapse: {
    startDate: Date,
    endDate: Date,
  },
});

export default mongoose.models.Reservation || mongoose.model("Reservation", schema);