import { useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
}

export const authService = {
  loginWithSelise: async () => {
    window.location.href = '/vibebuilder';
  },

  logout: () => {
    window.location.href = '/vibebuilder';
  },

  getCurrentUser: (): User => {
    return {
      id: 'demo_user_id',
      email: 'demo@vibebuilder.com',
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
