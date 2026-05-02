import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from './services/authService';

export default function OidcCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // The hash string looks like #access_token=...&id_token=...
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const idToken = params.get('id_token');
      
      if (accessToken && idToken) {
        authService.handleSeliseCallback(accessToken, idToken);
        navigate('/vibebuilder', { replace: true });
        return;
      }
    }
    // If no tokens or failed, go to auth
    navigate('/auth', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-100">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-sm text-zinc-400">Authenticating with Selise...</p>
    </div>
  );
}
