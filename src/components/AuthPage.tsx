import React, { useEffect } from 'react';
import { authService } from '../services/authService';

export default function AuthPage() {
  useEffect(() => {
    // Automatically redirect to Selise login without showing any UI
    authService.loginWithSelise();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 text-zinc-100">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-zinc-400">Redirecting to login...</p>
      </div>
    </div>
  );
}
