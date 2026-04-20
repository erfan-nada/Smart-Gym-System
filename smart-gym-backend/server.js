require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const memberRoutes = require('./routes/memberRoutes');
const reservationRoutes = require('./routes/reservationRoutes'); 

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));


app.use('/api/members', memberRoutes); 
app.use('/api/reservations', reservationRoutes); 

app.get('/', (req, res) => {
  res.send('Smart Gym API is Running!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});