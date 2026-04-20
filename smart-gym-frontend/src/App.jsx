import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages
import Home from './pages/Home';
import Members from './pages/Members';
import Trainers from './pages/Trainers'; // <--- 1. Import the Trainers Page

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Members Management Page */}
        <Route path="/members" element={<Members />} />

        {/* Trainers Management Page (New!) */}
        <Route path="/trainers" element={<Trainers />} />
      </Routes>
    </Router>
  );
}