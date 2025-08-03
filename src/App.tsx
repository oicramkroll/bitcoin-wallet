import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { auth, db } from './firebase-config';
import { doc, getDoc } from 'firebase/firestore';

import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Wallets from './pages/Wallets';
import Profile from './pages/Profile';

function App() {
  const [user, loading] = useAuthState(auth);
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        const data = snap.data();
        const complete = !!(data?.name && data?.email);
        setProfileComplete(complete);

        if (!complete && location.pathname !== '/profile') {
          navigate('/profile');
        }else
          navigate('/dashboard');
      } else {
        setProfileComplete(null);
      }
    };

    if (user) checkProfile();
  }, [user]);

  if (loading) return <p>Carregando...</p>;

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      <Route
        path="/wallets"
        element={user ? <Wallets /> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={
          user ? (
            profileComplete ? <Dashboard /> : <Navigate to="/profile" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
