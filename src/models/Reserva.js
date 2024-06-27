import moongose from 'mongoose';

const reservaSchema = new moongose.Schema({
  location: String,
  dateLapse: {
    startDate: Date,
    endDate: Date,
  },
  cost: Number,
  image: String,
  owner: String,
});

export default moongose.models.Reserva || moongose.model('Reserva', reservaSchema);