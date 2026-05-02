import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from './services/authService';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser()!;

  const handleLogout = () => {
    authService.logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-start text-zinc-100 px-8 py-12">
      <div className="max-w-5xl w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome to VibeBuilder</h1>
            <p className="text-zinc-400">Manage your websites and workspaces here.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-zinc-400">{user.email}</span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold rounded-md transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Link to="/editor" className="flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl p-8 transition-colors h-64">
            <div className="w-16 h-16 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">+</span>
            </div>
            <h2 className="text-lg font-semibold">Demo Worksite</h2>
            <p className="text-sm text-zinc-500 text-center mt-2">Open the editor to modify your demo site</p>
          </Link>

          {(user.name || user.email) && (
            <div className="flex flex-col justify-between bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-64 relative overflow-hidden group">
              <div>
                <h2 className="text-lg font-semibold mb-1">{user.name || user.email.split('@')[0]}'s Site</h2>
                <p className="text-sm text-zinc-500">Live preview of your landing page</p>
              </div>
              
              <div className="flex items-center gap-2 mt-auto">
                <a 
                  href={`/site/${user.name || user.email.split('@')[0]}`} 
                  target="_blank" rel="noreferrer"
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold py-2 text-center rounded transition-colors"
                >
                  Visit Live Site
                </a>
                <Link 
                  to="/editor" 
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-sm font-semibold py-2 text-center rounded transition-colors"
                >
                  Edit Site
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
