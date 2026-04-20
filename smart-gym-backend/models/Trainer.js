const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  customRequests: { type: Map, of: String }
});

const TrainerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true }, 
  specialization: { type: String, default: 'Weightlifting' },
  experience: { type: Number, default: 1 },
  isAvailable: { type: Boolean, default: true },
  weeklySchedule: { type: Map, of: String },
  

  image: { type: String },
  profilePicture: { data: String, contentType: String }, 
  
  reservations: [ReservationSchema] 
});

module.exports = mongoose.model('Trainer', TrainerSchema);