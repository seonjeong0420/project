import { api } from "./axios";
import { LoginRequest, LoginResponse, SignupRequest, User } from "@/types/auth";

export const loginApi = async (data: LoginRequest) => {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const signupApi = async (data: SignupRequest) => {
  const response = await api.post<User>("/auth/signup", data);
  return response.data;
};

export const meApi = async () => {
  const response = await api.get<User>("/users/me");
  return response.data;
};
