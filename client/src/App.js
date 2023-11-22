import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Moby from './moby/Moby';
import Auth from './moby/Moby_Auth';
import { useAuth } from './moby/Moby_Auth_Context';
import './App.css';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/Home" element={isAuthenticated ? <HomePage /> : <Navigate to="/Auth" />} />
        <Route path="/" element={isAuthenticated ? <Moby /> : <Navigate to="/Auth" />} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
