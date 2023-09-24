import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Landing from './views/Landing';
import Generate from './views/Generate';
import Discover from './views/Discover';
import Profile from './views/Profile';
import Wrapper from './components/Wrapper';
import { getUsers } from './helpers';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(res => setUsers(res))
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Wrapper children={<Landing />} />
          } />
          <Route path="/generate" element={
            <Wrapper children={<Generate />} />
          } />
          <Route path="/discover" element={
            <Wrapper children={<Discover />} />
          } />
          <Route path='/profile' element={
            <Wrapper children={<Profile />} />
          } />
          {
            users.map((user) => (
              <Route path={`/profile/${user.id}`} element={
                <Wrapper children={<Profile user={user} />} />
              } />
            ))
          }
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
