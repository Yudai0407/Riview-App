import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FacultyPage from './pages/FacultyPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/faculty/:facultyId' element={<FacultyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
