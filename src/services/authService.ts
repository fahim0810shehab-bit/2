import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const getEnv = (key: string, _default?: string) => {
  const val = (import.meta as any).env[key];
  if (!val || val === 'undefined' || val === 'null' || val.trim() === '') {
    return _default;
  }
  return val;
};

// Hardcoded from the Selise OIDC well-known config
const BLOCKS_KEY = 'Dde35c001de5a49f682d2705db22fc4b5';
const CLIENT_ID = getEnv('VITE_BLOCKS_OIDC_CLIENT_ID', '');
const REDIRECT_URI = typeof window !== 'undefined'
  ? getEnv('VITE_BLOCKS_OIDC_REDIRECT_URI', window.location.origin + '/oidc')
  : '';

const AUTH_ENDPOINT = `https://api.seliseblocks.com/idp/v1/Authentication/authorize?X-Blocks-Key=${BLOCKS_KEY}`;
const TOKEN_ENDPOINT = `https://api.seliseblocks.com/idp/v1/Authentication/token?X-Blocks-Key=${BLOCKS_KEY}`;

// PKCE helpers
const generateCodeVerifier = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

const generateCodeChallenge = async (verifier: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

export interface User {
  id: string;
  email: string;
  name: string;
}

export const authService = {
  loginWithSelise: async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = Math.random().toString(36).substring(2);

    sessionStorage.setItem('pkce_code_verifier', codeVerifier);
    sessionStorage.setItem('oauth_state', state);

    const authUrl = new URL(AUTH_ENDPOINT);
    authUrl.searchParams.append('client_id', CLIENT_ID);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.append('scope', 'openid profile email');
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('code_challenge', codeChallenge);
    authUrl.searchParams.append('code_challenge_method', 'S256');

    window.location.href = authUrl.toString();
  },

  exchangeCodeForToken: async (code: string): Promise<boolean> => {
    const codeVerifier = sessionStorage.getItem('pkce_code_verifier');
    if (!codeVerifier) return false;

    try {
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: codeVerifier,
      });

      const res = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) {
        console.error('Token exchange failed:', await res.text());
        return false;
      }

      const tokens = await res.json();
      localStorage.setItem('vibe_access_token', tokens.access_token);
      if (tokens.id_token) localStorage.setItem('vibe_id_token', tokens.id_token);
      sessionStorage.removeItem('pkce_code_verifier');
      sessionStorage.removeItem('oauth_state');
      return true;
    } catch (e) {
      console.error('Token exchange error:', e);
      return false;
    }
  },

  handleSeliseCallback: (accessToken: string, idToken: string) => {
    localStorage.setItem('vibe_access_token', accessToken);
    if (idToken) localStorage.setItem('vibe_id_token', idToken);
  },

  logout: () => {
    localStorage.removeItem('vibe_access_token');
    localStorage.removeItem('vibe_id_token');
    window.location.href = '/auth';
  },

  getCurrentUser: (): User | null => {
    const accessToken = localStorage.getItem('vibe_access_token');
    const idToken = localStorage.getItem('vibe_id_token');
    if (!accessToken) return null;

    const tokenToDecode = idToken || accessToken;
    try {
      const decoded: any = jwtDecode(tokenToDecode);
      return {
        id: decoded.sub,
        email: decoded.email || decoded.upn || '',
        name: decoded.name || decoded.given_name || decoded.email || ''
      };
    } catch (e) {
      console.error('Invalid token', e);
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
