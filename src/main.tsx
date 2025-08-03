import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App';
import { LoadingProvider } from './context/LoadingContext';
import LoadingOverlay from './components/LoadingOverlay';
import './index.css';

/**
 * Aplica o tema salvo no cookie (light/dark).
 */
function applyThemeFromCookie() {
  const match = document.cookie.match(/theme=(dark|light)/);
  const theme = match?.[1] || 'light';
  document.body.classList.toggle('dark', theme === 'dark');
}

/**
 * Splash screen com som retro.
 */
const Splash = () => {
  useEffect(() => {
    const sound = new Audio('/sound/smw_coin.wav');
    sound.play().catch(() => { });
  }, []);
  return <div id="splash">🪙 WALLET BITCOIN</div>;
};

/**
 * Toca som ao trocar de rota.
 */
function RouteSound() {
  const location = useLocation();
  useEffect(() => {
    const sound = new Audio('/sound/smw_lava_bubble.wav');
    sound.play().catch(() => { });
  }, [location.pathname]);
  return null;
}

applyThemeFromCookie();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoadingProvider>
      <LoadingOverlay />
      <BrowserRouter>
        <Splash />
        <RouteSound />
        <App />
      </BrowserRouter>
    </LoadingProvider>
  </React.StrictMode>
);
