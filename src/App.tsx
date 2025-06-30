import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import ChatBot from './components/ChatBot';
import Microsite from './components/Microsite';
import CardGenerator from './components/CardGenerator';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/card" element={<CardGenerator />} />
          <Route path="/microsite/:username" element={<Microsite />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;