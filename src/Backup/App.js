// Install Bootstrap using: npm install bootstrap
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home';
import Pokedex from './Pokedex';


const App = () => {
  return (
    <Router>
      <div>        
        <div id="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
