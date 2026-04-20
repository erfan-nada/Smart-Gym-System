import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Search, Plus, Trash2, Edit, X, Upload, Dumbbell, Activity,
  MapPin, Phone, Mail
} from 'lucide-react';

export default function Members() {
  const navLinks = ['Home', 'About', 'Classes', 'Trainers', 'Contact'];

  // --- STATE ---
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  
  // Workout State
  const [workoutData, setWorkoutData] = useState({ activityType: 'Cardio', details: '' });
  
  // Member Form State
  const [formData, setFormData] = useState({ fullName: '', email: '', age: '', status: 'Active', profilePicture: null });

  // --- FETCH DATA ---
  useEffect(() => { fetchMembers(); }, [search]);
  
  const fetchMembers = async () => {
    try {
      const url = search ? `http://localhost:5000/api/members/search?name=${search}` : 'http://localhost:5000/api/members';
      const response = await axios.get(url);
      setMembers(response.data);
    } catch (error) { console.error(error); }
  };

  // --- HANDLERS ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, profilePicture: { data: reader.result.split(',')[1], contentType: file.type } });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) { await axios.put(`http://localhost:5000/api/members/${editingId}`, formData); } 
      else { await axios.post('http://localhost:5000/api/members', formData); }
      setFormData({ fullName: '', email: '', age: '', status: 'Active', profilePicture: null });
      setShowForm(false); setEditingId(null); fetchMembers();
    } catch (error) { alert("Error saving: " + (error.response?.data?.message || error.message)); }
  };

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    try {
      // Structure the data to match your backend schema
      const payload = { 
        activityType: workoutData.activityType, 
        details: { 
            note: workoutData.details, // <--- This is the text you typed
            intensity: 'High', 
            recordedAt: new Date() 
        } 
      };
      await axios.put(`http://localhost:5000/api/members/${selectedMemberId}/workout`, payload);
      setShowWorkoutModal(false); 
      setWorkoutData({ activityType: 'Cardio', details: '' }); 
      fetchMembers();
    } catch (error) { alert("Error logging workout: " + error.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try { await axios.delete(`http://localhost:5000/api/members/${id}`); fetchMembers(); } catch (error) { alert("Error deleting"); }
  };

  const startEdit = (member) => {
    setFormData({ fullName: member.fullName, email: member.email, age: member.age, status: member.status, profilePicture: member.profilePicture });
    setEditingId(member._id); setShowForm(true);
  };

  return (
    <div style={{ backgroundImage: "url('/members.jpg')", minHeight: '100vh', width: '100vw', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', margin: 0, padding: 0, overflowX: 'hidden' }}>
      
      {/* NAVBAR */}
      <nav style={{ position: 'absolute', top: 0, left: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, boxSizing: 'border-box' }}>
        <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>SMART GYM</div>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', margin: 0, padding: 0 }}>
          {navLinks.map((link) => (
            <li key={link}><a href={link === 'Trainers' ? '/trainers' : `/#${link.toLowerCase()}`} style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>{link}</a></li>
          ))}
          <li><a href="/members" style={{ color: 'White', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}>Members Area</a></li>
        </ul>
      </nav>

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1, pointerEvents: 'none' }} />

      {/* MAIN CONTENT */}
      <div style={{ position: 'relative', zIndex: 5, padding: '100px 50px', minHeight: '80vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <h1 style={{ color: 'white', fontFamily: '"bbh bogle", sans-serif', fontSize: '3rem' }}>MEMBERS LIST</h1>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{ position: 'absolute', left: '15px', top: '12px', color: '#888' }} />
              <input type="text" placeholder="Search members..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: '12px 12px 12px 45px', borderRadius: '30px', border: 'none', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', outline: 'none', width: '300px' }} />
            </div>
            <button onClick={() => { setShowForm(true); setEditingId(null); setFormData({ fullName: '', email: '', age: '', status: 'Active', profilePicture: null }); }} style={{ backgroundColor: '#4ade80', border: 'none', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 15px rgba(74, 222, 128, 0.4)' }}>
              <Plus size={24} color="black" />
            </button>
          </div>
        </div>

        {/* MEMBER FORM MODAL */}
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ backgroundColor: 'rgba(30, 30, 30, 0.95)', padding: '30px', borderRadius: '20px', marginBottom: '40px', border: '1px solid #333', maxWidth: '600px', margin: '0 auto 40px auto' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}><h2 style={{ color: 'white', margin: 0 }}>{editingId ? 'Edit' : 'Register'}</h2><button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}><X /></button></div>
             <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                   <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#444', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       {formData.profilePicture?.data ? <img src={`data:${formData.profilePicture.contentType};base64,${formData.profilePicture.data}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{fontSize: '0.8rem', color: '#888'}}>No Img</span>}
                   </div>
                   <label style={{ cursor: 'pointer', backgroundColor: '#333', padding: '10px 20px', borderRadius: '8px', color: 'white', fontSize: '0.9rem', border: '1px solid #444' }}><Upload size={16} style={{marginBottom: '-3px', marginRight: '5px'}}/> Upload<input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} /></label>
                </div>
                <input required placeholder="Full Name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} style={{ padding: '15px', borderRadius: '10px', border: '1px solid #444', backgroundColor: '#222', color: 'white', outline: 'none' }} />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <input required placeholder="Age" type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} style={{ padding: '15px', borderRadius: '10px', border: '1px solid #444', backgroundColor: '#222', color: 'white', outline: 'none', flex: 1 }} />
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ padding: '15px', borderRadius: '10px', border: '1px solid #444', backgroundColor: '#222', color: 'white', outline: 'none', flex: 1 }}><option>Active</option><option>Expired</option><option>Pending</option></select>
                </div>
                <input required placeholder="Email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '15px', borderRadius: '10px', border: '1px solid #444', backgroundColor: '#222', color: 'white', outline: 'none' }} />
                <button type="submit" style={{ padding: '15px', backgroundColor: '#4ade80', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Save</button>
             </form>
          </motion.div>
        )}
        
        {/* WORKOUT LOG MODAL */}
        {showWorkoutModal && (
           <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ backgroundColor: '#222', padding: '30px', borderRadius: '20px', width: '400px', border: '1px solid #444' }}>
                <h2 style={{ color: 'white', marginBottom: '20px' }}>Log Activity</h2>
                <form onSubmit={handleAddWorkout} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                   <select style={{ padding: '15px', borderRadius: '10px', border: '1px solid #444', backgroundColor: '#222', color: 'white', outline: 'none' }} value={workoutData.activityType} onChange={e => setWorkoutData({...workoutData, activityType: e.target.value})}><option>Cardio</option><option>Weightlifting</option><option>Yoga</option><option>Crossfit</option></select>
                   <textarea placeholder="Details (e.g. 5km run, Chest day...)" style={{ padding: '15px', borderRadius: '10px', border: '1px solid #444', backgroundColor: '#222', color: 'white', outline: 'none', height: '100px', resize: 'none' }} value={workoutData.details} onChange={e => setWorkoutData({...workoutData, details: e.target.value})} />
                   <div style={{ display: 'flex', gap: '10px' }}><button type="button" onClick={() => setShowWorkoutModal(false)} style={{ flex: 1, padding: '15px', backgroundColor: '#444', border: 'none', borderRadius: '10px', color: 'white', cursor: 'pointer' }}>Cancel</button><button type="submit" style={{ flex: 1, padding: '15px', backgroundColor: '#4ade80', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Save</button></div>
                </form>
             </motion.div>
           </div>
        )}

        {/* MEMBERS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {members.map((member) => (
            <motion.div key={member._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ backgroundColor: 'rgba(20, 20, 20, 0.8)', border: '1px solid #333', borderRadius: '15px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative', backdropBlur: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#333', color: '#4ade80', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', border: '1px solid #444' }}>
                    {member.profilePicture?.data ? <img src={`data:${member.profilePicture.contentType};base64,${member.profilePicture.data}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : member.fullName.charAt(0)}
                  </div>
                  <div><h3 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>{member.fullName}</h3><p style={{ color: '#888', margin: 0, fontSize: '0.8rem' }}>{member.email}</p></div>
                </div>
                <span style={{ backgroundColor: member.status === 'Active' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: member.status === 'Active' ? '#4ade80' : '#ef4444', padding: '5px 10px', borderRadius: '5px', fontSize: '0.7rem', fontWeight: 'bold' }}>{member.status}</span>
              </div>
              
              {/* --- UPDATED LAST ACTIVITY SECTION --- */}
              {member.workoutLogs && member.workoutLogs.length > 0 && (
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '10px', borderRadius: '8px', marginTop: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px', color: '#4ade80', fontSize: '0.8rem', fontWeight: 'bold' }}><Activity size={14} /> LAST ACTIVITY</div>
                  
                  {/* 1. Show Type */}
                  <div style={{ color: 'white', fontSize: '0.9rem', fontWeight:'bold' }}>
                    {member.workoutLogs[member.workoutLogs.length - 1].activityType}
                  </div>

                  {/* 2. Show Details/Note if available */}
                  {member.workoutLogs[member.workoutLogs.length - 1].details && member.workoutLogs[member.workoutLogs.length - 1].details.note && (
                      <div style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '5px', fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '5px' }}>
                          "{member.workoutLogs[member.workoutLogs.length - 1].details.note}"
                      </div>
                  )}
                </div>
              )}

              <div style={{ height: '1px', backgroundColor: '#333', margin: '10px 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: '0.9rem' }}><span>Age: <strong style={{ color: 'white' }}>{member.age}</strong></span><span>ID: <strong style={{ color: 'white' }}>#{member._id.slice(-4)}</strong></span></div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button onClick={() => { setSelectedMemberId(member._id); setShowWorkoutModal(true); }} style={{ padding: '10px', backgroundColor: '#333', border: 'none', borderRadius: '8px', color: '#4ade80', cursor: 'pointer' }}><Dumbbell size={16} /></button>
                <button onClick={() => startEdit(member)} style={{ flex: 1, padding: '10px', backgroundColor: '#333', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}><Edit size={16} /> Edit</button>
                <button onClick={() => handleDelete(member._id)} style={{ padding: '10px', backgroundColor: 'rgba(239, 68, 68, 0.2)', border: 'none', borderRadius: '8px', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* FOOTER */}
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