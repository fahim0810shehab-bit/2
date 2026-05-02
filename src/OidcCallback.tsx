import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from './services/authService';

export default function OidcCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      console.error('OIDC error:', error, searchParams.get('error_description'));
      navigate('/auth', { replace: true });
      return;
    }

    if (code) {
      authService.exchangeCodeForToken(code).then(success => {
        if (success) {
          navigate('/vibebuilder', { replace: true });
        } else {
          navigate('/auth', { replace: true });
        }
      });
      return;
    }

    // No code or error — go back to login
    navigate('/auth', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-100">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-sm text-zinc-400">Authenticating with Selise...</p>
    </div>
  );
}
