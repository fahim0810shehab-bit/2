import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../services/authService';

export default function CallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // In a real scenario, this endpoint captures the auth token or code from Selise.
    // If it's the Implicit flow, the token will be in window.location.hash.
    // If it's the Authorization Code flow, there will be a ?code= parameter to exchange via backend.
    
    // For this mock, we capture it from the search params:
    const token = searchParams.get('access_token');
    
    if (token) {
      authService.handleSeliseCallback(token);
      navigate('/vibebuilder', { replace: true });
    } else {
      navigate('/auth', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 text-zinc-100">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-zinc-400">Authenticating with Selise...</p>
      </div>
    </div>
  );
}
