import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const getEnv = (key: string, _default?: string) => {
  const val = (import.meta as any).env[key];
  if (!val || val === 'undefined' || val === 'null' || val.trim() === '') {
    return _default;
  }
  return val;
};

const API_BASE_URL = getEnv('VITE_API_BASE_URL', 'https://api.seliseblocks.com');
const PROJECT_SLUG = getEnv('VITE_PROJECT_SLUG', 'vibesite');
const CLIENT_ID = getEnv('VITE_BLOCKS_OIDC_CLIENT_ID', 'vibebuilder');
const REDIRECT_URI = getEnv('VITE_BLOCKS_OIDC_REDIRECT_URI', window.location.origin + '/oidc');

const OIDC_SERVER = `${API_BASE_URL}/iam/v1/projects/${PROJECT_SLUG}`;

export interface User {
  id: string;
  email: string;
  name: string;
}

export const authService = {
  loginWithSelise: () => {
    const authUrl = new URL(`${OIDC_SERVER}/authorize`);
    authUrl.searchParams.append('client_id', CLIENT_ID);
    authUrl.searchParams.append('response_type', 'token id_token');
    authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.append('scope', 'openid profile email');
    authUrl.searchParams.append('nonce', Math.random().toString(36).substring(2));
    
    window.location.href = authUrl.toString();
  },

  handleSeliseCallback: (accessToken: string, idToken: string) => {
    localStorage.setItem('vibe_access_token', accessToken);
    localStorage.setItem('vibe_id_token', idToken);
  },

  logout: () => {
    localStorage.removeItem('vibe_access_token');
    localStorage.removeItem('vibe_id_token');
    window.location.href = '/auth';
  },

  getCurrentUser: (): User | null => {
    const idToken = localStorage.getItem('vibe_id_token');
    if (!idToken) return null;
    
    try {
      const decoded: any = jwtDecode(idToken);
      return {
        id: decoded.sub,
        email: decoded.email || decoded.upn || '',
        name: decoded.name || decoded.given_name || ''
      };
    } catch (e) {
      console.error("Invalid token", e);
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('vibe_access_token');
  }
};

export function useGetAccount() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);
  
  return user;
}

