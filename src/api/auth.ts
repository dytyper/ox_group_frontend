import { AUTH_ERROR_MESSAGE } from '../constants/messages';
import type { AuthResponse } from '../types/auth';
import { apiClient } from './client';

export async function login(
  username: string,
  password: string,
  subdomain: string
): Promise<AuthResponse> {
  const body = new URLSearchParams({
    _username: username,
    _password: password,
    _subdomain: subdomain,
  }).toString();

  try {
    const { data } = await apiClient.post<AuthResponse>('/security/auth_check', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });

    return data;
  } catch (err: unknown) {
    throw new Error(AUTH_ERROR_MESSAGE);
  }
}
