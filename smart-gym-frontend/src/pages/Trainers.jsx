import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Phone, Mail, Award, Zap, Clock, Star, 
  Calendar, CheckCircle, X 
} from 'lucide-react';

export default function Trainers() {
  const navLinks = ['Home', 'About', 'Classes', 'Trainers', 'Contact'];
  const [search, setSearch] = useState('');

  // --- RESERVATION STATE ---
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showReserveModal, setShowReserveModal] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    clientName: '',
    clientEmail: '',
    date: '',
    timeSlot: '',
    focusArea: '', 
    medicalNotes: ''
  });

  // --- STATIC DATA (6 Trainers) ---
  const trainers = [
    {
      id: 1, image: '/T1.jpg', name: 'Alex "The Titan" Mercer', age: 29, specialty: 'Bodybuilding & Hypertrophy', experience: '8 Years', bio: 'Former regional bodybuilding champion focused on extreme muscle growth.', schedule: 'Mon - Fri: 6AM - 2PM', rating: 5.0
    },
    {
      id: 2, image: '/T2.jpg', name: 'David "Viper" Jenkins', age: 26, specialty: 'HIIT & Crossfit', experience: '5 Years', bio: 'Certified Crossfit L3 coach. Specializes in high-intensity conditioning.', schedule: 'Tue - Sat: 10AM - 6PM', rating: 4.9
    },
    {
      id: 3, image: '/T3.jpg', name: 'Marcus "Zen" Silva', age: 34, specialty: 'Mobility & Rehab', experience: '12 Years', bio: 'Expert in injury recovery and joint mobility.', schedule: 'Mon, Wed, Fri: 1PM - 9PM', rating: 4.8
    },
    {
      id: 4, image: '/T4.jpg', name: 'Leo "Iron" Carter', age: 31, specialty: 'Powerlifting', experience: '9 Years', bio: 'State record holder in deadlift. Focuses on raw strength.', schedule: 'Mon - Thu: 4PM - 10PM', rating: 4.9
    },
    {
      id: 5, image: '/T5.jpg', name: 'James "The Jet" Mitchell', age: 27, specialty: 'Athletic Conditioning', experience: '6 Years', bio: 'Specializes in speed, agility, and sports-specific conditioning.', schedule: 'Tue - Sun: 8AM - 4PM', rating: 4.7
    },
    {
      id: 6, image: '/T6.jpg', name: 'Ryan "Pulse" O\'Connor', age: 25, specialty: 'Endurance & Cardio', experience: '4 Years', bio: 'Marathon runner and triathlon coach. Expert in cardiovascular health.', schedule: 'Mon, Wed, Sat: 6AM - 12PM', rating: 4.8
    }
  ];

  const filteredTrainers = trainers.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  // --- HANDLERS ---
  const handleCardClick = (trainer) => {
    setSelectedTrainer(trainer);
    setShowReserveModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the payload for the NEW Reservations Collection
    const payload = {
      trainerName: selectedTrainer.name, // We send the static name
      clientName: bookingData.clientName,
      clientEmail: bookingData.clientEmail,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      customRequests: {
        "Focus Area": bookingData.focusArea,
        "Medical Notes": bookingData.medicalNotes
      }
    };

    try {
      // POST to the new Reservations route
      await axios.post('http://localhost:5000/api/reservations', payload);
      
      alert(`✅ Booking Confirmed!\n\nTrainer: ${selectedTrainer.name}\nDate: ${bookingData.date}`);
      setShowReserveModal(false);
      setBookingData({ clientName: '', clientEmail: '', date: '', timeSlot: '', focusArea: '', medicalNotes: '' });
    } catch (error) {
      console.error(error);
      alert("Booking Failed. Check console for details.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: "url('/trainers.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', zIndex: -2 }} />

      <nav style={{ position: 'absolute', top: 0, left: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20, backdropBlur: '10px', boxSizing: 'border-box' }}>
        <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>SMART GYM</div>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', margin: 0, padding: 0 }}>
          {navLinks.map((link) => (
            <li key={link}><a href={link === 'Trainers' ? '/trainers' : `/#${link.toLowerCase()}`} style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>{link}</a></li>
          ))}
          <li><a href="/members" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}>Members Area</a></li>
        </ul>
      </nav>

      <div style={{ position: 'relative', zIndex: 10, padding: '120px 5% 50px 5%', maxWidth: '1600px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
           <h1 style={{ color: 'white', fontFamily: '"bbh bogle", sans-serif', fontSize: '4.5rem', margin: '0 auto', textTransform: 'uppercase', letterSpacing: '5px', display: 'inline-block', backgroundColor: 'rgba(200, 200, 200, 0.1)', padding: '15px 30px', borderRadius: '20px', backdropBlur: '5px' }}>
             THE <span style={{ color: '#4ade80' }}>ELITE TEAM</span>
           </h1>
           <p style={{ color: '#ccc', fontSize: '1.2rem', marginTop: '20px', textShadow: '1px 1px 5px rgba(0,0,0,1)' }}>Select a trainer to book a session.</p>
           
           <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <div style={{ position: 'relative', width: '350px' }}>
                 <Search size={20} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                 <input type="text" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', padding: '12px 12px 12px 50px', borderRadius: '50px', border: '1px solid #444', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', outline: 'none', fontSize: '1rem', backdropBlur: '5px' }} />
              </div>
           </div>
        </div>

        {/* --- CARDS GRID --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', justifyContent: 'center' }}>
          {filteredTrainers.map((trainer) => (
            <motion.div 
              key={trainer.id}
              onClick={() => handleCardClick(trainer)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, borderColor: '#4ade80' }} 
              style={{ height: '550px', backgroundColor: '#111', borderRadius: '20px', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', cursor: 'pointer', border: '1px solid #333', transition: 'border-color 0.3s' }}
            >
              <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                 <img src={trainer.image} alt={trainer.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%) contrast(1.1)' }} />
                 <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80%', background: 'linear-gradient(to top, #000 10%, transparent)' }} />
              </div>

              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '25px', boxSizing: 'border-box', zIndex: 2 }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '5px' }}>
                    <h2 style={{ color: 'white', margin: 0, fontSize: '1.8rem', fontFamily: '"bbh bogle", sans-serif', textTransform: 'uppercase', lineHeight: '1' }}>
                      {trainer.name.split('"')[0]} <br/> <span style={{color:'#4ade80'}}>{trainer.name.match(/"(.*?)"/)?.[0]}</span> {trainer.name.split('"')[2]}
                    </h2>
                    <span style={{ backgroundColor: '#4ade80', color: 'black', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap', height: 'fit-content' }}>
                       AGE {trainer.age}
                    </span>
                 </div>

                 <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '15px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', margin:0 }}>
                        {trainer.specialty}
                    </p>
                    <div style={{fontSize:'0.7rem', color:'#4ade80', border:'1px solid #4ade80', padding:'2px 6px', borderRadius:'4px'}}>BOOK</div>
                 </div>

                 <motion.div initial={{ height: 0, opacity: 0 }} whileHover={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                    <div style={{ borderTop: '1px solid #333', paddingTop: '15px', marginTop:'10px' }}>
                       <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.5', margin: '0 0 15px 0' }}>"{trainer.bio}"</p>
                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#888', marginBottom: '5px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Award size={16} color="#4ade80"/> Experience</div>
                          <div style={{ color: 'white' }}>{trainer.experience}</div>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#888', marginBottom: '5px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={16} color="#4ade80"/> Schedule</div>
                          <div style={{ color: 'white' }}>{trainer.schedule}</div>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#888' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Star size={16} color="#4ade80"/> Rating</div>
                          <div style={{ color: 'white' }}>{trainer.rating} / 5.0</div>
                       </div>
                    </div>
                 </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- RESERVATION MODAL --- */}
      {showReserveModal && selectedTrainer && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.85)', backdropBlur: '5px' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ backgroundColor: '#111', width: '90%', maxWidth: '500px', borderRadius: '20px', border: '1px solid #333', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.7)' }}>
            
            <div style={{ padding: '20px 30px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
              <div>
                <h3 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>Book Session</h3>
                <p style={{ color: '#4ade80', margin: 0, fontSize: '0.9rem' }}>with {selectedTrainer.name}</p>
              </div>
              <button onClick={() => setShowReserveModal(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><X size={24}/></button>
            </div>

            <div style={{ padding: '30px' }}>
               <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <input required placeholder="Your Name" value={bookingData.clientName} onChange={e => setBookingData({...bookingData, clientName: e.target.value})} style={modalInput} />
                  <input required type="email" placeholder="Your Email" value={bookingData.clientEmail} onChange={e => setBookingData({...bookingData, clientEmail: e.target.value})} style={modalInput} />
                  <div style={{ display: 'flex', gap: '15px' }}>
                     <input required type="date" value={bookingData.date} onChange={e => setBookingData({...bookingData, date: e.target.value})} style={{ ...modalInput, flex: 1, colorScheme: 'dark' }} />
                     <select required value={bookingData.timeSlot} onChange={e => setBookingData({...bookingData, timeSlot: e.target.value})} style={{ ...modalInput, flex: 1 }}>
                        <option value="">Select Time</option><option>08:00 AM</option><option>10:00 AM</option><option>02:00 PM</option><option>04:00 PM</option><option>06:00 PM</option>
                     </select>
                  </div>
                  <div style={{ borderTop: '1px solid #333', paddingTop: '15px', marginTop: '5px' }}>
                     <label style={{ color: '#888', fontSize: '0.8rem', marginBottom: '8px', display: 'block' }}>CUSTOM REQUESTS (Saved as Map)</label>
                     <input placeholder="Focus Area (e.g. Abs, Legs)" value={bookingData.focusArea} onChange={e => setBookingData({...bookingData, focusArea: e.target.value})} style={{...modalInput, marginBottom: '10px'}} />
                     <input placeholder="Medical Notes / Injuries" value={bookingData.medicalNotes} onChange={e => setBookingData({...bookingData, medicalNotes: e.target.value})} style={modalInput} />
                  </div>
                  <button type="submit" style={{ marginTop: '10px', backgroundColor: '#4ade80', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                     <CheckCircle size={18} /> CONFIRM BOOKING
                  </button>
               </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer style={{ backgroundColor: '#0a0a0a', color: 'white', padding: '60px 100px 20px 100px', borderTop: '1px solid #333', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
             <div style={{ flex: '1', minWidth: '250px', marginBottom: '20px' }}><h2 style={{ fontFamily: '"bbh bogle", sans-serif', fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px', letterSpacing: '2px', color: '#ffffff' }}>SMART GYM</h2><p style={{ color: '#e0e0e0', lineHeight: '1.6', fontSize: '0.9rem', maxWidth: '300px' }}>The future of fitness is here.</p></div>
             <div style={{ flex: '1', minWidth: '200px', marginBottom: '20px' }}><h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px', color: '#ffffff' }}>Explore</h3><ul style={{ listStyle: 'none', padding: 0, color: '#cccccc', lineHeight: '2' }}><li>About Us</li><li>Classes</li><li>Membership</li><li>Trainers</li></ul></div>
             <div style={{ flex: '1', minWidth: '250px', marginBottom: '20px' }}><h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px', color: '#ffffff' }}>Contact</h3><div style={{ color: '#cccccc', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={18} /> 123 Fitness Blvd</div><div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Phone size={18} /> +1 (555) 123-4567</div><div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Mail size={18} /> support@smartgym.com</div></div></div>
          </div>
          <div style={{ borderTop: '1px solid #222', marginTop: '40px', paddingTop: '20px', textAlign: 'center', color: '#888', fontSize: '0.8rem' }}>© 2025 Smart Gym. All rights reserved.</div>
      </footer>
    </div>
  );
}

const modalInput = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #444',
  backgroundColor: '#222',
  color: 'white',
  outline: 'none',
  fontSize: '0.9rem',
  boxSizing: 'border-box'
};