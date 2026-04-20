import React from 'react';
import { motion } from 'framer-motion'; 
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react'; 

export default function Home() {
  const navLinks = ['Home', 'About', 'Classes', 'Trainers', 'Contact'];

  const fadeInRight = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div style={{ backgroundImage: "url('/gymbackground.jpg')", minHeight: '100vh', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', margin: 0, padding: 0, overflowX: 'hidden' }}>
      
      {/* --- NAVIGATION BAR --- */}
      <nav style={{ position: 'absolute', top: 0, left: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, boxSizing: 'border-box' }}>
        <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>SMART GYM</div>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', margin: 0, padding: 0 }}>
          {navLinks.map((link) => (
            <li key={link}>
              <a
                // CHECK: If link is 'Trainers', go to /trainers. Else, go to #section
                href={link === 'Trainers' ? '/trainers' : `#${link.toLowerCase()}`}
                style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', display: 'inline-block', transition: 'transform 0.2s ease, color 0.2s ease', cursor: 'pointer' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.2)'; e.currentTarget.style.color = '#cccccc'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.color = 'white'; }}
              >
                {link}
              </a>
            </li>
          ))}
          <li><a href="/members" style={{ color: 'White', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}>Members Area</a></li>
        </ul>
      </nav>

      {/* --- REST OF THE HOME CONTENT (No Changes Below) --- */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 5 }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontFamily: '"bbh bogle", sans-serif', fontSize: '5rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '5px', textShadow: '2px 2px 10px rgba(0,0,0,0.7)', marginBottom: '20px' }}>Build Your Legacy</h1>
        </motion.div>

        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '50px 100px', backdropBlur: '5px' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInRight} style={{ flex: 1, textAlign: 'left', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: '30px', borderRadius: '20px', marginRight: '50px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '0', fontWeight: 'bold', fontFamily: '"bbh bogle", sans-serif' }}>REDEFINE YOUR <br/><span style={{ display: 'block', textAlign: 'center', marginLeft: '-90px' }}>LIMITS</span></h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInLeft} style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <img src="/2.jpg" alt="Gym Feature" style={{ width: '100%', maxWidth: '700px', borderRadius: '10px', boxShadow: '0 10px 40px rgba(0,0,0,0.6)', border: '12px solid rgba(169, 169, 169, 0.7)' }} />
          </motion.div>
        </div>

        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '50px 100px', backdropBlur: '5px' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInRight} style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', marginTop: '80px' }}>
            <img src="/1.jpg" alt="Gym Feature 2" style={{ width: '100%', maxWidth: '700px', borderRadius: '10px', boxShadow: '0 10px 40px rgba(0,0,0,0.6)', border: '12px solid rgba(169, 169, 169, 0.7)' }} />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInLeft} style={{ flex: 1, textAlign: 'right', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: '30px', borderRadius: '20px', marginLeft: '70px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem', marginLeft: '10px', fontWeight: 'bold', fontFamily: '"bbh bogle", sans-serif' }}>ENGINEER YOUR <br/><span style={{ display: 'block', textAlign: 'center', marginLeft: '90px'}}>BODY</span></h2>
          </motion.div>
        </div>

        <footer style={{ backgroundColor: '#0a0a0a', color: 'white', padding: '60px 100px 20px 100px', borderTop: '1px solid #333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ flex: '1', minWidth: '250px', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: '"bbh bogle", sans-serif', fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px', letterSpacing: '2px' }}>SMART GYM</h2>
              <p style={{ color: '#888', lineHeight: '1.6', fontSize: '0.9rem', maxWidth: '300px' }}>The future of fitness is here.</p>
            </div>
            <div style={{ flex: '1', minWidth: '200px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px', color: '#fff' }}>Explore</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: '#888', lineHeight: '2' }}>
                <li>About Us</li><li>Classes</li><li>Membership</li>
              </ul>
            </div>
            <div style={{ flex: '1', minWidth: '250px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px', color: '#fff' }}>Contact</h3>
              <div style={{ color: '#888', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={18} /> 123 Fitness Blvd</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Phone size={18} /> +1 (555) 123-4567</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Mail size={18} /> support@smartgym.com</div>
              </div>
              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                 <div style={{ backgroundColor: '#222', padding: '10px', borderRadius: '50%' }}><Facebook size={20} color='white'/></div>
                 <div style={{ backgroundColor: '#222', padding: '10px', borderRadius: '50%' }}><Instagram size={20} color='white'/></div>
                 <div style={{ backgroundColor: '#222', padding: '10px', borderRadius: '50%' }}><Twitter size={20} color='white'/></div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #222', marginTop: '40px', paddingTop: '20px', textAlign: 'center', color: '#555', fontSize: '0.8rem' }}>© 2025 Smart Gym. All rights reserved.</div>
        </footer>
      </div>
    </div>
  );
}