import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || 'https://api.seliseblocks.com';
const BLOCKS_KEY = (import.meta as any).env.VITE_X_BLOCKS_KEY;

export interface User {
  id: string;
  email: string;
  name: string;
}

export const authService = {
  loginWithSelise: () => {
    window.location.href = '/vibebuilder';
  },

  handleSeliseCallback: (token: string) => {
    // Save the mock token
    localStorage.setItem('vibe_access_token', token);
  },

  logout: () => {
    localStorage.removeItem('vibe_access_token');
    window.location.href = '/';
  },

  getCurrentUser: (): User | null => {
    return {
      id: 'demo_user_id',
      email: 'demo@example.com',
      name: 'Demo User'
    };
  },

  isAuthenticated: (): boolean => {
    return true;
  }
};

export function useGetAccount() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);
  
  return user;
}

