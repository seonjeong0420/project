export interface SignupRequest {
  email: string;
  password: string;
  name?: string;
}

export interface SignupResponse {
  id: string;
  email: string;
  name: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string | null;
  };
}
