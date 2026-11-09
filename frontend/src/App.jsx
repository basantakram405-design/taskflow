import React, { useState } from 'react';
import Auth from './pages/Auth.jsx';
import Tasks from './pages/Tasks.jsx';

export default function App() {
  const [session, setSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('session')) || null;
    } catch {
      return null;
    }
  });

  const login = (data) => {
    localStorage.setItem('session', JSON.stringify(data));
    setSession(data);
  };
  const logout = () => {
    localStorage.removeItem('session');
    setSession(null);
  };

  return (
    <div className="container">
      <h1>TaskFlow</h1>
      {session ? (
        <Tasks session={session} onLogout={logout} />
      ) : (
        <Auth onLogin={login} />
      )}
    </div>
  );
}
