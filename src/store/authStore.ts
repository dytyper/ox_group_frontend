import Cookies from 'js-cookie';
import { create } from 'zustand';

import { SUBDOMAIN_KEY, TOKEN_KEY } from '../constants/cookies';
import type { AuthStore } from '../types/auth';

function getInitialToken(): string | null {
  return Cookies.get(TOKEN_KEY) ?? null;
}

function getInitialSubdomain(): string {
  return Cookies.get(SUBDOMAIN_KEY) ?? 'toko';
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: getInitialToken(),
  subdomain: getInitialSubdomain(),
  isAuthenticated: !!getInitialToken(),

  login: (token, subdomain) => {
    Cookies.set(TOKEN_KEY, token, { path: '/', sameSite: 'Lax' });
    Cookies.set(SUBDOMAIN_KEY, subdomain, { path: '/', sameSite: 'Lax' });
    set({ token, subdomain, isAuthenticated: true });
  },

  logout: () => {
    Cookies.remove(TOKEN_KEY, { path: '/' });
    Cookies.remove(SUBDOMAIN_KEY, { path: '/' });
    set({ token: null, isAuthenticated: false });
  },
}));
