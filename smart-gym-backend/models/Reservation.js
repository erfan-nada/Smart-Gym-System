const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({

  trainerName: { type: String, required: true }, 
  
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  date: { type: String, required: true }, 
  timeSlot: { type: String, required: true },

  customRequests: { 
    type: Map, 
    of: String 
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', ReservationSchema);