import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Landing from './views/Landing';
import Generate from './views/Generate';
import Drops from './views/Drops';
import Discover from './views/Discover';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/drops" element={<Drops />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
