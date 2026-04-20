const mongoose = require('mongoose');

const WorkoutLogSchema = new mongoose.Schema({
  activityType: { type: String, required: true },
  details: {
    note: String,
    intensity: String,
    recordedAt: { type: Date, default: Date.now }
  }
});

const MemberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Active', 'Pending', 'Expired'], 
    default: 'Active' 
  },
  
  profilePicture: { 
    data: String,       
    contentType: String 
  },
  
  workoutLogs: [WorkoutLogSchema],
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', MemberSchema);