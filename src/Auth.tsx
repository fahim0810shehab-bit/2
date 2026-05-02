import React from 'react';
import { authService } from './services/authService';

export default function Auth() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-100 p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl text-center">
        <div className="w-16 h-16 bg-blue-600/20 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold">V</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome to VibeBuilder</h1>
        <p className="text-zinc-400 text-sm mb-8">Sign in to your workspace to continue building amazing websites.</p>
        
        <button 
          onClick={() => authService.loginWithSelise()}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          Login with Selise
        </button>
      </div>
    </div>
  );
}
