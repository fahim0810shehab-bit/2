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
    // To use Selise Blocks login:
    // We redirect the user away from our app to the Selise IDP URL.
    // Selise will show its own login, handle Google/Password etc.,
    // and then redirect the user back to our app's callback URL.
    
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const clientId = import.meta.env.VITE_BLOCKS_OIDC_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_BLOCKS_OIDC_REDIRECT_URI;
    
    // Redirect to Selise IDP
    window.location.href = `${apiUrl}/idp/oauth2/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid`;
  },

  handleSeliseCallback: (token: string) => {
    // Save the token received from the URL query params or hash
    localStorage.setItem('vibe_access_token', token);
  },

  logout: () => {
    localStorage.removeItem('vibe_access_token');
    window.location.href = '/auth';
  },

  getCurrentUser: (): User | null => {
    const token = localStorage.getItem('vibe_access_token');
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return {
        id: decoded.sub || decoded.nameid || 'unknown_id',
        email: decoded.email || decoded.unique_name || '',
        name: decoded.name || decoded.given_name || 'User'
      };
    } catch (e) {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return !!authService.getCurrentUser();
  }
};

export function useGetAccount() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);
  
  return user;
}

