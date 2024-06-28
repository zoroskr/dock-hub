import mongoose from 'mongoose';

const amarraSchema = new mongoose.Schema({
  location: String,
  availability: {
    startDate: Date,
    endDate: Date,
  },
  dailyRate: Number,
  image: String,
  isAvailable: Boolean,
});

export default mongoose.models.Amarra || mongoose.model('Amarra', amarraSchema);