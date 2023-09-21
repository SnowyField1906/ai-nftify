import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Landing from './views/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
