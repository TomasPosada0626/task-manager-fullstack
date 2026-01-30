import { getToken } from '../utils/token';

export const authFetch = async (input: RequestInfo, init: RequestInit = {}) => {
  const token = getToken();
  const headers = {
    ...init.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
  };
  return fetch(input, { ...init, headers });
};
