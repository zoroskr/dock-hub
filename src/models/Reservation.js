import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  location: String,
  dateLapse: {
    startDate: Date,
    endDate: Date,
  },
  cost: Number,
  image: String,
  owner: String,
});

export default mongoose.models.Reservation || mongoose.model("Reservation", schema);