import api from './axiosInstance';

// Login: /auth/token
export async function loginRequest(identifier, password) {
  const response = await api.post('/auth/token', { identifier, password });
  return response.data; // { token }
}

// Registro opcional (si quieres usarlo después)
// export async function registerRequest(username, email, password) {
//   const response = await api.post('/auth/register', { username, email, password });
//   return response.data;
// }
