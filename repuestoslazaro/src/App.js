// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './page/Home';
import Welcome from './page/Welcome';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/repuestos" element={<Home />} />
      </Routes>
      <Footer />
      <Outlet />
    </Router>
  
  );
}

export default App;
