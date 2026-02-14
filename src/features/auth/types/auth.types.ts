export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface LoginFormData extends LoginCredentials {
  rememberMe?: boolean;
}