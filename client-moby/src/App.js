import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import Moby from './moby/Moby';
import Auth from './moby/Moby_Auth';
import {useAuth} from './AuthProvider';
import './App.css';

function App() {


  const {isAuth} = useAuth();

  if (isAuth === null) {
    return;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuth ? <Moby /> : <Navigate to="/Auth" />} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
