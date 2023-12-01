import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';

import Moby from './moby/Moby';
import MobyAuth from './moby/Moby_Auth';
import {useAuth} from './AuthProvider';

import Keiko from './keiko/Keiko';

import './App.css';

function App() {


  const {isAuth} = useAuth();

  if (isAuth === null) {
    return;
  }

  return (
    <Router>
      <Routes>
        <Route path="/Keiko" element={<Keiko />} />
        {/* <Route path="/" element={isAuth ? <Moby /> : <Navigate to="/Auth" />} /> */}
        <Route path="/" element={<Moby />} />
        <Route path="/Auth" element={<MobyAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
