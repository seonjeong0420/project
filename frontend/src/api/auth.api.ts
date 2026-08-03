import { api } from './axios';
import { LoginRequest, LoginResponse, SignupRequest, User } from '@/types/auth';

export const loginApi = async (body: LoginRequest) => {
  const { data } = await api.post<LoginResponse>('/auth/login', body);
  console.log('loginApi data', data);
  return data;
};

export const signupApi = async (body: SignupRequest) => {
  const { data } = await api.post<User>('/auth/signup', body);
  return data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const meApi = async () => {
  const { data } = await api.get<User>('/auth/me');
  return data;
};
