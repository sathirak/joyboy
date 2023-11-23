import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Moby from './moby/Moby';
import Auth from './moby/Moby_Auth';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<HomePage />}/>
        <Route path="/" element={<Moby />}/>
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
