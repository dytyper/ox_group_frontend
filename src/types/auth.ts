export interface AuthResponse {
  token: string;
  lifetime: number;
}

export interface AuthState {
  token: string | null;
  subdomain: string;
  isAuthenticated: boolean;
  login: (token: string, subdomain: string) => void;
  logout: () => void;
}

export interface AuthStore {
  token: string | null;
  subdomain: string;
  isAuthenticated: boolean;
  login: (token: string, subdomain: string) => void;
  logout: () => void;
}